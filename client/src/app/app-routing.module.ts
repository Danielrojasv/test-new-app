import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { SynchronizeComponent } from "./components/synchronize/synchronize.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'synchronize', component: SynchronizeComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
