import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(u => !!u));
    this.user$ = this.afAuth.authState.pipe(
      tap(u => console.log(u)),
      //map(u => u),
    );
  }

  logout(): Promise<any> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

}
