 import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './Form/Form';
import { Contacts } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contactsData')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      console.log('Первый рендер');
      return;
    }
    localStorage.setItem('contactsData', JSON.stringify(contacts));
    console.log('Второй рендер ');
  }, [contacts]);

  const onSubmiHandler = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(contacts => {
      const includeName = contacts.find(user => user.name === contact.name);
      if (includeName) {
        alert(`${contact.name} is already in contacs`);
        return [...contacts];
      } else {
        return [contact, ...contacts];
      }
    });
  };

  const handelChange = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleDelete = id => {
    setContacts(prevState => {
      const newContactList = prevState.filter(contact => contact.id !== id);
      console.log(newContactList);

      return [...newContactList];
    });
  };

  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <>
      <h1>Phonebook</h1>
      <Form onSubmit={onSubmiHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handelChange} />
      <Contacts contacts={filterContacts} onDelete={handleDelete} />
    </>
  );
};