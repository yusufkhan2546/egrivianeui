import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
// import { User_State_Token } from '../states/apiuser.state';
import { GetUsers, GetUserById, CreateUser, DeleteUser, LoginUser, Verify } from '../actions/apiuser.action';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { User_State_Token } from '../states/apiuser.state';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store:Store) { }
   public data$ = new BehaviorSubject(User_State_Token);
  public getUsers(){
     this.store.dispatch(new GetUsers());
  }
  public getUser(id){
   this.store.dispatch(new GetUserById(id));
  }
  public createUser(User:User){
    this.store.dispatch(new CreateUser(User));
  }
  public deleteUser(id){
     this.store.dispatch(new DeleteUser(id));
  }
  public login(login:Login){
     this.store.dispatch(new LoginUser(login));
  }
  public logout(){
    localStorage.removeItem('currentUser')
  }
  public verify(token){
   return this.store.dispatch(new Verify(token));
  }
}

