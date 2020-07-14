
import { State,Store, StateContext, Action, StateToken } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISSUE } from '../models/issue.model';
import { GetIssues, GetIssueById, CreateIssue } from '../actions/issue.action';

import { AlertService } from '../services/alert.service';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
export class IssueStateModel {
  issues:ISSUE[];
  issue:ISSUE;
}
const headers = new HttpHeaders({
     'content-type': 'application/json'
  });

// export const Issue_State_Token = new StateToken<IssueStateModel>('Issue_State_Token')
@State <IssueStateModel> ({
   name:'Issue_State_Token',
   defaults:{
   issues:[],
   issue:null,
  }
})

@Injectable()
export class IssueState {
  constructor(
              private store:Store,
              private http:HttpClient,
              private alert:AlertService){
}
@Action(GetIssues)
public getIssues(context:StateContext<IssueStateModel>){
 this.http.get(`${apiUrl}/issues`,{headers}).subscribe((res:any)=>{
   if(res){
      const state = context.getState();
      state.issues = res.issues;
      context.patchState(state);
   }
 })
}
@Action(GetIssueById)
public getSummary1(context:StateContext<IssueStateModel>,{id}:GetIssueById){
 this.http.get(`${apiUrl}/issues/${id}`,{headers}).subscribe((res:any)=>{
   if(res){
      const state = context.getState();
      state.issue= res;
      context.patchState(state);
   }
 })
}
@Action(CreateIssue)
public createIssue(context:StateContext<IssueStateModel>,{issue}:CreateIssue){
    this.http.post(`${apiUrl}/issues`,issue,{headers}).subscribe(res=>{
        if(res){
            this.store.dispatch(new GetIssues());
            this.alert.showNotification('top','right',3,'Created SuccessFully')
             
        }
    })
}

}

