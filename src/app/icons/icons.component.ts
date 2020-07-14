import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { IssueService } from '../services/issue.service';
import { ISSUE } from '../models/issue.model';
import { Select } from '@ngxs/store';
import { IssueState,  IssueStateModel } from '../states/issue.state';
import { Observable } from 'rxjs';
import { Complexity, Status, Jonour } from '../helpers/enum';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','symbol1','symbol2'];
  dataSource: MatTableDataSource <ISSUE>;
  Complexity:Complexity;
  Status:Status;
  IssueJonour:Jonour;
  @Select(IssueState) pandas$: Observable<IssueStateModel>;
 
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private issueSer:IssueService) { }

  ngOnInit() {
    this.issueSer.getIssues();
  this.pandas$.subscribe((res)=>{
    if(res){
      console.log(res.issues);
      this.dataSource = new MatTableDataSource<ISSUE>(res.issues);
      this.dataSource.paginator = this.paginator;
    }
  })
  }
  getJonour(number:number){
    return Jonour[number];
  }
  getComplexity(number:number){
    return Complexity[number];
  }
  getStatus(number:number){
    return Status[number];
  }
  getFileNum(string:string){
    return string.slice(16)
  }

}
