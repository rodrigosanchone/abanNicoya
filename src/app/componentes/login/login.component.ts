import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {LoginServices} from '../../services/login.services'
//import {FlashMessagesService} from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   email:string;
   password:string;

  constructor(
    private router: Router,
    private loginService:LoginServices,
   // private flashMessages: FlashMessagesService,
  ) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.router.navigate(['/admin']);
        }
      }
    )
  }

    login(){
      this.loginService.login(this.email,this.password).then(
        res=>{
          this.router.navigate(['/admin']);
          alert('HOLA')
        }
      ).catch(
        error=>{
         alert('INFO INCORRECTA')
        }
      )
    }


}
