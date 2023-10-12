import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DaysLayoutComponent } from './components/days-layout/days-layout.component';
import { DaysDetailComponent } from './components/days-detail/days-detail.component';
import { PlayerComponent } from './components/player/player.component';

const routes: Routes = [
  { path: '', component: DaysLayoutComponent },
  { path: 'day/:dia', component: DaysDetailComponent },
  { path: 'day/:dia/video', component: PlayerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
