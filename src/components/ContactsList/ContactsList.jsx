import React from "react";
import PropTypes from 'prop-types'
export  const Contacts=({contacts,onDelete}) => {
   return <>
        <ul>
          {contacts.map(({ name, id, number,}) => {
              return <li key={id}>{name}: {number}
                <button key={id} type="button" onClick={()=>onDelete(id)}> delete</button>
                </li>
            })}
      </ul>
    </>
}
Contacts.propTypes = {
  onDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string
    })
  )
};