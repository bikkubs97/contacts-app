// actions/contactActions.ts
import { Contact } from "./reducer";
interface AddContactAction {
    type: 'ADD_CONTACT';
    payload: Contact;
  }
  
  interface DeleteContactAction {
    type: 'DELETE_CONTACT';
    payload: Contact; 
  }
  
  interface UpdateContactAction {
    type: 'UPDATE_CONTACT';
    payload: Contact;
  }
  
  export function addContact(contact: Contact): AddContactAction {
    return {
      type: 'ADD_CONTACT',
      payload: contact,
    };
  }
  
  export function deleteContact(contact:Contact): DeleteContactAction {
    return {
      type: 'DELETE_CONTACT',
      payload: contact,
    };
  }
  
  export function updateContact(contact: Contact): UpdateContactAction {
    return {
      type: 'UPDATE_CONTACT',
      payload: contact,
    };
  }
  



  