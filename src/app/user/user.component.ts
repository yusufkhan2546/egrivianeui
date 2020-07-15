import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserResource } from '../models/user.resource.model';
import { Assign } from '../models/Assign.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  currentUser:UserResource;
  updateUserForm:FormGroup;
  userForm:FormGroup;
  value:'';
  updatePayload:any[];
confirm = new FormControl();
  constructor(private fb:FormBuilder,
              private userSer:UserService,
              private router:Router) { }
  ngOnInit(): void {
    this.userForm = this.fb.group({
      _id:[''],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      pincode:['',[Validators.required]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      dob:['',[Validators.required]],
      gender:['',[Validators.required]],
      phone:['',[Validators.required]]
    });
    this.updateUserForm = this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      state:['',[Validators.required]],
      pincode:['',[Validators.required]],
      email:['',[Validators.required]],
      dob:['',[Validators.required]],
      gender:['',[Validators.required]],
      phone:['',[Validators.required]]
    });
    const user =  localStorage.getItem('currentUser');
    if(user){
      const user1 = JSON.parse(user);
      this.currentUser = user1.user;
      this.mapUser(this.updateUserForm ,this.currentUser);
    }
  }
 
  submitUser(){
    console.log(this.userForm);
    if(this.userForm.valid){
     this.userSer.createUser(this.userForm.value);
     this.router.navigate([`/user`]);
    } else {
      this.userForm.markAllAsTouched();
    }
 
  }
  upadateUser(){
    if(this.currentUser && this.updateUserForm.valid) {
      const payload = this.mapToUpdate(this.updateUserForm);
      this.userSer.updateUser(payload,this.currentUser._id);
      this.router.navigate([`/user`]);
    } else {
      this.updateUserForm.markAllAsTouched();
    }
    
  
    
  }
  mapUser(FormGroup:FormGroup,User:UserResource){
      FormGroup.get('firstName').setValue(User.firstName);
      FormGroup.get('lastName').setValue(User.lastName);
      FormGroup.get('email').setValue(User.email);
      FormGroup.get('city').setValue(User.city);
      FormGroup.get('state').setValue(User.state);
      FormGroup.get('address').setValue(User.address);
      FormGroup.get('gender').setValue(User.gender);
     // FormGroup.get('password').setValue(User.password);
      FormGroup.get('pincode').setValue(User.pincode);
      FormGroup.get('phone').setValue(User.phone);
      FormGroup.get('dob').setValue(User.dob);
  }
  mapToUpdate(FormGroup:FormGroup){
    let payload:any[] = [];
     if(FormGroup.valid){
        payload.push(new Assign("firstName",FormGroup.get('firstName').value));
        payload.push(new Assign("lastName",FormGroup.get('lastName').value));
        payload.push(new Assign("email",FormGroup.get('email').value));
        payload.push(new Assign("city",FormGroup.get('city').value));
        payload.push(new Assign("state",FormGroup.get('state').value));
        payload.push(new Assign("address",FormGroup.get('address').value));
        payload.push(new Assign("pincode",FormGroup.get('pincode').value));
        payload.push(new Assign("phone",FormGroup.get('phone').value));
        payload.push(new Assign("dob",FormGroup.get('dob').value));
     }
     return payload;
  }
  reset(){
    this.userForm.reset();
    this.updateUserForm.reset();

  }
  cancel(){
    this.reset();
  }

}
