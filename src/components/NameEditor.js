import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, InputField, AddButton } from './NameEditor.styled';

export default function NameEditor({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleForm = e => {
    const { name, value } = e.target;
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

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="">
          Name
          <InputField
            type="text"
            name="name"
            value={name}
            onChange={handleForm}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            placeholder="Name"
          />
        </Label>
        <Label htmlFor="">
          Number
          <InputField
            type="tel"
            name="number"
            value={number}
            onChange={handleForm}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="Phone number"
          />
        </Label>
        <AddButton type="submit">Add contact</AddButton>
      </Form>
    </>
  );
}

NameEditor.propTypes = {
  onSubmit: PropTypes.func,
};
