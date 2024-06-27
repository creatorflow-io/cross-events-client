import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatMultiSort, MatMultiSortTableDataSource, TableData  } from 'ngx-mat-multi-sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
import { TableQueryResult } from '../shared/models/table.query-result';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from './shared/role.model';
import { RoleService } from './services/role.service';
import { IdentityConfiguration } from '../users/services/identity.configuration';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { RoleCreateComponent } from './role-create/role-create.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'actions'];
  table: TableData<Role>;

  get filterText(){
    return this.form.get("filterText");
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatMultiSort) sort!: MatMultiSort;

  form: FormGroup = new FormGroup({});

  constructor(private service: RoleService,
    private config: IdentityConfiguration,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private serializer: UrlSerializer,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.table = new TableData<Role>([
      {id: 'id', name: 'ID'},
      {id: 'name', name: 'Name'},
      {id: 'status', name: 'Status'}
    ]);

    this.table.dataSource = new MatMultiSortTableDataSource<Role>(new MatMultiSort(), false);
    this.table.displayedColumns = this.displayedColumns;
  }

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

    this.service.getRoles(q,
        this.table.sortParams, this.table.sortDirs, this.table.pageIndex, this.table.pageSize
        )
        .subscribe((rs : TableQueryResult<Role>)=> {
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
  add(){
    const dialogRef = this.dialog.open(RoleCreateComponent, {
      maxHeight: 250,
      width: "400px",
      data: {}
    });

    let instance = dialogRef.componentInstance;
    instance.created.subscribe((id: string) => {
      this.getData();
      this.openSnackBar("Role was created!");
      dialogRef.close();
    });
    instance.cancelled.subscribe(() => {
      this.openSnackBar("Role creation was cancelled!");
      dialogRef.close();
    });
    instance.error.subscribe((error: any) => {
      this.openSnackBar("Error creating role!");
    });
  }


  edit(id: string){
    console.debug("edit", id);
    const dialogRef = this.dialog.open(RoleUpdateComponent, {
      maxHeight: 250,
      width: "400px",
      data: { id: id }
    });

    let instance = dialogRef.componentInstance;
    instance.setId(id);
    instance.updated.subscribe((id: string) => {
      this.getData();
      this.openSnackBar("Role was updated!");
      dialogRef.close();
    });
    instance.cancelled.subscribe(() => {
      this.openSnackBar("Role update was cancelled!");
      dialogRef.close();
    });
    instance.error.subscribe((error: any) => {
      this.openSnackBar("Error updating role!");
    });
  }

  delete(id: string){
    this.confirm(this.doDelete.bind(this, id),
    {
      title: "Dangerous action!", 
      message: "Please confirm that you want to delete this role!",
      messageClasses: "warn-color",
      buttonText:"Delete forever",
      buttonColor:"warn"
    });
  }

  doDelete(id: string){
    this.service.deleteRole(id).subscribe({
      complete: () => { 
        this.getData();
        this.openSnackBar("Role was deleted!");
      }, error: (error: any) => {
        this.openSnackBar("Error deleting role!");
        console.debug(error);
      }});
  }
  //#endregion
}
