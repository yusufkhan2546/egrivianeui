import { State, Store, StateContext, Action, StateToken } from '@ngxs/store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { GetPieGridData } from '../actions/dashboard.action';
import { DashBoardData, ChartData } from '../models/dashbordpie.model';
import { environment } from '../../environments/environment';
import {  Status, Complexity, Jonour } from '../helpers/enum';
const apiUrl = environment.apiUrl;
export class DashboardStateModel {
  dashboard: DashBoardData;
  status:ChartData;
  complexity:ChartData;
  jonour:ChartData;
}
const headers = new HttpHeaders({
  'content-type': 'application/json'
});

export const Dashboard_State_Token = new StateToken<DashboardStateModel>('Dashboard_State_Token')
@State<DashboardStateModel>({
  name: 'Dashboard_State_Token',
  defaults: {
    dashboard:null,
    status :null,
    complexity:null,
    jonour: null
  }
})

@Injectable()
export class DashBoardState {
  constructor(
    private store: Store,
    private http: HttpClient,
    private alert: AlertService) {
  }
  @Action(GetPieGridData)
  public dashdata(context: StateContext<DashboardStateModel>, { choice }: GetPieGridData) {
    switch (choice) {
      case 1: this.http.get(`${apiUrl}/users/dashboardStatus`,{headers}).subscribe((res: any) => {
        if (res.issue.length > 0) {
          let labels: any[] = [];
          let series: any[] = [];
          res.issue.forEach(item => {
            labels.push(Status[parseInt(item.status)]);
            series.push(item.count);
          });
          const state = context.getState();
         state.status = new ChartData(labels,series);
          context.patchState(state);

          
        }
      });
        break;
      case 2: this.http.get(`${apiUrl}/users/dashboardComplexity`,{headers}).subscribe((res: any) => {
        if (res.issue.length > 0) {
          let labels: any[] = [];
          let series: any[] = [];
          res.issue.forEach(item => {
            labels.push(Complexity[parseInt(item.complexity)]);
            series.push(item.count);
          });
          const state = context.getState();
          state.complexity = new ChartData(labels,series);
          context.patchState(state);
        }
      });
        break;
      case 3: this.http.get(`${apiUrl}/users/dashboardIssueJonour`,{headers}).subscribe((res: any) => {
        if (res.issue.length > 0) {
         let labels: any[] = [];
          let series: any[] = [];
          res.issue.forEach(item => {
            labels.push(Jonour[parseInt(item.issueJonour)]);
            series.push(item.count);
          });
          const state = context.getState();
          state.jonour = new ChartData(labels,series);
          context.patchState(state);
        }
      });
        break;
    }
  }
}