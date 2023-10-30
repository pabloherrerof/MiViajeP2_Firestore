import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  collection,
  doc,
  addDoc,
  deleteDoc, updateDoc
} from '@firebase/firestore';
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore';
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

  create(day: Itinerario) {
    try {
      const plainObject = JSON.parse(JSON.stringify(day));
      return addDoc(this.dayCollection, plainObject);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);; 
    }
  }

  update(id: string, data: Partial<Itinerario>): Promise<void> {
    try {
      const docRef = doc(this.firestore, 'data', id);
      console.log(data)
      console.log(docRef)
      return updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating document:', error);
      return Promise.reject(error);
    }
  }

  delete(id: string ) {
    try {
      return deleteDoc(doc(this.firestore, 'data', id));
    } catch (error) {
      console.log(error);
      return null; 
    }
  }

}

