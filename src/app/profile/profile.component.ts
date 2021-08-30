import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthService } from '../core/auth.service';
import { UserProfile } from '../core/user-profile.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  itemDoc!: AngularFirestoreDocument<UserProfile>;
  item$!: Observable<UserProfile | undefined>;

  user$: Observable<UserProfile>;

  uid: string | null;

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) {
    this.user$ = this.auth.user$;

    this.uid = this.route.snapshot.paramMap.get('id');
    console.log(this.uid);
  }

  async ngOnInit() {
    this.itemDoc = this.afs.doc<UserProfile>(`/users/${this.uid}`);
    this.item$ = this.itemDoc.valueChanges();
  }

}
