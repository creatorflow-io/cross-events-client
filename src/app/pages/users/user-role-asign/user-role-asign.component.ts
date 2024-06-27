import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomErrorStateMatcher } from '../../shared/custom-error-state-matcher';
import { UserRolesModel, UserRecord } from '../shared/user.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../../roles/services/role.service';


@Component({
  selector: 'app-user-role-asign',
  templateUrl: './user-role-asign.component.html',
  styleUrl: './user-role-asign.component.scss'
})
export class UserRoleAsignComponent {
  @Input() id!: string;
  model: UserRolesModel = new UserRolesModel();

  rolesFormControl = new FormControl(this.model.Roles);
  
  form: FormGroup = new FormGroup({
    Roles: this.rolesFormControl
  });

  matcher = new CustomErrorStateMatcher();
  roles: Array<string> = [];

  @Output() updated = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<string>();
  @Output() error = new EventEmitter<any>();


  constructor(private service: UserService,private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles("", [], [], 1, 50).subscribe((result) => {
      this.roles = result.Data.map((x) => x.Name);
    });
  }

  
  updateModel(){
    var value = this.form.value;
    this.model.Roles = value.Roles;
  }

  
  ngOnChanges(): void {
    this.service.getUser(this.id).subscribe((result) => {
      this.form.patchValue(result);
      this.updateModel();
    });
  }
  
  setId(value: string){
    this.id = value;
    this.ngOnChanges();
  }
  
  submit(){
    if(this.form.valid){
      this.updateModel();
      this.service.setRoles(this.id, this.model.Roles).subscribe({
          next:(result) => {
            if(this.updated!=null){
              this.updated.emit();
            }
          },
          error:(err) => {
            this.error.emit(err);
          }
        });
    }
  }
  cancel(){
    this.cancelled.emit();
  }
}
