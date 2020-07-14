import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LinearChart } from '../models/linearchart.model';
import { ChartComponent, ApexNonAxisChartSeries } from 'ng-apexcharts';
import { PieChart } from '../models/piechart.model';
import { DashboardService } from '../services/dashboard.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ChartData } from '../models/dashbordpie.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit ,AfterViewInit {
  
  @Select(state => state.Dashboard_State_Token.status) status$:Observable<ChartData>;
  @Select(state => state.Dashboard_State_Token.complexity) complexity$:Observable<ChartData>;
  @Select(state => state.Dashboard_State_Token.jonour) jonour$:Observable<ChartData>;
  chartOptions:LinearChart;
  chartOptions1:PieChart;
  chartOptions2:PieChart;
  chartOptions3:PieChart;
  data:any;
  data2:any;
  data3:any;
  @ViewChild("chart1") chart1: ChartComponent;
  constructor(private dashSer:DashboardService) { 
   
  }
ngOnInit(){
  this.chartOptions1 = new PieChart();
  this.chartOptions2 = new PieChart();
  this.chartOptions3 = new PieChart();
this.dashSer.getGridData(1);
this.dashSer.getGridData(2);
this.dashSer.getGridData(3);
this.status$.subscribe(res=>{
  if(res){
    this.data = res;
  }
});
this.complexity$.subscribe(res=>{
  if(res){
    this.data2 = res;
  }
});
this.jonour$.subscribe(res=>{
  if(res){
    this.data3 = res;
    console.log(this.data3,'res');
  }
 
});

  // this.chartOptions.series =[
  //   {
  //     name:'Raised',
  //     data: [10, 41, 35, 51, 49, 45,23,66,4]
  //   },
  //   {
  //     name:'Solved',
  //     data:[1,2,3,4,5,6,7,7,8]
  //   }
   
  // ];
  // this.chartOptions.dataLabels ={
  //   enabled: false
  // }
  // this.chartOptions.stroke = {
  //   curve: "smooth"
  // }
  // this.chartOptions.xaxis = {
  //   labels: {
  //     show: false,}
  // }
  // this.chartOptions.yaxis ={
  //   labels: {
  //     show: false,}
  // }
  // this.chartOptions.title= {
  //   text: "Issues"
  // };
  // this.chartOptions.chart = {
  //   height:250,
  //   type: "area",
  //   zoom: {
  //     enabled: false
  //   }
  // }
  // this.chartOptions.legend = {
  //   show:false,
  // }
  // 1st chart
  this.chartOptions1.series = [10,20];
  this.chartOptions1.labels = ["Loading","Loading"]
  this.chartOptions1.chart ={
    width:280,
    type: "donut"
  },
  this.chartOptions1.dataLabels= {
    enabled: true
  },
  this.chartOptions1.fill={
    type: "gradient"
  },
  this.chartOptions1.legend = {
    show:false,
  }
 
  this.chartOptions1.responsive = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        
      }
    }
  ]
  //second chart
  this.chartOptions2.series = [10,20,30];
  this.chartOptions2.labels = ["Loading","Loading","Loading"];
  this.chartOptions2.chart ={
    width:280,
    type: "donut"
  },
  this.chartOptions2.dataLabels= {
    enabled: true
  },
  this.chartOptions2.fill={
    type: "gradient"
  },
  this.chartOptions2.legend = {
    show:false,
  }
 
  this.chartOptions2.responsive = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        
      }
    }
  ]

  //thirdchart
  this.chartOptions3.series = [5,15];
  this.chartOptions3.labels = ["Loading","Loading"]
  this.chartOptions3.chart ={
    width:280,
    type: "donut"
  },
  this.chartOptions3.dataLabels= {
    enabled: true
  },
  this.chartOptions3.fill={
    type: "gradient"
  },
  this.chartOptions3.legend = {
    show:false,
  }
 
  this.chartOptions3.responsive = [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        
      }
    }
  ]
}
ngAfterViewInit(){
 setTimeout(() => {
   this.chartOptions1.series = this.data.labels;
   this.chartOptions1.labels = this.data.series;
   this.chartOptions2.series = this.data2.labels;
   this.chartOptions2.labels = this.data2.series;
   this.chartOptions3.series = this.data3.labels;
   this.chartOptions3.labels = this.data3.series;
 }, 3000);
}

}
