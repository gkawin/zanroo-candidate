import styled from 'styled-components'

export const Button = styled.button`
  width: ${props => props.small ? '50px' : '100px'};
  border: 1px solid gray;
  padding: ${props => props.small ? '5px' : '10px'};
  cursor: pointer;
  background-color: white;
  outline: none;
  line-height: 20px;
  transition: all 0.3s ease-in-out;
  border-radius: 3px;
  &:hover {
    background-color: gray;
  }
`

export const Input = styled.input`
  font-size: 16px;
  padding: 5px;
`

export const Select = styled.select`
  width: 100px;
`
