import { Component, Input, OnChanges } from '@angular/core';
import { UserModel, UserRecord } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnChanges {
  @Input()  id: string = "";
  model!: UserRecord;

  constructor(private service: UserService) { }
  
  
  public loadUser(id: string){
    this.service.getUser(id).subscribe(user => {
      this.model = user;
    });
  }

  ngOnChanges(): void {
    this.loadUser(this.id);
  }

}
