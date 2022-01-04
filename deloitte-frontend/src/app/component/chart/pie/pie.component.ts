import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  public pieChartLabels = ['Current', '3 Month Ago', '2 Month Ago', '1 Month Ago'];
  public pieChartData = [18, 19, 19, 19];
  public pieChartType = 'pie';

  public pieChartLabelsOutperform = ['Current', '3 Month Ago', '2 Month Ago', '1 Month Ago'];
  public pieChartDataOutperform = [13, 12, 12, 13];
  public pieChartTypeOutperform = 'pie';

  public pieChartLabelsHold = ['Current', '3 Month Ago', '2 Month Ago', '1 Month Ago'];
  public pieChartDataHold = [2, 1, 1, 1];
  public pieChartTypeHold = 'pie';

  public pieChartLabelsUnderperform = ['Current', '3 Month Ago', '2 Month Ago', '1 Month Ago'];
  public pieChartDataUnderperform = [0, 0, 0, 0];
  public pieChartTypeUnderperform = 'pie';

  public pieChartLabelsSale = ['Current', '3 Month Ago', '2 Month Ago', '1 Month Ago'];
  public pieChartDataSale = [1, 1, 1, 1];
  public pieChartTypeSale = 'pie';
  constructor() { }

  ngOnInit() {
  }

}
