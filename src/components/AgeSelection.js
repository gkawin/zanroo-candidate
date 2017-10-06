import 'react-select/dist/react-select.css'

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'react-select'

const AgeSelection = styled(class AgeSelection extends React.PureComponent {
  static propTypes = {
    onChangeAgeUpdate: PropTypes.func,
    cellInfo: PropTypes.shape({
      column: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    value: PropTypes.number,
    className: PropTypes.string,
    range: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    })
  }

  static get defaultProps () {
    return {
      range: { max: 100, min: 1 },
      cellInfo: { column: { id: 'age' } },
      start: 1
    }
  }

  getAgeOptions () {
    const { max, min } = this.props.range
    let options = []
    for (let i = min; i <= max; i++) {
      // HACK: inbound data has possible for two sources.
      // inject `target` into object for mocking that was came from input element.
      options.push({ value: i, label: i, target: { value: i } })
    }
    return options
  }

  render () {
    return (
      <Select
        className={this.props.className}
        name='age'
        value={this.props.value}
        options={this.getAgeOptions()}
        onChange={(e) => this.props.onChangeAgeUpdate(e, this.props.cellInfo)}
        menuContainerStyle={{ 'zIndex': 999 }}
      />
    )
  }
})`
  width: 100px;
`

export default AgeSelection
