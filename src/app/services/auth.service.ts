import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
// for user data description(decode token)
// import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string="https://localhost:7049/api/Authenticate/"
  private baseUrl1:string="https://localhost:7049/api/Weather/"
  private baseUrl2:string="https://localhost:7049/api/User/"

  private userPayload: any;

  constructor(private http:HttpClient,private router:Router) {
    this.userPayload = this.decodeToken()

   }

  // PostWeatherinfo(data:any){
  //   return this.http.post<any>()
  // }
  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl2}register`,userObj)
  }
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl2}authenticate`,loginObj)
  }
  postWeather(data:any){
    return this.http.post<any>(`${this.baseUrl1}Add_Weatherinfo`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getWeather(){
    return this.http.get<any>(`${this.baseUrl1}get_info`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  // getWeatherbycity(city:string){
  //   return this.http.get<any>(`https://localhost:7049/api/Weather/get_info/city?city=${city}`)
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }
  getWeatherbycity(city:string):Observable<any>{
    return this.http.get<any>(`https://localhost:7049/api/Weather/get_info/city?city=${city}`)
    // .pipe(map((res:any)=>{
    //   return res;
    // }))
  }
  updateWeather(data:any){
    return this.http.put<any>("https://localhost:7049/api/Weather/Update info/",data)

  }
  deleteWeather(id:number){
    return this.http.delete<any>("https://localhost:7049/api/Weather/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  decodeToken(){
    const jwtHelper=new JwtHelperService();
    const token=this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getUsernameFromToken() {
    if (this.userPayload) {
      return this.userPayload.name;
    }
  }
  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }


  getWeatherData(city:string){
    this.http.get(`${this.baseUrl2}authenticate`,)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
