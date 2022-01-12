import styled from 'styled-components';
// import theme from '../constants/theme'
export const Form = styled.form`
  padding: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  outline: 1px solid black;
  width: 400px;
`;
export const Label = styled.label`
  color: #212121;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;
export const InputField = styled.input`
  margin-top: 10px;
  padding: 4px;
  width: 150px;
`;
export const AddButton = styled.button`
  width: 100px;
  border-radius: 4px;
  padding: 4px;
`;
