import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html'
  })
  export class HomeComponent implements OnInit {

    public titulo: string;

    constructor(){
        this.titulo='Home';
      }

    ngOnInit(){
        console.log('home cargado');
      }

  }