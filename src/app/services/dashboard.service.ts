import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dashboard_State_Token } from '../states/dashboard.state';
import { Store } from '@ngxs/store';
import { GetPieGridData } from '../actions/dashboard.action';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public data$ = new BehaviorSubject(Dashboard_State_Token);
  constructor(private store:Store) { }
  public getGridData(choice:number){
    return this.store.dispatch(new GetPieGridData(choice));
  }
}
