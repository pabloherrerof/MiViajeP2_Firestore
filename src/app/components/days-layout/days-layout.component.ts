import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/cityFilter/city-filter.service';
import { DayFilterService } from 'src/app/services/dayFilter/day-filter.service';
import { Observable, combineLatest } from 'rxjs';

import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-days-layout',
  templateUrl: './days-layout.component.html',
  styleUrls: ['./days-layout.component.scss']
})
export class DaysLayoutComponent {
  days$: Observable<Itinerario[]>;
  nuevoDia: Itinerario = {
    dia: 0,
    ciudad: {
      nombre: '',
      imagen: ''
    },
    video: {
      miniatura: '',
      link: ''
    },
    hotel: {
      nombre: '',
      direccion: '',
      foto: ''
    },
    actividades: []
  };

  mostrarFormulario: boolean = false;
  error: string = '';


  constructor(private daysService: DaysFirestoreService, private filterService: FilterService, private dayFilterService: DayFilterService, private cdr: ChangeDetectorRef) { }



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
   

    this.days$.subscribe(days => {    });
  }

  onClickHandler(id: string | undefined){
    this.daysService.delete(id as string);
  }


  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  guardar(): void {
    if (!this.nuevoDia || this.nuevoDia === null) {
      console.error('nuevoDia es null');
      return;
    } else if (this.formularioEsValido()) {
        if(this.verificarValores(this.nuevoDia)){
        this.error = '';
      this.daysService.create(this.nuevoDia)
        .then(() => {
          console.log('Registro creado con éxito');
          this.toggleFormulario();
          this.cdr.detectChanges();
        })
        .catch(error => {
          console.error('Error al crear el registro', error);
          this.error = 'Error al crear el registro';
        });}
        else{
          console.error('Todos los campos tienen que rellenarse');
       this.error = 'Todos los campos tienen que rellenarse';
       return;
        }

    } else {
      console.error('El formulario no es válido');
      this.error = 'El formulario no es válido';
      return;
    }
  
  
  }
  formularioEsValido(): boolean {
    return this.nuevoDia && this.verificarValores(this.nuevoDia);
  }
  
  verificarValores(objeto: any): boolean {
    return Object.values(objeto).every(valor => {
      if (valor === null || valor === '') {
        return false;
      }
      if (typeof valor === 'object') {
        return this.verificarValores(valor);
      }
      if (Array.isArray(valor)) {
        return valor.length > 0 && valor.every(elemento => this.verificarValores(elemento));
      }
      return true;
    });
  }
  

  cancelar(): void {
    this.toggleFormulario();
    this.nuevoDia = {
      dia: 0,
      ciudad: {
        nombre: '',
        imagen: ''
      },
      video: {
        miniatura: '',
        link: ''
      },
      hotel: {
        nombre: '',
        direccion: '',
        foto: ''
      },
      actividades: []
    };
  }
}
