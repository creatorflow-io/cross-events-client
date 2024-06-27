import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientSevice } from './services/client.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatMultiSort, MatMultiSortTableDataSource, TableData  } from 'ngx-mat-multi-sort';
import { TcpClient } from './shared/client.model';
import { ClientStatus, ClientStatusHelper } from './shared/client.status';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { TableQueryResult } from '../shared/models/table.query-result';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventServiceConfiguration } from '../events/services/service.configuration';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'createdTime', 'ipaddress', 'status', 'actions'];
  table: TableData<TcpClient>;

  clientStatus = ClientStatus;
  statusHelper = ClientStatusHelper;
  statusOptions = Object.values(ClientStatus).filter(value => typeof value === 'string')
  .map(value => value as ClientStatus);

  get status(){
    return this.form.get("status");
  }

  get filterText(){
    return this.form.get("filterText");
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatMultiSort) sort!: MatMultiSort;

  form: FormGroup = new FormGroup({});

  // private hubConnection: signalR.HubConnection;

  constructor(private eventService: ClientSevice,
    private config: EventServiceConfiguration,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private serializer: UrlSerializer,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.table = new TableData<TcpClient>([
      {id: 'id', name: 'ID'},
      {id: 'createdTime', name: 'Created Date'},
      {id: 'ipaddress', name: 'IP Address'},
      {id: 'status', name: 'Status'}
    ]);

    this.table.dataSource = new MatMultiSortTableDataSource<TcpClient>(new MatMultiSort(), false);
    this.table.displayedColumns = this.displayedColumns;

    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   .withUrl(`${this.config.apiEndpoint}/eventshub`)
    //   .withAutomaticReconnect()
    //   .build();

    // this.hubConnection.on('EventAddedAsync', (id) => this.onEventAdded(id));
  }

  //#region SignalR
  startConnection(){
    // this.hubConnection
    //     .start()
    //     .then(() => {
    //       console.log('Connection established with SignalR hub');
    //     })
    //     .catch((error) => {
    //       console.error('Error connecting to SignalR hub:', error);
    //     });
  }

  onEventAdded(id: string){
    this.openSnackBar("New event added: " + id);
    this.getData();
  }
  //#endregion

  //#region Initialization
  initRouteEvents(){
    let firstLoad = true;
    this.route.queryParams.subscribe(params =>{
      console.debug("route.queryParams.subscribe", params, firstLoad);
      
      var q = params['q'] || "";
      this.filterText?.setValue(q);

      this.table.pageSize = params['pageSize']? Number.parseInt(params['pageSize']): 10;
      this.table.pageIndex = params['page']? Number.parseInt(params['page']): 0;
      var sortParams = params['sortParams'];
      var sortDirs = params['sortDirs'];
      if(sortParams && sortDirs){
          if(Array.isArray(sortParams) && Array.isArray(sortDirs)){
              this.table.sortParams = sortParams;
              this.table.sortDirs = sortDirs;
          }else if(typeof sortParams == "string" 
          && typeof (sortDirs) == "string"){
              this.table.sortParams = [sortParams];
              this.table.sortDirs = [sortDirs];
          }
      }
      this.getData(true);
    });
  }

  
  ngOnInit(): void{
    this.form = this.fb.group({
      filterText: [],
      status: []
    });
    this.initRouteEvents();
    this.initFormAndTableEvents();
    this.startConnection();
  }

  ngAfterViewInit(): void {

    this.table.dataSource.sort = this.sort;
  }

  initFormAndTableEvents(){
    this.table.nextObservable.subscribe(() => { this.getData(); });
    this.table.sortObservable.subscribe((e) => {  this.getData(); });
    this.table.previousObservable.subscribe(() => { this.getData(); });
    this.table.sizeObservable.subscribe(() => { this.getData(); });
    
    this.form.controls['status'].valueChanges.subscribe(value => {
      this.getData();
    });
  }
//#endregion
  
  //#region Data
  clearFilterText(){
    this.filterText?.setValue("");
    this.getData();
  }
  
  clearStatus(){
    this.status?.setValue("");
    this.getData();
  }

  getData(fromRoute: boolean = false) {
    var q = this.filterText?.value ?? "";
    
    if(!fromRoute){
      
      const tree = this.router.createUrlTree([], { queryParams: { 
          q: q,
          page: this.table.pageIndex,
          pageSize: this.table.pageSize,
          sortParams: this.table.sortParams,
          sortDirs: this.table.sortDirs
      } });

      this.location.go(this.serializer.serialize(tree));
    }

    this.eventService.getClients(q, this.status?.value,
        this.table.sortParams, this.table.sortDirs, this.table.pageIndex, this.table.pageSize
        )
        .subscribe((rs : TableQueryResult<TcpClient>)=> {
            this.table.totalElements = rs.Count;
            this.table.pageIndex = rs.Page-1;
            this.table.pageSize = rs.PageSize;
            this.table.data = rs.Data;
        });
  }

  //#endregion

  //#region Common
  confirm(callback: Function, options: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: options
    });

    let instance = dialogRef.componentInstance;
    instance.confirmed.subscribe(() => {
      dialogRef.close();
      callback();
    });
    instance.cancelled.subscribe(() => {
      dialogRef.close();
    });
  }

  openSnackBar(message: string, action: string = "Close") {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  //#endregion

  //#region Actions
  canAccept(status: ClientStatus){
    return status != ClientStatus.Accepted;
  }

  canBan(status: ClientStatus){
    return status != ClientStatus.Banned;
  }

  accept(id: string){
    this.eventService.acceptClient(id).subscribe({
      next: (rs) => {
        if(rs.Succeeded){
          this.openSnackBar("Client accepted successfully.");
        }else{
          this.openSnackBar("Failed to accept client. " + rs.Message);
        }
        this.getData();
      }, error: (err) => {
        if(err.status == 401 || err.status == 403){
          this.openSnackBar("You are not authorized to perform this action.");
        }else{
          this.openSnackBar("Failed to accept client. " + err.message);
        }
      }
    });
  }

  ban(id: string){
    this.confirm(this.doBan.bind(this, id),
    {
      title: "Dangerous action!", 
      message: "Please confirm that you want to ban this client.",
      messageClasses: "warn-color",
      buttonText:"Ban",
      buttonColor:"warn"
    });
  }

  doBan(id: string){
    this.eventService.banClient(id).subscribe({
      next: (rs) => {
        if(rs.Succeeded){
          this.openSnackBar("Client banned successfully.");
        }else{
          this.openSnackBar("Failed to ban client. "+rs.Message);
        }
        this.getData();
      },
      error: (err) => {
        if(err.status == 401 || err.status == 403){
          this.openSnackBar("You are not authorized to perform this action.");
        }else{
          this.openSnackBar("Failed to ban client. " + err.message);
        }
      }
    });
  }
  //#endregion
}
