import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  public doughnutChartOptions = {
    title: {
      text: 'Overall',
      display: true
    },
  };
  public doughnutChartLabels = ['Divident', 'Yield%'];
  public doughnutChartData = [0.42, 2.12];
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
