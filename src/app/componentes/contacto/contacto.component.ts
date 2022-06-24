import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  form:FormGroup;
  nombre: FormControl= new FormControl("",[Validators.required]);
  email: FormControl= new FormControl("",[Validators.required,Validators.email]);
  telefono: FormControl= new FormControl("",[Validators.required]);
  mensaje:FormControl= new FormControl("",[Validators.required,Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage!: string; // the response message to show to the user
  responseMessage2!: string; // the response message to show to the user
  responseMessage3!: string; // the response message to show to the user
  responseMessage4!: string; // the response message to show to the user
 // the response message to show to the user
  siteKey: string;

  constructor(
    private formBuilder: FormBuilder, private http: HttpClient
  ) { 
    this.siteKey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
    this.form = this.formBuilder.group({
      nombre: this.nombre,
      email: this.email,
      mensaje: this.mensaje,
      telefono: this.telefono,
      honeypot: this.honeypot
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
    if(!this.nombre.value || !this.email.value || !this.telefono.value || !this.mensaje.value){
     Swal.fire({
       title: 'Error!',
       text: 'Faltan datos que rellenar',
       icon: 'error',
       confirmButtonText: 'Volver'
     })
    }
 
   if(this.nombre.value.length < 3){
     this.responseMessage = "Este campo debe de tener minimo 3 caracteres";
     setInterval(()=>{
       this.responseMessage = "";
     },4000);   
   }
   
    if(!this.email.valid){
     this.responseMessage2 = "Debe ingresar un email valido";
     setInterval(()=>{
       this.responseMessage2 = "";
     },4000);  
   }
   if(!this.telefono.value ){
     this.responseMessage3 = "Debe ingresar el teléfono.";
     setInterval(()=>{
       this.responseMessage3 = "";
     },4000);  
   }

   if(!this.mensaje.value ){
     this.responseMessage4 = "Debe ingresar el mensaje.";
     setInterval(()=>{
       this.responseMessage4 = "";
     },4000);  
   } 
    
   
   
     if (this.form.status == "VALID" && this.honeypot.value == "") {
      
       this.form.disable(); // disable the form if it's valid to disable multiple submissions
       var formData: any = new FormData();
       formData.append("name", this.nombre.value)
       formData.append("email", this.email.value);
       formData.append("mensaje", this.mensaje.value);
       formData.append("telefono", this.telefono.value);
       this.isLoading = true; // sending the post request async so it's in progress
       this.submitted = false; // hide the response message on multiple submits
       this.http.post("https://script.google.com/macros/s/AKfycbz6gAB1_8FQ2HPez7iuhajxL6tPc5jftSswL0JS7g/exec", formData).subscribe(
         (response:any) => {
           // choose the response message
           if (response["result"] == "success") {
           /*   this.responseMessage = "Gracias por escribir, pronto te contactare!"; */
             Swal.fire({
               title: 'Enviado!',
               text: 'Gracias por contactarme, pronto te contactara',
               icon: 'success',
               confirmButtonText: 'Cool'
             })
 
           } else {
             this.responseMessage = "Oops! Algo salio mal.";
           }
           this.form.enable(); // re enable the form after a success
           this.submitted = true; // show the response message
           this.isLoading = false; // re enable the submit button
           
         },
   
         (error) => {
         
         /*   this.responseMessage = "Oops! Algo salio mal."; */
           this.form.enable(); // re enable the form after a success
           this.submitted = true; // show the response message
           this.isLoading = false; // re enable the submit button
           console.log(error);
         }
        
       );
     }

   }

}
