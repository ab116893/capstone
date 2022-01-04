import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes, Router} from '@angular/router';
import {LandingComponent} from './page/landing/landing.component';
import {AppRoutingModule, routingComponents} from './app-routing.modules';
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatGridListModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule, MatExpansionModule
} from '@angular/material';
import {NavigationComponent} from './component/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IndustryComponent} from './page/industry/industry.component';
import {FinancialComponent} from './page/financial/financial.component';
import {BusinessComponent} from './page/business/business.component';
import {ManagementComponent} from './page/management/management.component';
import {AnalysisComponent} from './page/analysis/analysis.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './component/chart/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './component/chart/doughnut-chart/doughnut-chart.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AutocompleteComponent } from './component/autocomplete/autocomplete.component';
import { ManagementTableComponent } from './component/management-table/management-table.component';
import { PieComponent } from './component/chart/pie/pie.component';
import { MatMenuModule} from '@angular/material/menu';

const landingRoutes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavigationComponent,
    routingComponents,
    IndustryComponent,
    FinancialComponent,
    BusinessComponent,
    ManagementComponent,
    AnalysisComponent,
    BarChartComponent,
    DoughnutChartComponent,
    AutocompleteComponent,
    ManagementTableComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    RouterModule.forRoot(landingRoutes),
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
