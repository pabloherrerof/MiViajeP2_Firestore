import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get<any[]>('assets/data.json').subscribe(data => {
      this.itinerary = data;
    });
  }
}
