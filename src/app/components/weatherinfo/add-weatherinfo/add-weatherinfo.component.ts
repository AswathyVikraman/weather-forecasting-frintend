import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-weatherinfo',
  templateUrl: './add-weatherinfo.component.html',
  styleUrls: ['./add-weatherinfo.component.css']
})
export class AddWeatherinfoComponent implements OnInit {

  // addWeatherInfoRe
  constructor(private api:AuthService) { }

  ngOnInit(): void {
  }
  logout() {
    this.api.signOut();
  }
}
