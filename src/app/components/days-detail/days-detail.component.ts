
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-days-detail',
  templateUrl: './days-detail.component.html',
  styleUrls: ['./days-detail.component.scss']
})
export class DaysDetailComponent {
  dia$: string;
  registro$: Observable<Itinerario>;

  constructor(private route: ActivatedRoute,  private daysService: DaysFirestoreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dia$ = params['id'];
  
    });
    console.log(this.dia$)
    this.registro$= this.daysService.get(this.dia$)
}
}