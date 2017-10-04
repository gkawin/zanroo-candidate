import React from 'react'
import PropTypes from 'prop-types'

import { Input, Button } from './uikits'

class AddForm extends React.PureComponent {
  static propTypes = {
    onCancelItem: PropTypes.func,
    onSave: PropTypes.func,
    shouldDisplay: PropTypes.bool
  }

  render () {
    if (!this.props.shouldDisplay) return null
    return (
      <div>
        <Input type='text' onChange={() => { }} />
        <select>
          <option>foo</option>
        </select>
        <Input type='text' onChange={() => { }} />
        <Button onClick={this.props.onSave}>Save</Button>
        <Button onClick={this.props.onCancelItem}>Cancel</Button>
      </div>
    )
  }
}

export default AddForm
