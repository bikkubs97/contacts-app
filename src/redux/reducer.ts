interface Contact {
  firstName: string;
  lastName: string;
  status: boolean;
  id: number;
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

function contactsReducer(
  state: ContactsState = initialState,
  action: any 
): ContactsState {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
  
    case 'UPDATE_CONTACT': 
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
      case 'DELETE_CONTACT':
        return {
          ...state,
          contacts: state.contacts.filter(contact => contact.id !== action.payload.id)
        };
    default:
      return state;
  }
}

export default contactsReducer;
