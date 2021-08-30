import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../core/user-profile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  col!: AngularFirestoreCollection<UserProfile>;
  items$!: Observable<UserProfile[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.col = this.afs.collection(`/users`);
    this.items$ = this.col.valueChanges();
  }

}
