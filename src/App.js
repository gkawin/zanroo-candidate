import 'react-table/react-table.css'

import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import { render } from 'react-dom'
import Faker from 'faker'

class App extends React.Component {
  getName = () => Faker.name.findName()
  getAge = () => Faker.random.number()
  getNickname = () => Faker.name.lastName()

  getData = () => {
    return
  }

  renderEditable (cellInfo) {
    console.log(cellInfo)
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
        contentEditable
        suppressContentEditableWarning
        onBlur={() => {}}
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
        <ReactTable
          data={[
            {
              name: this.getName(),
              age: this.getAge(),
              nickname: this.getNickname()
            }
          ]}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
              Cell: this.renderEditable
            },
            {
              Header: 'Age',
              accessor: 'age',
              Cell: this.renderEditable
            },
            {
              Header: 'Nickname',
              accessor: 'nickname',
              Cell: this.renderEditable
            },
            {
              Header: 'Action'
            }
          ]}
        />
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
