import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { WeatherModel } from '../weather-dashboard/weather-dashboard.model';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css']
})
export class WeatherAppComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  })


  public role!: string;

  public weatherList: Array<any> = [];
  constructor(private auth: AuthService,private userstore: UserStoreService) {

    this.searchForm.get('search')?.valueChanges.
      pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((res) =>
          this.auth.getWeatherbycity(res)
        )
      )
      .subscribe(
        (res) => {
          this.weatherList = res.weathermodelobj;
          console.log(res)
        }
      )
  }

  // city? means default value is undefined
  cityName: string = 'trivandrum';
  weatherData?: WeatherModel;
  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';

    this.userstore.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.auth.getRoleFromToken();
        this.role = val || roleFromToken;
      })

  }
  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
  }
  private getWeatherData(cityName: string) {
    this.auth.getWeatherbycity(cityName)
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(response);
        }
      })
  }
  
}
