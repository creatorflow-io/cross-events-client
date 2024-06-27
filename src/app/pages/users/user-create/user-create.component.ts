import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomErrorStateMatcher } from '../../shared/custom-error-state-matcher';
import { UserCreateModel, UserRecord } from '../shared/user.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../../roles/services/role.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  model: UserCreateModel = new UserCreateModel();

  userNameFormControl = new FormControl(this.model.UserName, [Validators.required]);
  nameFormControl = new FormControl(this.model.Name, [Validators.required]);
  emailFormControl = new FormControl(this.model.Email, [Validators.required]);
  phoneNumberFormControl = new FormControl(this.model.PhoneNumber);
  passwordFormControl = new FormControl(this.model.Password, [Validators.required]);
  confirmPasswordFormControl = new FormControl(this.model.ConfirmPassword, [Validators.required]);
  firstNameFormControl = new FormControl(this.model.FirstName);
  lastNameFormControl = new FormControl(this.model.Surname);
  rolesFormControl = new FormControl(this.model.Roles);

  form: FormGroup = new FormGroup({
    UserName: this.userNameFormControl,
    Name: this.nameFormControl,
    Email: this.emailFormControl,
    PhoneNumber: this.phoneNumberFormControl,
    Password: this.passwordFormControl,
    ConfirmPassword: this.confirmPasswordFormControl,
    FirstName: this.firstNameFormControl,
    Surname: this.lastNameFormControl,
    Roles: this.rolesFormControl
  });

  matcher = new CustomErrorStateMatcher();

  @Output() created = new EventEmitter<UserRecord>();
  @Output() cancelled = new EventEmitter<string>();
  @Output() error = new EventEmitter<any>();

  roles: Array<string> = [];

  constructor(private service: UserService,private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles("", [], [], 1, 50).subscribe((result) => {
      this.roles = result.Data.map((x) => x.Name);
    });
  }

  updateModel(){
    var value = this.form.value;
    this.model.UserName = value.UserName;
    this.model.Name = value.Name;
    this.model.Email = value.Email;
    this.model.PhoneNumber = value.PhoneNumber;
    this.model.Password = value.Password;
    this.model.ConfirmPassword = value.ConfirmPassword;
    this.model.FirstName = value.FirstName;
    this.model.Surname = value.Surname;
    this.model.Roles = value.Roles;

  }

  
  submit(){
    if(this.form.valid){
      this.updateModel();
      this.service.createUser(this.model).subscribe({
          next:(result) => {
            if(this.created!=null){
              this.created.emit(result);
            }
            this.form.reset();
            this.model = new UserCreateModel();
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
