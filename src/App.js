import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import Faker from 'faker'
import styled from 'styled-components'

const Button = styled.button`
  width: 100px;
  border: 1px solid gray;
  padding: 10px;
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

class App extends React.Component {
  getName = () => Faker.name.findName()
  getAge = () => Faker.random.number()
  getNickname = () => Faker.name.lastName()

  onBlur = (e) => {
    console.log(e)
  }

  renderEditable (cellInfo) {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
      >
        {cellInfo.value}
      </div>
    )
  }

  render () {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
      >

        <Button>Add</Button>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
