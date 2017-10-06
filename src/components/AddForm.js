import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import u from 'updeep'

import { Input, Button } from './uikits'
import AgeSelection from './AgeSelection'

const AddFormSection = styled.div`
  width: 800px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-around;
`

const AddFormOuter = styled.div`
  margin-top: 10px;
`

class AddForm extends React.PureComponent {
  static propTypes = {
    onSaveItem: PropTypes.func,
    ageValue: PropTypes.number
  }

  state = {
    age: undefined,
    nickname: null,
    name: null,
    shouldDisplay: false
  }

  componentDidMount () {
    this.setState({ age: this.props.ageValue })
  }

  onShowFormAddItem = () => {
    this.setState({ shouldDisplay: true })
  }

  onHideFormAddItem = () => {
    this.setState({ shouldDisplay: false })
  }

  onChangeAgeUpdate = (e, cellInfo) => {
    this.setState({ age: e.target.value })
  }

  onSaveItem = (e) => {
    e.preventDefault()
    this.props.onSaveItem({
      name: this.state.name,
      age: this.state.age,
      nickname: this.state.nickname
    })
  }

  onChangeInput = (e, cellInfo) => {
    const id = e.target.name
    this.setState({ [id]: e.target.value })
  }

  renderForm = () => {
    if (!this.state.shouldDisplay) return null
    return (
      <AddFormSection>
        <Input type='text' name='name' onChange={this.onChangeInput} />
        <AgeSelection
          onChangeAgeUpdate={(e, cellInfo) => this.onChangeInput(
              // HACK: for standard DOM element, should inject `name` into element properties.
              u({ target: { name: 'age' } })(e),
              cellInfo
            )}
          value={this.state.age}
          min={1}
          max={100}
          />
        <Input type='text' name='nickname' onChange={this.onChangeInput} />
        <Button onClick={this.onSaveItem}>Save</Button>
        <Button onClick={this.onHideFormAddItem}>Cancel</Button>
      </AddFormSection>
    )
  }

  render () {
    return (
      <AddFormOuter>
        {this.renderForm()}
        <Button onClick={this.onShowFormAddItem}>Add</Button>
      </AddFormOuter >
    )
  }
}

export default AddForm
