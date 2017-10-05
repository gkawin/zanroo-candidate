import 'react-table/react-table.css'

import React from 'react'
import PropTypes from 'prop-types'
import { render } from 'react-dom'
import { getData, initLocalStorage } from './mockData'
import ReactTable from 'react-table'

import { Button, Input } from './components/uikits'
import AddForm from './components/AddForm'

initLocalStorage()

class App extends React.PureComponent {

  state = {
    shouldDisplayAddItem: false,
    editing: false
  }

  onAddItem = () => {
    this.setState({ shouldDisplayAddItem: true })
  }

  onCancelItem = () => {
    this.setState({ shouldDisplayAddItem: false })
  }

  onEditRow = () => {
    this.setState({ editing: true })
  }

  onUpdateRow = () => {
    this.setState({ editing: false })
  }

  renderEditableRow = (cellInfo) => {
    return (
      <div
        onBlur={this.onUpdateRow}
      >
        <Input ref={cellInfo.column.id} defaultValue={cellInfo.value} />
      </div>
    )
  }

  render () {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
      >
        <ReactTable
          defaultPageSize={5}
          data={getData()}
          columns={[
            { Header: 'Name', accessor: 'name' },
            { Header: 'Age', accessor: 'age' },
            {
              Header: 'Nickname',
              accessor: 'nickname',
              Cell: row => !this.state.editing ? (
                <div>{row.value}</div>
              ) : this.renderEditableRow(row)
            },
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
