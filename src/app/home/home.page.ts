import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../Interfaces/animal.interface';
import { Refresher } from 'ionic-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  animales:Animal[]=[];
  audio = new Audio();
  audioTiempo:any;

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproduciendo(animal:Animal){
    console.log(animal);
    this.pausarAudio(animal);
    if(animal.reproduciendo){
      animal.reproduciendo=false;
      return;
    }

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo=setTimeout(()=>animal.reproduciendo =false, animal.duracion *1000);

  }

  private pausarAudio(animalSel:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales){
      if(animal.nombre!=animalSel.nombre){
        animal.reproduciendo =false;
      }
    }
  }
 
  borrarAnimal(idx:number){
    this.animales.splice(idx,1);
  }

  recargar(refresh:any){
    console.log("Inicio refresh");
    setTimeout(()=>{
      console.log("Terminó");
      this.animales=ANIMALES.slice(0);
      refresh.target.complete();
    },1580);
  }

}
