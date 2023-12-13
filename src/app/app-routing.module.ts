import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DataComponent } from './components/data/data.component';
import { AnalysisComponent } from './components/analysis/analysis.component';
import { MonitorComponent } from './components/monitor/monitor.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'data', component: DataComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'monitor', component: MonitorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
