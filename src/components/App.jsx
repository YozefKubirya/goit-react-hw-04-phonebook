import React, { useState,useEffect,useRef } from "react";
import { Form } from "./Form/Form";
import { nanoid } from "nanoid";
import { Contacts } from "./ContactsList/ContactsList";
import { Filter } from "./Filter/Filter";
export const App =()=>  {

     const [contacts,setContact]=useState(
     () =>
      JSON.parse(localStorage.getItem('contactsData')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ])
   const [filter, setFilter] = useState('')
   const [firstRender] = useRef(true)

   useEffect(() => {
      if (firstRender.current) {
        firstRender.current=false
      }
       localStorage.setItem('contactsData', JSON.stringify(contacts));
   },[contacts,firstRender])
  const formHandler = (name,number) => {
    const contact = {
      name,
      number,
      id:nanoid()
    }
     setContact(contacts => {
      const includeName = contacts.find(user => user.name === contact.name)
      if (includeName) {
        alert(`${contact.name} is already in contacs`);
      } else {
        return {contacts: [contact, ...contacts],}
      }
    })
  }
const  handeleChangeFilter = (e) => {
    const { value } = e.target;
    setFilter(value)
  };

 const handleDeleteContact = id => {
    setContact(prevState => {
      const newContactList = prevState.contacts.filter(contact => contact.id !== id);
      console.log(newContactList)

      return [...newContactList];
    })
 }
   
  const filterContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={formHandler}></Form>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handeleChangeFilter }></Filter>
        <Contacts contacts={ filterContacts} onDelete={handleDeleteContact}></Contacts>
      </>)
  }
