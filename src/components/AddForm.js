import React from 'react'
import PropTypes from 'prop-types'

import { Input, Button, Select } from './uikits'

class AddForm extends React.PureComponent {
  static propTypes = {
    onCancelItem: PropTypes.func,
    onSaveItem: PropTypes.func,
    shouldDisplay: PropTypes.bool
  }

  render () {
    if (!this.props.shouldDisplay) return null
    return (
      <div>
        <Input type='text' innerRef={(comp) => { this.name = comp }} />
        <Select innerRef={(comp) => { this.age = comp }}>
          <option>foo</option>
        </Select>
        <Input type='text' innerRef={(comp) => { this.nickname = comp }} />
        <Button onClick={this.props.onSaveItem}>Save</Button>
        <Button onClick={this.props.onCancelItem}>Cancel</Button>
      </div>
    )
  }
}

export default AddForm
