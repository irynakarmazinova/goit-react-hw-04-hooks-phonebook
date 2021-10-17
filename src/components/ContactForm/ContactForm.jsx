import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.scss';

export default function ContactForm({ onSubmit }) {
  // в форме стейт нужен только при сабмите, поэтому храним в компоненте формы, а при сабмите отдаем на верх
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // для всех инпутов ввод данных
  const handleInputChange = ({ currentTarget: { name, value } }) => {
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
  };

  const handleBtnSubmit = e => {
    e.preventDefault();

    onSubmit(name, number);

    reset();
    // e.target.reset(); //получить ссылку на форму и очистить методом от реакта
  };

  const reset = () => {
    setNumber('');
    setName('');
  };

  return (
    <form onSubmit={handleBtnSubmit} className={s.form} autoComplete="off">
      <label className={s.label}>
        Name
        <input
          autoFocus
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          className={s.input}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          className={s.number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
        />
      </label>

      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
