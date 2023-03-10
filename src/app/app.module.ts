import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWeatherinfoComponent } from './components/weatherinfo/add-weatherinfo/add-weatherinfo.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatToolbarModule} from '@angular/material/toolbar';
// import {MatIconModule} from '@angular/material/icon';
// import {MatButtonModule} from '@angular/material/button';
// import {MatDialogModule} from '@angular/material/dialog';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { WeatherAppComponent } from './components/weather-app/weather-app.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { FrontpageComponent } from './components/frontpage/frontpage.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
  
    AddWeatherinfoComponent,
    LoginComponent,
    SignupComponent,
    WeatherDashboardComponent,
    WeatherAppComponent,
    FrontpageComponent,
    AboutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // importent step to start angular validation
    ReactiveFormsModule,
    // import api
    HttpClientModule,
    BrowserAnimationsModule,
    // Ng2SearchPipeModule,
    // MatToolbarModule,
    // MatIconModule,
    // MatButtonModule,
    // MatDialogModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
