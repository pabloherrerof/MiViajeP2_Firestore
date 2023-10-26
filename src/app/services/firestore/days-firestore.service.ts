import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  collection,
  doc
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Itinerario } from 'src/app/interface/itinerario.interface';




@Injectable({
  providedIn: 'root'
})
export class DaysFirestoreService {
  private dayCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) { 
    this.dayCollection = collection(this.firestore, 'data');
  }

  getAll() {
    return collectionData(this.dayCollection, {
      idField: 'id',
    }) as Observable<Itinerario[]>;
  }

  get(id: string): Observable<Itinerario> {
    return docData(doc(this.firestore, 'data', id), {
      idField: 'id',
    }) as Observable<Itinerario>;
  }
  }

