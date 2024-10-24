import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import {AuthGuard} from "./services/AuthGuard";


const routes: Routes = [
  { path: '', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'cinema', loadChildren: () => import('./cinema/cinema.module').then(m => m.CinemaModule),  canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
