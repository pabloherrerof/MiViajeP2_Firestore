import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DayFilterService {
  private filterSubject = new BehaviorSubject<string | null>(null);
  filter$ = this.filterSubject.asObservable();

  setFilter(day: string | null) {
    this.filterSubject.next(day);
  }
}