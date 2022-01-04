import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  public barChartOptions = {
    title: {
      text: 'Sales(in million)',
      display: true
    },
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['YE Jun-19', 'YE Jun-20', 'QE Dec-19', 'QE Mar-19'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [124058, 137008, 35582.1, 29838.8], label: 'high'},
    {data: [125285, 141928, 36716, 30155], label: 'low'},
    {data: [122924, 130068, 34319.8, 29549], label: '1 year ago'},
    {data: [124058.00, 137008.00	, 35582.10, 29838.80	], label: 'Mean'},
  ];

  public barChartOptionsEarning = {
    title: {
      text: 'Earning(Per Share)',
      display: true
    },
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsEarning = ['YE Jun-19', 'YE Jun-20', 'QE Dec-19', 'QE Mar-19', 'LT Growth'];
  public barChartTypeEarning = 'bar';
  public barChartLegendEarning = true;
  public barChartDataEarning = [
    {data: [4.43, 5, 1.24, 1, 14.52], label: 'high'},
    {data: [4.55, 5.55, 1.3, 1.04, 16.8], label: 'low'},
    {data: [4.35, 4.45, 12.3, 0.96, 12.3], label: '1 year ago'},
    {data: [4.43, 5	, 1.24, 1, 14.52	], label: 'Mean'},

  ];

  constructor() { }

  ngOnInit() {
  }

}
