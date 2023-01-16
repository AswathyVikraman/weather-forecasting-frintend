import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Weather } from '../models/weather.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherinfonewService {
 baseapiUrl:string=environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllWeatherInfo():Observable<Weather[]>{
return this.http.get<Weather[]>(this.baseapiUrl+'/api//Weather/get_info');
  }
}
