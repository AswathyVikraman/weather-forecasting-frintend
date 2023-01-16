import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private api:AuthService) { }

  ngOnInit(): void {
  }
  logout() {
    this.api.signOut();
  }
}
