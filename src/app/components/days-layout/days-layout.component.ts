import { FilterService } from 'src/app/services/cityFilter/city-filter.service';
import { DayFilterService } from 'src/app/services/dayFilter/day-filter.service';
import { Observable, combineLatest, forkJoin, zip } from 'rxjs';
import { getStorage, getStream, provideStorage } from '@angular/fire/storage';
import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';
import { map, switchMap } from 'rxjs/operators';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { ChangeDetectorRef } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { getBlob, getDownloadURL } from 'firebase/storage';
import { set } from 'firebase/database';
import { getFirebaseUrl } from 'src/lib/getFirebase';

@Component({
  selector: 'app-days-layout',
  templateUrl: './days-layout.component.html',
  styleUrls: ['./days-layout.component.scss'],
})
export class DaysLayoutComponent {
  days$: Observable<Itinerario[]>;
  nuevoDia: Itinerario = {
    dia: 0,
    ciudad: {
      nombre: '',
      imagen: '',
    },
    video: {
      miniatura: '',
      link: '',
    },
    hotel: {
      nombre: '',
      direccion: '',
      foto: '',
    },
    actividades: [],
  };

  mostrarFormulario: boolean = false;
  error: string = '';
  success: string = '';

  constructor(
    private daysService: DaysFirestoreService,
    private filterService: FilterService,
    private dayFilterService: DayFilterService,
    private cdr: ChangeDetectorRef
  ) {}

  private readonly storage: Storage = inject(Storage);

  ngOnInit(): void {
    const storage = getStorage();
    this.days$ = combineLatest([
      this.filterService.filter$,
      this.dayFilterService.filter$,
    ])
    .pipe(
      switchMap(([ciudad, dia]) => 
        this.daysService.getAll().pipe(
          map(days => {
            let tempData = days.sort((a, b) => a.dia - b.dia);
            if (ciudad && ciudad !== 'All') {
              tempData = tempData.filter(day => day.ciudad.nombre === ciudad);
            }
            if (dia && dia !== 'All') {
              tempData = tempData.filter(day => day.dia === +dia);
            }
            return tempData;
          }),
        )
      )
    );
    
  
  }

  onClickHandler(id: string | undefined) {
    this.daysService.delete(id as string);
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  uploadFile(input: HTMLInputElement, tipo?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!input.files || input.files.length === 0){
        console.log('No hay foto');
        this.error = 'No hay foto';
        reject('No hay foto');
      } else {
        const file = input.files[0]; // Asumimos que sólo se sube un archivo
        const storageRef = ref(this.storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on('state_changed', 
           (snapshot) => {
            // Manejo del progreso de la subida
          },
          (error) => {
            // Manejo de errores
            reject(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('Imagen subida con éxito', downloadURL);
              resolve(downloadURL); 
            });
          }
        );
      }
    });
  }
  async guardar(fotoHotel: HTMLInputElement, fotoMiniatura: HTMLInputElement, fotoCiudad: HTMLInputElement, video: HTMLInputElement): Promise<void> {
    try {
     
  
    if(fotoHotel.files && fotoMiniatura.files && fotoCiudad.files && video.files && fotoHotel.files.length > 0 && fotoMiniatura.files.length > 0 && fotoCiudad.files.length > 0 && video.files.length > 0){
      const hotelFotoURL = await this.uploadFile(fotoHotel, "hotel");
      const miniaturaURL = await this.uploadFile(fotoMiniatura, "miniatura");
      const ciudadImagenURL = await this.uploadFile(fotoCiudad, "ciudad");
      const videoURL = await this.uploadFile(video, "video");

      this.nuevoDia.hotel.foto = hotelFotoURL;
      this.nuevoDia.video.miniatura = miniaturaURL;
      this.nuevoDia.ciudad.imagen = ciudadImagenURL;
      this.nuevoDia.video.link = videoURL;
    } if (!this.nuevoDia || this.nuevoDia === null) {
      console.error('nuevoDia es null');
      return;
    } else if (this.formularioEsValido()) {
      if (this.verificarValores(this.nuevoDia)) {
        this.error = '';


        this.daysService
          .create(this.nuevoDia)
          .then(() => {
            console.log('Registro creado con éxito');
            this.toggleFormulario();
            this.cdr.detectChanges();
            this.success = 'Registro creado con éxito';
            setTimeout(() => {
              this.success = '';
            }, 4000);
          })
          .catch((error) => {
            console.error('Error al crear el registro', error);
            this.error = 'Error al crear el registro';
          });
      } else {
        console.error('Todos los campos tienen que rellenarse');
        this.error = 'Todos los campos tienen que rellenarse';
        return;
      }
    } else {
      console.log(this.nuevoDia);
      console.error('El formulario no es válido');
      this.error = 'El formulario no es válido';
      return;
    }
  } catch (error) {
    console.log(error);
    this.error = error as string;
  }
}
  formularioEsValido(): boolean {
    return this.nuevoDia && this.verificarValores(this.nuevoDia);
  }

  verificarValores(objeto: any): boolean {
    return Object.values(objeto).every((valor) => {
      if (valor === null || valor === '') {
        return false;
      }
      if (typeof valor === 'object') {
        return this.verificarValores(valor);
      }
      if (Array.isArray(valor)) {
        return (
          valor.length > 0 &&
          valor.every((elemento) => this.verificarValores(elemento))
        );
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
        imagen: '',
      },
      video: {
        miniatura: '',
        link: '',
      },
      hotel: {
        nombre: '',
        direccion: '',
        foto: '',
      },
      actividades: [],
    };
  }
}
