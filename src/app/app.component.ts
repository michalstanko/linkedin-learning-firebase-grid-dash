import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'linkedin-learning-firebase-grid-dash';

  constructor(
    public auth: AuthService,
    private router: Router,
  ) {
    
  }

  ngAfterViewInit() {
    this.auth.user$.subscribe(u => console.log(u));
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.auth.logout();
  }
}
