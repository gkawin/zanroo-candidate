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

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
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

        <AddForm />
        <Button onClick={() => {}}>Add</Button>
      </div>
    )
  }
}

class AddForm extends React.Component {
  static propTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    shouldDisplay: PropTypes.bool
  }

  render () {
    if (!this.props.shouldDisplay) return null
    return (
      <div>
        <Input type='text' onChange={() => {}} />
        <select>
          <option>foo</option>
        </select>
        <Input type='text' onChange={() => { }} />
        <Button onClick={this.props.onSave}>Save</Button>
        <Button onClick={this.props.onCancel}>Cancel</Button>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
