import { Component, OnInit } from '@angular/core';

declare var navegacionResponsive:any;// par atilizar la funcion de js
declare var ocultar:any;// par atilizar la funcion de js

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  funcion1(){
    navegacionResponsive();
   
  }

  funcion2(){
    ocultar();
  }

  constructor() { }

  ngOnInit(): void {
  }

}