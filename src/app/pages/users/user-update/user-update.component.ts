import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomErrorStateMatcher } from '../../shared/custom-error-state-matcher';
import { UserCreateModel, UserUpdateModel } from '../shared/user.model';
import { UserService } from '../services/user.service';
import { RoleService } from '../../roles/services/role.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent {
  @Input() id!: string;
  model: UserUpdateModel = new UserUpdateModel();

  
  userNameFormControl = new FormControl(this.model.UserName, [Validators.required]);
  nameFormControl = new FormControl(this.model.Name, [Validators.required]);
  emailFormControl = new FormControl(this.model.Email, [Validators.required]);
  phoneNumberFormControl = new FormControl(this.model.PhoneNumber);
  firstNameFormControl = new FormControl(this.model.FirstName);
  lastNameFormControl = new FormControl(this.model.Surname);

  form: FormGroup = new FormGroup({
    UserName: this.userNameFormControl,
    Name: this.nameFormControl,
    Email: this.emailFormControl,
    PhoneNumber: this.phoneNumberFormControl,
    FirstName: this.firstNameFormControl,
    Surname: this.lastNameFormControl,
  });

  matcher = new CustomErrorStateMatcher();

  @Output() updated = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<string>();
  @Output() error = new EventEmitter<any>();

  roles: Array<string> = [];

  constructor(private service: UserService) { }


  updateModel(){
    var value = this.form.value;
    this.model.UserName = value.UserName;
    this.model.Name = value.Name;
    this.model.Email = value.Email;
    this.model.PhoneNumber = value.PhoneNumber;
    this.model.FirstName = value.FirstName;
    this.model.Surname = value.Surname;
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
      this.service.updateUser(this.id, this.model).subscribe({
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
