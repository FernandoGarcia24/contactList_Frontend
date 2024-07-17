import { Component, inject } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Contact } from '../model/contact.interface';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export default class ContactListComponent {

  private contactService = inject(ContactService);

  contacts: any[] = []

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.contactService.list()
      .subscribe((contacts: any) => {
        this.contacts = contacts
      })
  }

  deleteContact(contact: Contact) {
    this.contactService.delete(contact.id)
      .subscribe(() => {
        this.loadAll();
      })
  }
}
