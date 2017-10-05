import 'react-table/react-table.css'

import React from 'react'
import { render } from 'react-dom'
import { getData, initLocalStorage, setData } from './mockData'
import ReactTable from 'react-table'

import { Button, Input } from './components/uikits'
import AddForm from './components/AddForm'

initLocalStorage()

class App extends React.PureComponent {

  state = {
    shouldDisplayAddItem: false,
    editing: false
  }

  onAddItem = async () => {
    await this.setState({ shouldDisplayAddItem: true })
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

  onSaveItem = () => {
    setData({
      name: this.refs.addForm.name.value,
      age: this.refs.addForm.age.value,
      nickname: this.refs.addForm.nickname.value
    })
    this.forceUpdate()
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
          defaultPageSize={10}
          data={getData()}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
              Cell: row => !this.state.editing ? (<div>{row.value}</div>) : this.renderEditableRow(row)
            },
            {
              Header: 'Age',
              accessor: 'age',
              Cell: row => !this.state.editing ? (<div>{row.value}</div>) : this.renderEditableRow(row)
            },
            {
              Header: 'Nickname',
              accessor: 'nickname',
              Cell: row => !this.state.editing ? (<div>{row.value}</div>) : this.renderEditableRow(row)
            },
            { Header: 'Action',
              Cell: () => {
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
          ref='addForm'
          shouldDisplay={this.state.shouldDisplayAddItem}
          onSaveItem={this.onSaveItem}
          onCancelItem={this.onCancelItem}
        />
        <Button onClick={this.onAddItem}>Add</Button>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
