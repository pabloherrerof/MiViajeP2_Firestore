import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/cityFilter/city-filter.service';
import { DayFilterService } from 'src/app/services/dayFilter/day-filter.service';
interface ItineraryItem {
  dia: number;
  ciudad: {
    nombre: string;
    imagen: string;
  };
  video: {
    miniatura: string;
    link: string;
  };
  actividades: string[];
  hotel: {
    foto: string;
    nombre: string;
    direccion: string;
  };
}
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  itineraries: ItineraryItem[] = [];
  
  constructor(private http: HttpClient, private filterService: FilterService, private dayFilterService: DayFilterService) {}

  ngOnInit(): void {
    this.http.get<ItineraryItem[]>('assets/data.json').subscribe(data => {
      this.itineraries = data;
    });
  }

  get uniqueCities(): string[] {
    const cities = this.itineraries.map(item => item.ciudad.nombre);
    return [...new Set(cities)]; // Esto elimina las ciudades repetidas
  }
  get uniqueDays(): number[] {
    const days = this.itineraries.map(item => item.dia);
    return [...new Set(days)].sort((a, b) => a - b); // Esto elimina días repetidos y los ordena
  }

  onCityChange(event: any) {
    this.filterService.setFilter(event.target.value);
  }

  onDayChange(event: any) {
    this.dayFilterService.setFilter(event.target.value);
  }
  
  
}
