import React, { useState } from "react";
import { nanoid } from "nanoid";
import PropTypes from 'prop-types'
export const Form = ({onSubmit}) =>{
   const [name, setName] = useState('')
   const[number,setNumber]=useState('')
   const  handleChange = event => {
      const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
   }
 const  handleSubmit = event => {
   event.preventDefault();
   onSubmit(name, number)
   reset();
   }
   const reset = () => {
      setName('');
      setNumber('')
   }
      const inputNameId = nanoid();
      const inputNumbId = nanoid();
      return (
         <>
            <form onSubmit={handleSubmit}>
               <label htmlFor={inputNameId}>Name
                  <input
                     id={inputNameId}
                     value={name}
                     onChange={handleChange}
                     type="text"
                     name="name"
                     pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                     required />
               </label>
               <label htmlFor={inputNumbId}>Number
                  <input
                     id={inputNumbId}
                     onChange={handleChange}
                     value={number}
                     type="tel"
                     name="number"
                     pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                     title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                     required
                  />
               </label>
               <button type="submit" >Add contact</button>
            </form>
         </>)
   
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}