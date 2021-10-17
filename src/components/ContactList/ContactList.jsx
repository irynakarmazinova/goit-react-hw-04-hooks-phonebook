import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.scss';

const ContactList = ({ onDeleteContact, visibleContacts }) => (
  <ul className={s.list}>
    {visibleContacts.map(({ id, name, number }) => (
      <li key={id} className={s.item}>
        <div className={s.box}>
          <p className={s.name}>{name}: </p>
          <p className={s.number}>{number}</p>
          <button className={s.btn} onClick={() => onDeleteContact(id)}>
            {/* <button className={s.btn} onClick={onDeleteContact} id={id}> */}
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);
export default ContactList;

ContactList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
  visibleContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
