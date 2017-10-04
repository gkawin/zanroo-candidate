import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import Faker from 'faker'
import styled from 'styled-components'

const Button = styled.button`
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

const Input = styled.input`
  font-size: 16px;
  padding: 5px;
`

const Table = styled.table`
  width: 100%;
`

class App extends React.Component {

  state = { shouldDisplayAddItem: false }

  getName = () => Faker.name.findName()
  getAge = () => Faker.random.number()
  getNickname = () => Faker.name.lastName()

  onAddItem = () => {
    this.setState({ shouldDisplayAddItem: !this.state.shouldDisplayAddItem })
  }

  renderEditable () {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
      >
        test
      </div>
    )
  }

  render () {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
      >
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>Nickname</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.renderEditable()}</td>
              <td>{this.renderEditable()}</td>
              <td>{this.renderEditable()}</td>
              <td>
                <Button small>Edit</Button>
                <Button small>Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <AddForm shouldDisplay={this.state.shouldDisplayAddItem} />
        <Button onClick={this.onAddItem}>{this.state.shouldDisplayAddItem ? 'Hide' : 'Add' }</Button>
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
