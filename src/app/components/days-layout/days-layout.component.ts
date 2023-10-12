import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilterService } from 'src/app/services/cityFilter/city-filter.service';
import { DayFilterService } from 'src/app/services/dayFilter/day-filter.service';
import { combineLatest } from 'rxjs';

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
  selector: 'app-days-layout',
  templateUrl: './days-layout.component.html',
  styleUrls: ['./days-layout.component.scss']
})
export class DaysLayoutComponent {
  itinerary: ItineraryItem[]  = [];
  filteredData : ItineraryItem[] = [];

  constructor(private http: HttpClient, private filterService: FilterService, private dayFilterService: DayFilterService) { }

  ngOnInit(): void {
    this.loadData();
    
  }

 
  loadData(): void {
    this.http.get<ItineraryItem[]>('assets/data.json').subscribe(data => {
      this.itinerary = data;
      this.filteredData = data;
    });
  
    combineLatest([
      this.filterService.filter$,
      this.dayFilterService.filter$
    ]).subscribe(([ciudad, dia]) => {
      console.log(dia)
      let tempData = this.itinerary;
  
      if (ciudad && ciudad !== 'All') {
        tempData = tempData.filter(item => item.ciudad.nombre === ciudad);
      }
  
      if (dia && dia !== 'All') {
        tempData = tempData.filter(item => item.dia === +dia); 
      }
  
      this.filteredData = tempData;

      
    });
  }
  
}
