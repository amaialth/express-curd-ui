import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './contact.service';
import { HttpClientModule } from '@angular/common/http';
import { Contact } from './contact.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
  ReactiveFormsModule],
  providers:[ContactService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'express-curd-ui';
  contactForm!: FormGroup;
  message =  "";
  contacts: Contact[]=[];
  isEditMode = false;
  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required, Validators.email]),
      phone: new FormControl("",[Validators.required, Validators.maxLength(10)])
    })
    this.contactService.contacts.subscribe(contacts=> this.contacts = contacts);

    this.contactService.fetchAllContacts();

  }

  onEdit(contact: any){
    this.message = "";
    this.isEditMode = true;
    this.contactForm.patchValue({...contact});
  }

  onSave(){
    if(this.isEditMode){
      this.contactService.updateContact(this.contactForm.value).subscribe(res=>{
        this.message = res.message;
        this.contactForm.reset();
        this.contactService.fetchAllContacts();
      })
    } else {
      this.contactService.saveContact(this.contactForm.value).subscribe(res=>{
        this.message = res.message;
        this.contactForm.reset();
        this.contactService.fetchAllContacts();
      })
    }
  }

  onDelete(user: any){
    this.message = "";
    this.contactService.deleteContact(user._id).subscribe(res=>{
      this.contactService.fetchAllContacts();
      this.message= res.message;
    })
  }
}
