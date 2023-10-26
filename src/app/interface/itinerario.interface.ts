interface Ciudad {
    nombre: string;
    imagen: string;
  }
  
  interface Video {
    miniatura: string;
    link: string;
  }
  
  interface Hotel {
    foto: string;
    nombre: string;
    direccion: string;
  }
  
  export interface Itinerario {
    id: string;
    dia: number;
    ciudad: Ciudad;
    video: Video;
    actividades: string[];
    hotel: Hotel;
  }
  
  type Item = Itinerario;