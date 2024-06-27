import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Role, RoleUpdate } from '../shared/role.model';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomErrorStateMatcher } from '../../shared/custom-error-state-matcher';
import { RoleService } from '../services/role.service';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.scss'
})
export class RoleCreateComponent {
  model: RoleUpdate = new RoleUpdate();

  nameFormControl = new FormControl(this.model.Name, [Validators.required]);

  form: FormGroup = new FormGroup({
    Name: this.nameFormControl
  });

  matcher = new CustomErrorStateMatcher();

  @Output() created = new EventEmitter<Role>();
  @Output() cancelled = new EventEmitter<string>();
  @Output() error = new EventEmitter<any>();

  constructor(private service: RoleService) { }

  updateModel() {
    var value = this.form.value;
    this.model.Name = value.Name;
  }

  submit(){
    if(this.form.valid){
      this.updateModel();
      this.service.createRole(this.model).subscribe({
        next:(result) => {
          if(this.created!=null){
            this.created.emit(result);
          }
          this.form.reset();
          this.model = new RoleUpdate();
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
