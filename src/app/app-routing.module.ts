import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysLayoutComponent } from './components/days-layout/days-layout.component';
import { DaysDetailComponent } from './components/days-detail/days-detail.component';

const routes: Routes = [
  { path: '', component: DaysLayoutComponent },
  { path: 'day/:dia', component: DaysDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
