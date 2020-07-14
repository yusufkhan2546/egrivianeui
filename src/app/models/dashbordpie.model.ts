import { ApexNonAxisChartSeries } from 'ng-apexcharts';

export class DashBoardData {
    status:ChartData ;
    complexity:ChartData;
    jonour:ChartData;
}
export class ChartData {
    series: []=[];
    labels:[] = [];
    constructor(series,labels){
        this.series= series;
         this.labels = labels;
    }
}