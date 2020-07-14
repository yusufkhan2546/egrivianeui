import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../services/alert.service';

import { IssueService } from '../services/issue.service';
import { Complexity, Jonour, Status } from '../helpers/enum';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ISSUE } from '../models/issue.model';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
issue:ISSUE;
Complexity:Complexity;
IssueJonour:Jonour;
Status:Status;
issueForm :FormGroup;
  constructor(private toastr: ToastrService,
              private alert:AlertService,
              private IssuerSer:IssueService,
              private fb:FormBuilder,
              private router:Router) {}
  ngOnInit() {
    this.issueForm = this.fb.group({
      name:['',[Validators.required]],
      issue:['',[Validators.required]],
      place:['',[Validators.required]],
      pincode:['',[Validators.required]],
      issueJonour:['',[Validators.required]],
      complexity:['',[Validators.required]],
      status:[Status.Solved]
    });
  }
submitIssueForm(){
  console.log(this.issueForm)
  if(this.issueForm.valid){
    this.IssuerSer.createIssue(this.issueForm.value);
    this.issueForm.reset();
    this.router.navigate([`/user/icons`])
  }else {
    this.issueForm.markAllAsTouched();
  }
}
onJonour(event:MatSelectChange){
  if(event.value){
    this.issueForm.get('issueJonour').setValue(Jonour[event.value]);
  }

}
onComplexity(event:MatSelectChange){
  console.log(event)
  if(event.value){
    this.issueForm.get('complexity').setValue(Complexity[event.value]);
  }
}
numbersOnly(event){
  if(event.key.match(/\d/)){
  
  }else{
    event.preventDefault();
  }
}
textOnly(event){
  if(event.key.match(/\d/)){
    event.preventDefault();
  }else{
    
  }
}
reset(){
this.issueForm.reset();
}
cancel(){
this.reset();
}
  
}
