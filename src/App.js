import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';
import initialContacts from './contacts.json';
import NameEditor from './components/NameEditor';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { Container } from './App.styled';

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
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
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
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

  useEffect(() => {
    const data = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(data);
    if (parsedContacts) {
      setContacts(parsedContacts);
    } else {
      setContacts(initialContacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
