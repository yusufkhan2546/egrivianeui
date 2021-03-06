import { User } from '../models/user.model';
import { Login } from '../models/login.model';

export class GetUsers {
    static readonly type = '[User] GET' ;
    constructor(){}
 }
 export class GetUserById{
     static readonly type = '[User] GETBYID' ;
     constructor(public id:String){}
  } 
  export class CreateUser{
     static readonly type = '[User] Create' ;
     constructor(public User:User){}
  } 
  export class DeleteUser{
     static readonly type = '[User] Delete' ;
     constructor(public id:string){}
  } 
  export class LoginUser{
    static readonly type = '[User] Login' ;
    constructor(public loginpay:Login){}   
  }
  export class Verify {
     static readonly type = '[User] Verify';
     constructor(public token:string){}
  }
  export class UpdateUser{
   static readonly type = '[User] Update' ;
   constructor( public payload:any[],
                public userid:String){}
} 
export class LogOut {
   static readonly type = '[User] Logout';
   constructor(){}
}