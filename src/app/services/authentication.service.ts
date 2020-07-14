import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResource } from '../models/user.resource.model';
import { LoginUser } from '../actions/apiuser.action';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'content-type': 'application/json'
});

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserResource>;
    public currentUser: Observable<UserResource>;
    
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserResource>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserResource {
        return this.currentUserSubject.value;
    }

    public login(loginObj:LoginUser) {
      console.log('exec1');
       this.http.post(`${apiUrl}/users/login`,{loginObj},{headers})
            .pipe(map((user:UserResource) => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                console.log('exec');
                return user;
            }));
    }

    public logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
