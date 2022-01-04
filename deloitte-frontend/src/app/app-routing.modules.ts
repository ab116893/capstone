import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {IndustryComponent} from './page/industry/industry.component';
import {FinancialComponent} from './page/financial/financial.component';
import {AnalysisComponent} from './page/analysis/analysis.component';
import {ManagementComponent} from './page/management/management.component';
import {BusinessComponent} from './page/business/business.component';

const routes: Routes = [
  {
    path: 'dashboard/company-overview',
    component: DashboardComponent
  }, {
    path: 'dashboard/industry',
    component: IndustryComponent
  }, {
    path: 'dashboard/financial',
    component: FinancialComponent
  }, {
    path: 'dashboard/analysis',
    component: AnalysisComponent
  }, {
    path: 'dashboard/management',
    component: ManagementComponent
  }, {
    path: 'dashboard/business-segment',
    component: BusinessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [
  DashboardComponent,
  IndustryComponent,
  FinancialComponent,
  AnalysisComponent,
  ManagementComponent,
  BusinessComponent
];
