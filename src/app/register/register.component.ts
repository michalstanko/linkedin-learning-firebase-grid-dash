import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      birthYear: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    
  }

  async submit() {
    this.loading = true;
    const { firstName, lastName, email, password, birthYear } = this.form.value;
    try {
      const resp = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await resp.user?.updateProfile({ displayName: `${firstName} ${lastName}` });
      const uid = resp.user?.uid;
      await this.auth.createUserDocument(firstName, lastName, birthYear);
      this.router.navigate([`/profile/${uid}`]);
    } catch (err) {
      console.warn(err.message);
    }

    this.loading = false;
  }

}
