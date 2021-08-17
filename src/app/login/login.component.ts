import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    
  }

  async submit() {
    console.log(this.form.value);
    this.loading = true;
    const { firstName, lastName, email, password } = this.form.value;
    try {
      const resp = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await resp.user?.updateProfile({ displayName: `${firstName} ${lastName}` });
      const uid = resp.user?.uid;
      this.router.navigate([`/profile/${uid}`]);
    } catch (err) {
      console.warn(err.message);
    }

    this.loading = false;
  }

}
