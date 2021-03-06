import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { ApiUserState, UserStateModel, User_State_Token } from '../states/apiuser.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { UserResource } from '../models/user.resource.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
   .row {
    margin-top: 90px;
    font-size: 14px;
    font-family: "Helvetica Nueue",Arial,Verdana,sans-serif;
   
  }
  `]
})
export class LoginComponent implements OnInit {
  @Select(state => state.User_State_Token.currentUser) currentUser$: Observable<UserResource>;
  @Select(state => state.User_State_Token.active) active$: Observable<Boolean>;
  loading= false;

loginForm:FormGroup;
  constructor(private router:Router,
               private fb:FormBuilder,
               private userSer:UserService,
               private alert:AlertService
              ) { }

  ngOnInit(): void {
   const user =  localStorage.getItem('currentUser');

   if(user){
     console.log(user);
     console.log(user,'beforeparse');
     const user1 = JSON.parse(user);
     console.log(user1.user.token,'userafterparse');
     this.userSer.verify(user1.user.token);
     this.active$.subscribe(res=>{
       if(res){
        this.router.navigate([`/user`]);
       }
     })
  
   }
    this.loginForm = this.fb.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]],
    })
  }
login(){
  if(this.loginForm.valid){
    this.loading = true;
    this.userSer.login(this.loginForm.value);
    setTimeout(() => {
      this.currentUser$.subscribe(res =>{
        console.log(res,'fdgdfg');
        if(res && res.token !== ''){
          this.loading = false;
          this.router.navigate([`/user`]);
        }
        else{
          this.loading = false;
          this.alert.showNotification('top','right',3,'Authentication Fail')
        }
      })
    },300);
    
}
}
updateProfile(){
  this.router.navigate([`/forgot`]);
}
createProfile(){
  this.router.navigate([`/register`]);
}
}
