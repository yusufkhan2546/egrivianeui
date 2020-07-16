import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ISSUE } from '../models/issue.model';
import { Jonour, Complexity, Status } from '../helpers/enum';
import { Assign } from '../models/Assign.model';
import { IssueService } from '../services/issue.service';


@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  @Select(state=>state.Issue_State_Token.issue)issue$:Observable<ISSUE>;
  issue:ISSUE;
  status = new FormControl();
  constructor(
    private issueSer:IssueService
  ) { }

  ngOnInit() {
    this.issue$.subscribe(res=>{
      if(res){
        this.issue = res;
        this.status.setValue(res.status);
      }
    });
  }
update(){
 
 let payload:any[] = [];
 if(this.status.valid){
   payload.push(new Assign('status',this.status.value));
   this.issueSer.updateIssue(payload,this.issue._id);
 }
 
}
setStatus(){

}
getFormStatus(){
  return this.status.untouched && this.status.invalid;
}
getFileNum(string:string){
  if(string){
    return string.slice(16)
  }

}
}
