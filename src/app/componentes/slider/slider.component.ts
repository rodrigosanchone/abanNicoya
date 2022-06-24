import { Component, OnInit } from '@angular/core';
declare var navegacionResponsive:any;// par atilizar la funcion de js
var myCarousel:any = document.querySelector('#myCarousel')
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
