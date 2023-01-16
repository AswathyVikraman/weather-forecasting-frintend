import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {

  public username: string = "";

  constructor(private router:Router,private userstore: UserStoreService,private api: AuthService) { }

  ngOnInit(): void {

    this.userstore.getUserNameFromStore()
      .subscribe(val => {
        let usernameFromToken = this.api.getUsernameFromToken();
        this.username = val || usernameFromToken
      })
      
  }
  logout() {
    this.api.signOut();
  }
}
