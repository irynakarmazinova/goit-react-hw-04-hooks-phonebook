import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Title from './components/Title/Title';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
// import filterContacts from './utils/filter-contact';
import ContactList from './components/ContactList/ContactList';

import './App.scss';

// import classNames from 'classnames';
// удобно для составления динамических классов в компоненте
// classNames(бaзовые классы -'a', 'b', {
// динамические добавить класс, те что зависят от уловия 'c': true / false})

export default function App() {
  const [contacts, setContacts] = useState(() =>
    // const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts') ?? []),
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // if (contacts === '') {
    //   // if (!contacts) {
    //   return;
    // }

    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(
      // contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number === number,
    )
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevState => [...prevState, contact]);
  };

  const handleDeleteContact = id => {
    // const handleDeleteContact = ({ target: { id } }) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    // setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const handleChangeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  // делает видимым тот контакт, который соответствует тексту поиска в инпуте
  const visibleContacts = () =>
    contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.trim().toLowerCase()) ||
        contact.number.includes(filter.trim()),
    );

  return (
    <div className="container">
      <h1 className="visually_hidden">Phonebook</h1>

      <Title title="Phonebook" />
      <ContactForm onSubmit={addContact} />

      <Title title="Contacts" />
      <Filter value={filter} onChange={handleChangeFilter} />
      <ContactList
        visibleContacts={visibleContacts()}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

// ---------------------------------------------------
// использовать именованные импорты и экспорты
// import {Button} export {Button}

// не нужно распылять пропсы

// ключи должны быть стабильными, те не изменяться между разными рендерами
// для ключей нельзя использовать uuid, потому что между разными рендерами key будет каждый раз новый. а для id объектов можно что бы оставить обеъкт один раз с этим айдишником

// если коллекция неизменна, то можно использрвать индекс для ключей(напр при переборе)

// библиотека для валидации форм react hook form
// хуки для асинхрон запросов react query
// кастомные хуки react-use

// коллбек - функция отложенного вызова, передать ссылку на функцию
// onClick(this.setState(index)) - при клике произойдет результат выполнения/вызова этой функции(undefined), но не вызовется сама функция! не коллбек.
// onClick(() => {return this.setState(index)}) - ссылка на функцию, не вызывается. вызовется только тогда, когда по кнопке кликнут! коллбек.

// -save сохраняет в dep
// ---------------------------------------------------
// поменяли this на замыкания
