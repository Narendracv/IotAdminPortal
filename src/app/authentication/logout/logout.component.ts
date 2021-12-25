import { Component, OnInit } from '@angular/core';
import { AuthenicationService } from '../authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthenicationService) {}

  ngOnInit(): void {}
  onLogout() {
    this.authService.logout();
  }
}
