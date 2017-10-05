import 'react-table/react-table.css'

import React from 'react'
import { render } from 'react-dom'
// import { getData, initLocalStorage, setData, setAllData } from './mockData'
import ReactTable from 'react-table'
import _ from 'lodash'
import u from 'updeep'

import Storage from './lib/Storage'
import { Button, Input } from './components/uikits'
import AddForm from './components/AddForm'

const store = new Storage()

class App extends React.PureComponent {

  state = {
    shouldDisplayAddItem: false,
    editItem: { editable: false, at: undefined, payload: { } }
  }

  onAddItem = () => {
    this.setState({ shouldDisplayAddItem: true })
  }

  onCancelItem = () => {
    this.setState({ shouldDisplayAddItem: false })
  }

  onEditRow = (rowInfo) => {
    this.setState({ editItem: { editable: true, at: rowInfo.index, payload: rowInfo.original } })
  }

  onUpdateRow = async (rowInfo) => {
    await this.setState({ editItem: u({ editable: false })(this.state.editItem) })
    const { at, payload } = this.state.editItem
    await store.updateAt(at, payload)
    this.forceUpdate()
  }

  onChangeInputUpdate = ({ target }, cellInfo) => {
    const affectAtColumn = cellInfo.column.id
    this.setState({
      editItem: {
        ...this.state.editItem,
        payload: {
          ...this.state.editItem.payload,
          [affectAtColumn]: target.value
        } }
    })
  }

  onSaveItem = () => {
    // setData({
    //   name: this.refs.addForm.name.value,
    //   age: this.refs.addForm.age.value,
    //   nickname: this.refs.addForm.nickname.value
    // })
    // this.forceUpdate()
  }

  onDeleteRow = async (rowInfo) => {
    await this.setState({ editItem: { at: rowInfo.index, payload: rowInfo.original } })
    // const items = _.reject(getData(), (val, key) => (key === this.state.editItem.at))
    // await setAllData(items)
    // this.forceUpdate()
  }

  renderEditableCell = (cellInfo) => {
    if (!this.state.editItem.editable) return (<div>{cellInfo.value}</div>)
    if (this.state.editItem.at === cellInfo.index) {
      const affectAtColumn = cellInfo.column.id
      const representValue = _.get(this.state.editItem.payload, affectAtColumn, '')
      return (
        <div
          onBlur={() => this.onUpdateRow(cellInfo)}
        >
          <Input onChange={(e) => this.onChangeInputUpdate(e, cellInfo)} value={representValue} />
        </div>
      )
    } else {
      return (<div>{cellInfo.value}</div>)
    }
  }

  render () {
    return (
      <div
        style={{ backgroundColor: '#fafafa' }}
      >
        <ReactTable
          defaultPageSize={10}
          data={store.find()}
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
                    <Button small onClick={() => this.onDeleteRow(row)}>Delete</Button>
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
