import PropTypes from 'prop-types';
import { FilterLabel, FilterInputField } from './Filter.styled';
const Filter = ({ value, onChange }) => (
  <FilterLabel htmlFor="">
    Find contacts by name
    <FilterInputField
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      required
      placeholder="Enter key word"
    />
  </FilterLabel>
);
Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
export default Filter;
