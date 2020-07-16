import { ISSUE } from '../models/issue.model';

export class GetIssues {
   static readonly type = '[ISSUE] GET' ;
   constructor(){}
}
export class GetIssueById{
    static readonly type = '[ISSUE] GETBYID' ;
    constructor(public id:String){}
 } 
 export class CreateIssue{
    static readonly type = '[ISSUE] Create' ;
    constructor(public issue:ISSUE){}
 } 
 export class DeleteIssue{
    static readonly type = '[ISSUE] Delete' ;
    constructor(public id:string){}
 } 
 export class UpdateIssue{
   static readonly type = '[Issue] Update' ;
   constructor( public payload:any[],
                public issueid:String){}
}