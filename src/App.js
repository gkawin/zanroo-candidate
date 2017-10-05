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
    editing: { editable: false, at: undefined, value: null }
  }

  onAddItem = () => {
    this.setState({ shouldDisplayAddItem: true })
  }

  onCancelItem = () => {
    this.setState({ shouldDisplayAddItem: false })
  }

  onEditRow = (rowInfo) => {
    this.setState({ editing: { editable: true, at: rowInfo.index } })
  }

  onUpdateRow = async (rowInfo) => {
    await this.setState({ editing: { editable: false, at: rowInfo.index } })
    console.log(this.refs)
  }

  onChangeInputUpdate = ({ target }) => {
    this.setState({ editing: { ...this.state.editing, value: target.value } })
  }

  onSaveItem = () => {
    setData({
      name: this.refs.addForm.name.value,
      age: this.refs.addForm.age.value,
      nickname: this.refs.addForm.nickname.value
    })
    this.forceUpdate()
  }

  renderEditableCell = (cellInfo) => {
    if (!this.state.editing.editable) return (<div>{cellInfo.value}</div>)
    if (this.state.editing.at === cellInfo.index) {
      return (
        <div
          onBlur={() => this.onUpdateRow(cellInfo)}
        >
          <Input onChange={this.onChangeInputUpdate} value={cellInfo.value} />
        </div>
      )
    } else {
      return (<div>{cellInfo.value}</div>)
    }
  }

  render () {
    console.log(this.state.editing)
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
              Cell: this.renderEditableCell
            },
            {
              Header: 'Age',
              accessor: 'age',
              Cell: this.renderEditableCell
            },
            {
              Header: 'Nickname',
              accessor: 'nickname',
              Cell: this.renderEditableCell
            },
            { Header: 'Action',
              Cell: (row) => {
                return (
                  <div>
                    <Button small onClick={() => this.onEditRow(row)}>Edit</Button>
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
