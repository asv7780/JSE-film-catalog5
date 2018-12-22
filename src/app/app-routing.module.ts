import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginComponent} from './login/login.component';
import { MainComponent } from './main/main.component';
import { FilmsComponent} from './films/films.component';
import { ActorsComponent } from './actors/actors.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { ActorsCardComponent } from './actors-card/actors-card.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { CanDeactivateGuard} from './shared/guards/can-deactivate-guard.service';
import { AuthGuard} from './shared/guards/auth-guard.service';
import {AboutComponent} from './about/about.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent, canDeactivate: [CanDeactivateGuard]},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard]},
  {path: 'films', component: FilmsComponent, canActivate: [AuthGuard]},
  {path: 'actors', component: ActorsComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'films/:id', component: FilmCardComponent, canActivate: [AuthGuard]},
  {path: 'actors/:id', component: ActorsCardComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
