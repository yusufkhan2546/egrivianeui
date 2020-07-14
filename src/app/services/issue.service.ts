import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetIssues, GetIssueById, CreateIssue, DeleteIssue } from '../actions/issue.action';
import { ISSUE } from '../models/issue.model';
// import { Issue_State_Token } from '../states/issue.state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
 // public data$ = new BehaviorSubject(Issue_State_Token);
  constructor(private store:Store) { }
  public getIssues(){
    return this.store.dispatch(new GetIssues());
  }
  public getIssue(id){
    return this.store.dispatch(new GetIssueById(id));
  }
  public createIssue(issue:ISSUE){
    return this.store.dispatch(new CreateIssue(issue));
  }
  public deleteIssue(id){
    return this.store.dispatch(new DeleteIssue(id));
  }
}
