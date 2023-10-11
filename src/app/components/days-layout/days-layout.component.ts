import { Component } from '@angular/core';

@Component({
  selector: 'app-days-layout',
  templateUrl: './days-layout.component.html',
  styleUrls: ['./days-layout.component.scss']
})
export class DaysLayoutComponent {
  itinerary = 
    [
      {
        "dia": "Day 1",
        "ciudad": {
          "nombre": "Tokyo",
          "imagen": "https://images.unsplash.com/photo-1533050487297-09b450131914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80"
        },
        "video": {
          "miniatura": "url_miniatura_videoTokyo.jpg",
          "link": "url_videoTokyo.mp4"
        },
        "actividades": ["Visit Tokyo Tower", "Explore Asakusa Temple", "Shopping in Shibuya", "Dine in Tsukiji Fish Market"],
        "hotel": {
          "foto": "url_foto_hotelTokyo.jpg",
          "nombre": "Tokyo Bay Hotel",
          "direccion": "1 Chome-8-2 Oshiage, Sumida City, Tokyo"
        }
      },
      {
        "dia": "Day 2",
        "ciudad": {
          "nombre": "Tokyo",
          "imagen": "url_imagen_tokyo.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoTokyo.jpg",
          "link": "url_videoTokyo.mp4"
        },
        "actividades": ["Visit Meiji Shrine", "Stroll in Ueno Park", "Experience Akihabara", "Night view from Tokyo Skytree"],
        "hotel": {
          "foto": "url_foto_hotelTokyo.jpg",
          "nombre": "Imperial Hotel Tokyo",
          "direccion": "1-1, Uchisaiwaicho 1-chome, Chiyoda-ku, Tokyo"
        }
      },
      {
        "dia": "Day 3",
        "ciudad": {
          "nombre": "Kyoto",
          "imagen": "url_imagen_kyoto.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoKyoto.jpg",
          "link": "url_videoKyoto.mp4"
        },
        "actividades": ["Visit Kiyomizu Temple", "Stroll in Gion District", "Explore Fushimi Inari Shrine", "Relax at Arashiyama Bamboo Grove"],
        "hotel": {
          "foto": "url_foto_hotelKyoto.jpg",
          "nombre": "Ritz-Carlton Kyoto",
          "direccion": "Kamogawa Nijo-Ohashi Hotori, Nakagyo Ward, Kyoto"
        }
      },
      {
        "dia": "Day 4",
        "ciudad": {
          "nombre": "Kyoto",
          "imagen": "url_imagen_kyoto.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoKyoto.jpg",
          "link": "url_videoKyoto.mp4"
        },
        "actividades": ["Visit Golden Pavilion", "Explore Nijo Castle", "Tea Ceremony Experience", "Dine in Pontocho Alley"],
        "hotel": {
          "foto": "url_foto_hotelKyoto.jpg",
          "nombre": "Kyoto Granbell Hotel",
          "direccion": "Gionmachi Minamigawa, Higashiyama Ward, Kyoto"
        }
      },
      {
        "dia": "Day 5",
        "ciudad": {
          "nombre": "Osaka",
          "imagen": "url_imagen_osaka.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoOsaka.jpg",
          "link": "url_videoOsaka.mp4"
        },
        "actividades": ["Visit Osaka Castle", "Shopping in Dotonbori", "Experience Universal Studios Japan", "Taste Takoyaki in Namba"],
        "hotel": {
          "foto": "url_foto_hotelOsaka.jpg",
          "nombre": "Osaka Marriott Miyako Hotel",
          "direccion": "1-1-43 Abenosuji, Abeno Ward, Osaka"
        }
      },
      {
        "dia": "Day 6",
        "ciudad": {
          "nombre": "Osaka",
          "imagen": "url_imagen_osaka.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoOsaka.jpg",
          "link": "url_videoOsaka.mp4"
        },
        "actividades": ["Explore Shinsaibashi", "Visit Tsutenkaku Tower", "Relax at Spa World", "Dine in Kuromon Ichiba Market"],
        "hotel": {
          "foto": "url_foto_hotelOsaka.jpg",
          "nombre": "InterContinental Osaka",
          "direccion": "3-60 Ofuka-cho, Kita-ku, Osaka"
        }
      },
      {
        "dia": "Day 7",
        "ciudad": {
          "nombre": "Sapporo",
          "imagen": "url_imagen_sapporo.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoSapporo.jpg",
          "link": "url_videoSapporo.mp4"
        },
        "actividades": ["Visit Odori Park", "Experience Sapporo Beer Museum", "Stroll in Susukino District", "Taste Ramen in Ramen Alley"],
        "hotel": {
          "foto": "url_foto_hotelSapporo.jpg",
          "nombre": "Sapporo Grand Hotel",
          "direccion": "4 Chome Kita 1 Jonishi, Chuo Ward, Sapporo"
        }
      },
      {
        "dia": "Day 8",
        "ciudad": {
          "nombre": "Kōbe",
          "imagen": "url_imagen_kobe.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoKobe.jpg",
          "link": "url_videoKobe.mp4"
        },
        "actividades": ["Visit Kobe Harborland", "Experience Kobe Ropeway", "Taste Kobe Beef", "Explore Nunobiki Herb Garden"],
        "hotel": {
          "foto": "url_foto_hotelKobe.jpg",
          "nombre": "Kobe Portopia Hotel",
          "direccion": "6-10-1 Minatojima Nakamachi, Chuo Ward, Kobe"
        }
      },
      {
        "dia": "Day 9",
        "ciudad": {
          "nombre": "Kōbe",
          "imagen": "url_imagen_kobe.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoKobe.jpg",
          "link": "url_videoKobe.mp4"
        },
        "actividades": ["Stroll in Ikuta Shrine", "Visit Kobe Animal Kingdom", "Shopping in Motomachi", "Relax at Arima Onsen"],
        "hotel": {
          "foto": "url_foto_hotelKobe.jpg",
          "nombre": "Hotel La Suite Kobe Harborland",
          "direccion": "7-2 Hatobacho, Chuo Ward, Kobe"
        }
      },
      {
        "dia": "Day 10",
        "ciudad": {
          "nombre": "Okinawa",
          "imagen": "url_imagen_okinawa.jpg"
        },
        "video": {
          "miniatura": "url_miniatura_videoOkinawa.jpg",
          "link": "url_videoOkinawa.mp4"
        },
        "actividades": ["Visit Shurijo Castle", "Relax at Naminoue Beach", "Explore Okinawa Churaumi Aquarium", "Dine in Kokusai Dori Street"],
        "hotel": {
          "foto": "url_foto_hotelOkinawa.jpg",
          "nombre": "Hilton Okinawa Chatan Resort",
          "direccion": "40-1 Mihama, Chatan, Nakagami District, Okinawa"
        }
      }
  ];
}
