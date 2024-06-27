import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Role, RoleUpdate } from '../shared/role.model';
import { CustomErrorStateMatcher } from '../../shared/custom-error-state-matcher';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrl: './role-update.component.scss'
})
export class RoleUpdateComponent {
  @Input() id!: string;
  model: RoleUpdate = new RoleUpdate();

  nameFormControl = new FormControl(this.model.Name, [Validators.required]);

  form: FormGroup = new FormGroup({
    Name: this.nameFormControl
  });

  matcher = new CustomErrorStateMatcher();

  @Output() updated = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<string>();
  @Output() error = new EventEmitter<any>();

  constructor(private service: RoleService) { }

  ngOnChanges(): void {
    this.service.getRole(this.id).subscribe((result) => {
      this.form.patchValue(result);
      this.updateModel();
    });
  }

  updateModel() {
    var value = this.form.value;
    this.model.Name = value.Name;
  }

  setId(value: string){
    this.id = value;
    this.ngOnChanges();
  }

  submit(){
    if(this.form.valid){
      this.updateModel();
      this.service.updateRole(this.id, this.model).subscribe({
        complete:() => {
          this.updated.emit(this.id);
        },
        error:(err) => {
          this.error.emit(err);
        }
      });
    }
  }

  cancel(){
    this.cancelled.emit(this.id);
  }
}
