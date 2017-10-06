import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Input, Button } from './uikits'
import AgeSelection from './AgeSelection'

const AddFormSection = styled.div`
  width: 800px;
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: space-around;
`

class AddForm extends React.PureComponent {
  static propTypes = {
    onCancelItem: PropTypes.func,
    onSaveItem: PropTypes.func,
    shouldDisplay: PropTypes.bool,
    onChangeAgeUpdate: PropTypes.func,
    ageValue: PropTypes.number
  }

  state = { ageValue: '' }

  componentDidMount () {
    this.setState({ ageValue: this.props.ageValue })
  }

  onChangeAgeUpdate = async (e, cellInfo) => {
    await this.setState({ ageValue: e.target.value })
    console.log(cellInfo)
  }

  render () {
    if (!this.props.shouldDisplay) return null
    return (
      <AddFormSection>
        <Input type='text' innerRef={(comp) => { this.name = comp }} />
        <AgeSelection
          ref='ageSelection'
          onChangeAgeUpdate={this.onChangeAgeUpdate}
          value={this.state.ageValue}
          min={1}
          max={100}
        />
        <Input type='text' innerRef={(comp) => { this.nickname = comp }} />
        <Button onClick={this.props.onSaveItem}>Save</Button>
        <Button onClick={this.props.onCancelItem}>Cancel</Button>
      </AddFormSection>
    )
  }
}

export default AddForm
