import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  dia!: number;
  registro!: ItineraryItem;
  video! : ItineraryItem['video'];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dia = +params['dia']; // El '+' convierte la cadena en número

      // Cargar y buscar en el JSON
      this.loadData();
    });
  }

  loadData(): void {
    this.http.get<ItineraryItem[]>('assets/data.json').subscribe(data => {
      const foundItem = data.find(item => item.dia   === this.dia);
if (foundItem) {
  this.registro = foundItem;
  this.video = foundItem.video;
  console.log(this.video);
} else {
  // Manejar el caso en que no se encuentra el registro, por ejemplo:
  console.error('Registro no encontrado');
}
    });
  }
}
