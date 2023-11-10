import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { FilterService } from 'src/app/services/cityFilter/city-filter.service';
import { DayFilterService } from 'src/app/services/dayFilter/day-filter.service';
import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  days$: Observable<Itinerario[]>;
  uniqueCities$: Observable<string[]>;
  uniqueDays$: Observable<number[]>;

  constructor(
    private http: HttpClient, 
    private filterService: FilterService, 
    private dayFilterService: DayFilterService, 
    private cdr: ChangeDetectorRef, 
    private dayService: DaysFirestoreService
  ) {}

  ngOnInit(): void {
    // Asignamos el Observable a this.days$
    this.days$ = this.dayService.getAll();

    // Creamos un nuevo Observable para ciudades únicas
    this.uniqueCities$ = this.days$.pipe(
      map(days => days.map(day => day.ciudad.nombre)),
      map(names => Array.from(new Set(names)))
    );

    // Creamos un nuevo Observable para días únicos
    this.uniqueDays$ = this.days$.pipe(
      map(days => days.map(day => day.dia)),
      map(days => Array.from(new Set(days)).sort((a, b) => a - b))
    );
  }

  // Las siguientes funciones asumen que se están llamando con los datos ya emitidos
  onCityChange(event: any) {
    this.filterService.setFilter(event.target.value);
  }

  onDayChange(event: any) {
    this.dayFilterService.setFilter(event.target.value);
  }
}
