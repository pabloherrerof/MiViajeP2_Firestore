import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { Observable } from 'rxjs';
import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {;

  dia!: string;
  registro$: Observable<Itinerario>;
  video! : Itinerario['video'];

  constructor(private route: ActivatedRoute,  private daysService: DaysFirestoreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dia = params['id'];
  
  
    });
    console.log(this.dia)
    this.registro$= this.daysService.get(this.dia)
}
}
