import PropTypes from 'prop-types';
import {
  ListWrapper,
  ContactItem,
  List,
  ContactData,
  DeleteButton,
} from './ContactList.styled';
const ContactList = ({ contacts, onDeleteContact }) => (
  <ListWrapper>
    <List>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id}>
          <ContactData>
            {name}: {number}
          </ContactData>
          <DeleteButton onClick={() => onDeleteContact(id)}>
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </List>
  </ListWrapper>
);
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onDeleteContact: PropTypes.func,
};
export default ContactList;
