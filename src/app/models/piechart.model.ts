import { ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexFill, ApexLegend, ApexDataLabels } from 'ng-apexcharts';
import { data } from 'jquery';

export class PieChart {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: ApexFill;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
 
};