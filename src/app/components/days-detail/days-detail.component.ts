import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DaysFirestoreService } from 'src/app/services/firestore/days-firestore.service';
import { Itinerario } from 'src/app/interface/itinerario.interface';
import { Observable, catchError, forkJoin, from, map, of, switchMap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { Storage, getDownloadURL, getStorage, uploadBytesResumable } from '@angular/fire/storage';
import { ref } from 'firebase/storage';
import { getFirebaseUrl } from 'src/lib/getFirebase';

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
  error: string = '';
  success: string = '';
  actividades: string = "";

  constructor(private route: ActivatedRoute, private daysService: DaysFirestoreService, private cdr: ChangeDetectorRef) { }
  private readonly storage: Storage = inject(Storage);
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.dia$ = params['id'];
      this.registro$ = this.daysService.get(this.dia$);
      this.registro$.subscribe(itinerario => {
          this.registroActualizado = { ...itinerario }
          this.actividades = this.registroActualizado.actividades.join('\n');
      });
    });
  }

  toggleFormulario(): void {
    this.mostrarFormulario = !this.mostrarFormulario;
console.log(this.registroActualizado)
  }
  uploadFile(input: HTMLInputElement, tipo?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!input.files || input.files.length === 0){
        return
      } else {
        const file = input.files[0];
        const storageRef = ref(this.storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log(uploadTask)
        uploadTask.on('state_changed', 
           (snapshot) => {
          },
          (error) => {
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
      if (fotoHotel.files && fotoHotel.files.length > 0) {
        const hotelFotoURL = await this.uploadFile(fotoHotel, "hotel");
        this.registroActualizado.hotel.foto = hotelFotoURL;
      }
      if (fotoMiniatura.files && fotoMiniatura.files.length > 0) {
        const miniaturaURL = await this.uploadFile(fotoMiniatura, "miniatura");
        this.registroActualizado.video.miniatura = miniaturaURL;
      }
      if (fotoCiudad.files && fotoCiudad.files.length > 0) {
        const ciudadImagenURL = await this.uploadFile(fotoCiudad, "ciudad");
        this.registroActualizado.ciudad.imagen = ciudadImagenURL;
      }
      if (video.files && video.files.length > 0) {
        const videoURL = await this.uploadFile(video, "video");
        this.registroActualizado.video.link = videoURL;
      }
     
if (!this.registroActualizado || this.registroActualizado === null) {
      console.error('nuevoDia es null');
      return;
    } else if (this.formularioEsValido()) {
      if (this.verificarValores(this.registroActualizado)) {
        this.registroActualizado.actividades = this.actividades.split('\n').filter(linea => linea.trim() !== '');
        this.error = '';
        this.daysService
          .update(this.registroActualizado.id as string, this.registroActualizado)
          .then(() => {
            console.log('Registro actualizado con éxito');
            this.toggleFormulario();
            this.cdr.detectChanges();
            this.success = 'Registro actualizado con éxito';
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
      console.log(this.registroActualizado);
      console.error('El formulario no es válido');
      this.error = 'El formulario no es válido';
      return;
    }
  } catch (error) {
    console.log(error);
    this.error = error as string;
  }
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
