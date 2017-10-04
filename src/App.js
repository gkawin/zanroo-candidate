import 'react-table/react-table.css'

import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import Faker from 'faker'
import ReactTable from 'react-table'

import { Button } from './components/uikits'
import AddForm from './components/AddForm'

class App extends React.PureComponent {

  state = { shouldDisplayAddItem: false }

  getName = () => Faker.name.findName()
  getAge = () => Faker.random.number()
  getNickname = () => Faker.name.lastName()

  onAddItem = () => {
    this.setState({ shouldDisplayAddItem: true })
  }

  onCancelItem = () => {
    this.setState({ shouldDisplayAddItem: false })
  }

  onEditRow = () => {

  }

  render () {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
      >
        <ReactTable
          defaultPageSize={5}
          data={[
            {
              name: this.getName(),
              age: this.getAge(),
              nickname: this.getNickname()
            }
          ]}
          columns={[
            { Header: 'Name', accessor: 'name' },
            { Header: 'Age', accessor: 'age' },
            { Header: 'Nickname', accessor: 'nickname' },
            { Header: 'Action',
              Cell: row => {
                return (
                  <div>
                    <Button small onClick={this.onEditRow}>Edit</Button>
                    <Button small>Delete</Button>
                  </div>
                )
              }
            }
          ]}
        />
        <AddForm
          shouldDisplay={this.state.shouldDisplayAddItem}
          onCancelItem={this.onCancelItem}
        />
        <Button onClick={this.onAddItem}>Add</Button>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
