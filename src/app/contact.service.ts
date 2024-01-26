import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public contacts: Subject<Contact[]> = new Subject();

  constructor(private http: HttpClient) { }

  fetchAllContacts(){
    this.http.get<[contact: Contact]>("http://localhost:3030/contact").subscribe(res=>{
      this.contacts.next([...res])
    })
  }

  saveContact(contact: Contact){
    return this.http.post<{message:string}>("http://localhost:3030/contact", contact);
  }

  updateContact(contact: Contact){
    return this.http.put<{message:string}>("http://localhost:3030/contact", contact);
  }

  deleteContact(id: string){
    return this.http.delete<{message:string}>("http://localhost:3030/contact/"+id);
  }
}
