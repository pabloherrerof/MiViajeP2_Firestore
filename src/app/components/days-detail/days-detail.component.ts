import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-days-detail',
  templateUrl: './days-detail.component.html',
  styleUrls: ['./days-detail.component.scss']
})
export class DaysDetailComponent implements OnInit {
  dia$: string;
  registro$: Observable<Itinerario>;
  registroActualizado: Itinerario; // Variable para almacenar el itinerario actual
  mostrarFormulario: boolean = false;

  constructor(private route: ActivatedRoute, private daysService: DaysFirestoreService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.dia$ = params['id'];
      this.registro$ = this.daysService.get(this.dia$);
      this.registro$.subscribe(itinerario => {
        this.registroActualizado = { ...itinerario }; // Hacemos una copia para no modificar directamente el observable
      });
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  guardar(): void {
    if (this.formularioEsValido()) {
      console.log(this.registroActualizado)
      console.log(this.dia$)
      this.daysService.update(this.dia$, this.registroActualizado)
        .then(() => {
          console.log('Registro actualizado con éxito');
          this.toggleFormulario();
          this.cdr.detectChanges();
        })
        .catch(error => {
          console.error('Error al actualizar el registro', error);
        });
    } else {
      console.error('El formulario no es válido');
    }
  }

  formularioEsValido(): boolean {
    return this.registroActualizado && Object.values(this.registroActualizado).every(value => value !== null && value !== '');
  }

  cancelar(): void {
    console.log('Cancelando...');
    this.registro$.subscribe(itinerario => {
      this.registroActualizado = { ...itinerario }; 
    });
    this.toggleFormulario();
  }
}
