import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WeatherModel } from './weather-dashboard.model';
import { AuthService } from 'src/app/services/auth.service';
import { Weather } from 'src/app/models/weather.model';
import { WeatherinfonewService } from 'src/app/services/weatherinfonew.service';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit {




  searchText!: any;
  heroes = this.getAllWeather();



  public username: string = "";

  public role!: string;

  formvalue!: FormGroup;

  weathermodelobj: WeatherModel = new WeatherModel();



  weatherData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  weather: Weather[] = [];

  constructor(private formbuilder: FormBuilder, private api: AuthService,
    private weatherinfoService: WeatherinfonewService, private router: Router,
    private userstore: UserStoreService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      id: [''],
      city: [''],
      category: [''],
      datetime: [''],
      temperature: [''],
      role: [''],
    });

    this.userstore.getUserNameFromStore()
      .subscribe(val => {
        let usernameFromToken = this.api.getUsernameFromToken();
        this.username = val || usernameFromToken
      })
    // to select role to show or hide side navebar
    this.userstore.getRoleFromStore()
      .subscribe(val => {
        let roleFromToken = this.api.getRoleFromToken();
        this.role = val || roleFromToken;
      })



    this.getAllWeather();
  }
  clickAddWeather() {
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postWeatherDetails() {
    // this.weathermodelobj.id=this.formvalue.value.id;
    this.weathermodelobj.city = this.formvalue.value.city;
    this.weathermodelobj.category = this.formvalue.value.category;
    this.weathermodelobj.datetime = this.formvalue.value.datetime;
    this.weathermodelobj.temperatureC = this.formvalue.value.temperature;
    this.weathermodelobj.role = this.formvalue.value.role;

    this.api.postWeather(this.weathermodelobj)
      .subscribe(res => {
        console.log(res);
        alert("Details added successfully!");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formvalue.reset();
        this.getAllWeather();
      },
        error => {
          alert("something went wrong!");
        })

  }
  getAllWeather() {
    this.api.getWeather()
      .subscribe(res => {
        this.weatherData = res.details;
      })
  }

  deleteWeather(row: any) {
    if (confirm("Are you sure??")) {
      this.api.deleteWeather(row.id)
        .subscribe(res => {
          alert("details deleted!!!!!!");
          this.getAllWeather();
        })
    }

  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.weathermodelobj.id = row.id;
    this.formvalue.controls['city'].setValue(row.city)
    this.formvalue.controls['category'].setValue(row.category)
    this.formvalue.controls['datetime'].setValue(row.datetime)
    this.formvalue.controls['temperature'].setValue(row.temperatureC)
  }
  updateWeatherDetails() {
    this.weathermodelobj.city = this.formvalue.value.city;
    this.weathermodelobj.category = this.formvalue.value.category;
    this.weathermodelobj.datetime = this.formvalue.value.datetime;
    this.weathermodelobj.temperatureC = this.formvalue.value.temperature;
    this.api.updateWeather(this.weathermodelobj)
      .subscribe(res => {
        alert("updated details!!!!!!!!!!!");
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formvalue.reset();
        this.getAllWeather();
      },
        error => {
          alert("city can't be changed!!!");
        })
  }
  logout() {
    this.api.signOut();
  }
}
