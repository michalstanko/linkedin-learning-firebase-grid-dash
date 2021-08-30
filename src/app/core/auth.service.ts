import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';
import { UserProfile } from './user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(u => !!u));
    this.user$ = this.afAuth.authState.pipe(
      tap(u => console.log(u)),
      //map(u => u),
    );
  }

  isLoggedIn(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  logout(): Promise<any> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  async createUserDocument(firstName: string, lastName: string, birthYear: number) {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email ? user.email : '',
        firstName,
        lastName,
        birthYear,
      };

      return this.afs.doc(`/users/${user.uid}`).set(userProfile);
    }
  }

}
