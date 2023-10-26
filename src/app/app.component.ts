import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import * as firebase from "firebase/app"; 

import 'firebase/firestore';
import { DaysFirestoreService } from './services/firestore/days-firestore.service';
import { Itinerario } from './interface/itinerario.interface';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MiViajeP2';
  
  days$: Observable<Itinerario[]>;


  constructor(
  ) {}

  ngOnInit(): void {
   
  }
}

