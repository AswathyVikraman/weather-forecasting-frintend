import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { FrontpageComponent } from './components/frontpage/frontpage.component';

import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WeatherAppComponent } from './components/weather-app/weather-app.component';
import { WeatherDashboardComponent } from './components/weather-dashboard/weather-dashboard.component';
import { AddWeatherinfoComponent } from './components/weatherinfo/add-weatherinfo/add-weatherinfo.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'weather-app',
    component:WeatherAppComponent,
    canActivate:[AuthGuard]

  },
  
  {
    path:'about',
    component:AboutComponent,
    canActivate:[AuthGuard]

  },
  {
    path:'weather-dashboard',
    component:WeatherDashboardComponent,
    ///////user to restrict open weather-dashboard without login.......................
    canActivate:[AuthGuard]
  },
  {
    path:"frontpage",
    component:FrontpageComponent,
    canActivate:[AuthGuard]

  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
