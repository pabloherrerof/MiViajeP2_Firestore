import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/cityFilter/city-filter.service';
import { DayFilterService } from 'src/app/services/dayFilter/day-filter.service';
import { Observable, combineLatest } from 'rxjs';

import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { Itinerario } from 'src/app/interface/itinerario.interface';

@Component({
  selector: 'app-days-layout',
  templateUrl: './days-layout.component.html',
  styleUrls: ['./days-layout.component.scss']
})
export class DaysLayoutComponent {
  days$: Observable<Itinerario[]>;
  selectedDay?: Itinerario;

  constructor(private daysService: DaysFirestoreService, private filterService: FilterService, private dayFilterService: DayFilterService) { }

  selectPokemon(pokemon: Itinerario) {
    this.selectedDay = pokemon;
  }

  ngOnInit(): void {
    this.days$ = combineLatest([
      this.filterService.filter$,
      this.dayFilterService.filter$
    ]).pipe(
      switchMap(([ciudad, dia]) => {
        return this.daysService.getAll().pipe(
          map(days => {
            let tempData = days.sort((a, b) => a.dia - b.dia);

            if (ciudad && ciudad !== 'All') {
              tempData = tempData.filter(item => item.ciudad.nombre === ciudad);
            }

            if (dia && dia !== 'All') {
              tempData = tempData.filter(item => item.dia === +dia);
            }

            return tempData;
          })
        );
      })
    );

    // Esto solo es para propósitos de depuración.
    this.days$.subscribe(days => {
      console.log(days);
    });
  }
}
