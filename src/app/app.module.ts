import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FilmItemComponent} from './film-item/film-item.component';
import {FilmsComponent} from './films/films.component';
import {MainComponent} from './main/main.component';
import {ActorItemComponent} from './actor-item/actor-item.component';
import {ActorsComponent} from './actors/actors.component';
import {SearchComponent} from './search/search.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HttpClientModule} from '@angular/common/http';
import {ImgFallbackModule} from 'ngx-img-fallback';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtensionDirective} from './core/directives/extension.directive';
import { CONFIG, Config } from './config';
import { ActorsCardComponent } from './actors-card/actors-card.component';
import { FilmCardComponent } from './film-card/film-card.component';
import { SafePipe } from './pipes/safe.pipe';
import { TransformPathPipe } from './pipes/transform-path.pipe';
import { MatTabsModule} from '@angular/material/tabs';
import { TransformDescrPipe } from './pipes/transform-descr.pipe';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertsComponent } from './alerts/alerts.component';
import {CanDeactivateGuard} from './shared/guards/can-deactivate-guard.service';
import {AuthGuard} from './shared/guards/auth-guard.service';
import {MessagesService} from './core/services/messages.service';
import {AuthService} from './core/services/auth.service';
import { AboutComponent } from './about/about.component';


export function initConfig() {
  const apiUrl = 'https://api.themoviedb.org/3';
  const apiKey = 'fc264fbd1650e19b79c63e0ae2473937';
  const imgPath = 'https://image.tmdb.org/t/p';
  return {
    apiUrl: 'https://api.themoviedb.org/3',
    apiKey: 'fc264fbd1650e19b79c63e0ae2473937',
    searchUrl: `${apiUrl}/search`,
    movieUrl: `${apiUrl}/movie`,
    adult: '&include_adult=false',

    personUrl: `${apiUrl}/person`,
    params: `&api_key=${apiKey}&language=en-US`,
    searchParams: `&api_key=${apiKey}&language=en-US&query=`,
    imgPath: 'https://image.tmdb.org/t/p',
    midImgPath: `${imgPath}/w500`,
    smallImgPath: `${imgPath}/w185`,
    bigBackPath: `${imgPath}/w1400_and_h450_face`,
    midBackPath: `${imgPath}/w780`,
    smallBackPath: `${imgPath}/w300`
  } as Config;
}

@NgModule({
  declarations: [
    AppComponent,
    FilmItemComponent,
    FilmsComponent,
    MainComponent,
    ActorItemComponent,
    ActorsComponent,
    SearchComponent,
    NavbarComponent,
    ExtensionDirective,
    ActorsCardComponent,
    FilmCardComponent,
    SafePipe,
    TransformPathPipe,
    TransformDescrPipe,
    LoginComponent,
    RegistrationComponent,
    NotFoundComponent,
    AlertsComponent,
    AboutComponent,

  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ImgFallbackModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthService,
    MessagesService,
    AuthGuard,
    CanDeactivateGuard,
    {
      provide: CONFIG, useFactory: (initConfig)
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
