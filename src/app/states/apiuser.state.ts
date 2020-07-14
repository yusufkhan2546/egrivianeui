
import { State,Store, StateContext, Action, StateToken } from '@ngxs/store';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/User.model';
import { GetUsers, GetUserById, CreateUser, LoginUser, Verify } from '../actions/apiuser.action';

import { AlertService } from '../services/alert.service';
import { UserResource } from '../models/user.resource.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
export class UserStateModel {
  Users:User[];
   currentUser: UserResource;
   active:Boolean;
}
const headers = new HttpHeaders({
     'Content-Type': 'application/json',
  });

 export const User_State_Token = new StateToken<UserStateModel>('User_State_Token')
@State <UserStateModel> ({
   name:'User_State_Token',
    defaults:{
     Users:[],
     currentUser: null,
     active:false,
 
  }
})

@Injectable()
export class ApiUserState {
  constructor(
              private store:Store,
              private http:HttpClient,
              private alert:AlertService,
              private router:Router,
             ){
}
@Action(GetUsers)
public getUser(context:StateContext<UserStateModel>){
 return this.http.get(`${apiUrl}/users`,{headers}).subscribe((res:User[])=>{
   if(res){
      const state = context.getState();
      state.Users = res;
      context.patchState(state);
   }
 })
}
@Action(GetUserById)
public getSummary1(context:StateContext<UserStateModel>,{id}:GetUserById){
 return this.http.get(`${apiUrl}/users/${id}`,{headers}).subscribe((res:any)=>{
   if(res){
      const state = context.getState();
      state.currentUser= res;
      context.patchState(state);
   }
 })
}
@Action(CreateUser)
public createUser(context:StateContext<UserStateModel>,{User}:CreateUser){
    return this.http.post(`${apiUrl}/users/signup`,User,{headers}).subscribe(res=>{
        if(res){
            this.store.dispatch(new GetUsers());
            this.alert.showNotification('top','right',3,'Created SuccessFully');
        }
    })
}
@Action(LoginUser)
public login(context:StateContext<UserStateModel>,{loginpay}:LoginUser){
 return this.http.post(`${apiUrl}/users/login`,loginpay,{headers}).subscribe((res:any)=>{
      if(res){  
        console.log(res);
        const state = context.getState();
        localStorage.setItem('currentUser', JSON.stringify(res));
        state.currentUser = res.user;
        context.patchState(state);  
      }
  })
}
@Action(Verify)
public verify(context:StateContext<UserStateModel>,{token}){
  return this.http.post(`${apiUrl}/users/verify`,'',{headers}).subscribe((res:any)=>{
      if(res.message ==='Auth Success'){ 
        const state = context.getState();
        state.active = true;
        context.patchState(state);  
     
      }
      return res;
  })
}
}

