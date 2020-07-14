import { Component, OnInit } from '@angular/core';
import { UserResource } from '../models/user.resource.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
currentUser:UserResource;
  constructor() { }

  ngOnInit() {
    const user =  localStorage.getItem('currentUser');
    if(user){
      const user1 = JSON.parse(user);
      this.currentUser = user1.user;
    }
  }

}
