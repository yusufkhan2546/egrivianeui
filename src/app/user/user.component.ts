import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
userForm:FormGroup;
value:'';
confirm = new FormControl();
  constructor(private fb:FormBuilder,
              private userSer:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
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

  }
  submitUser(){
    console.log(this.userForm);
    if(this.userForm.valid){
     this.userSer.createUser(this.userForm.value);
     this.router.navigate([`/user`])
    }else {
      this.userForm.markAllAsTouched();
    }
 
  }
  reset(){
    this.userForm.reset();

  }
  cancel(){
    this.reset();
  }

}
