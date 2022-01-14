// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import initialContacts from './contacts.json';
import NameEditor from './components/NameEditor';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { Container } from './App.styled';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    //  const contacts = window.localStorage.getItem(key);
    //     const parsedContacts = JSON.parse(contacts);
    //     if (parsedContacts) {
    //       setState({ state: parsedContacts });
    //     } else {
    //       setState({ state: initialContacts });
    //     }

    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });
  useEffect(
    prevState => {
      if (state !== prevState) {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    },
    [key, state],
  );
  return [state, setState];
};

export default function App({ contactId }) {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (contacts.find(contact => contact.name === name)) {
      const notify = `${name} is already on list`;
      toast.error(notify);
      return;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
    toast.success('Contact added!');
    return;
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => ({
      contacts: prevContacts.filter(contact => contact.id !== contactId),
    }));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFoundedContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  // useEffect(() => {
  //   console.log('App componentDidMount');
  //   const contacts = window.localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //   } else {
  //     setContacts(initialContacts);
  //   }
  // }, []);
  // useEffect((prevContacts) => {
  //     console.log('App componentDidUpdate');
  //     console.log(contacts);
  //     if (contacts !== prevContacts) {
  //       window.localStorage.setItem('contacts', JSON.stringify(contacts));
  //     }
  //   },
  //   [contacts],
  // );

  const foundedContacts = getFoundedContacts();
  return (
    <Container>
      <Toaster />
      <h1>Phonebook</h1>
      <NameEditor onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={foundedContacts} onDeleteContact={deleteContact} />
    </Container>
  );
}

// Option on class

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   addContact = (name, number) => {
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     if (this.state.contacts.find(contact => contact.name === name)) {
//       const notify = `${name} is already on list`;
//       toast.error(notify);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//     toast.success('Contact added!');
//     return;
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };
//   getFoundedContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter),
//     );
//   };

//   componentDidMount() {
//     console.log('App componentDidMount');
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     } else {
//       this.setState({ contacts: initialContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     console.log('App componentDidUpdate');
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   render() {
//     const foundedContacts = this.getFoundedContacts();
//     return (
//       <Container>
//         <Toaster />
//         <h1>Phonebook</h1>
//         <NameEditor onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.changeFilter} />
//         <ContactList
//           contacts={foundedContacts}
//           onDeleteContact={this.deleteContact}
//         />
//       </Container>
//     );
//   }
// }
// export default App;
