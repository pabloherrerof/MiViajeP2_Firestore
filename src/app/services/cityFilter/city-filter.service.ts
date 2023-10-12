import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<string>("");
  filter$ = this.filterSubject.asObservable();

  setFilter(city: string) {
    this.filterSubject.next(city);
  }
}
