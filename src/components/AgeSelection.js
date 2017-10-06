import 'react-select/dist/react-select.css'

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'react-select'

const options = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' }
]

const AgeSelection = styled(class AgeSelection extends React.PureComponent {
  static propTypes = {
    onChangeInputUpdate: PropTypes.func,
    cellInfo: PropTypes.object,
    value: PropTypes.string,
    className: PropTypes.string
  }
  render () {
    return (
      <Select
        className={this.props.className}
        name='form-field-name'
        value={this.props.value}
        options={options}
        onChange={(e) => this.props.onChangeInputUpdate(e, this.props.cellInfo)}
      />
    )
  }
})`
  width: 100px;
`

export default AgeSelection
