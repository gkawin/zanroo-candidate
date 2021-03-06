import 'react-table/react-table.css'

import React from 'react'
import { render } from 'react-dom'
import ReactTable from 'react-table'
import _ from 'lodash'
import u from 'updeep'

import Storage from './lib/Storage'
import { Button, Input } from './components/uikits'
import AddForm from './components/AddForm'
import AgeSelection from './components/AgeSelection'

class App extends React.PureComponent {
  state = {
    store: new Storage(),
    shouldDisplayAddItem: false,
    editItem: { editable: false, at: undefined, payload: { } }
  }

  componentWillMount () {
    this.state.store.initLocalStorage(10)
  }

  onEditRow = (rowInfo) => {
    this.setState({ editItem: { editable: true, at: rowInfo.index, payload: rowInfo.original } })
  }

  onUpdateRow = async (rowInfo) => {
    await this.setState({ editItem: u({ editable: false })(this.state.editItem) })
    const { at, payload } = this.state.editItem
    await this.state.store.updateAt(at, payload)
    this.forceUpdate()
  }

  onChangeInputUpdate = (e, cellInfo) => {
    const affectAtColumn = cellInfo.column.id
    this.setState({
      editItem: {
        ...this.state.editItem,
        payload: {
          ...this.state.editItem.payload,
          [affectAtColumn]: e.target.value
        } }
    })
  }

  onSaveItem = async (payload) => {
    await this.state.store.insert(payload)
    this.forceUpdate()
  }

  onDeleteRow = async (rowInfo) => {
    await this.setState({ editItem: u({ at: rowInfo.index })(this.state.editItem) })
    await this.state.store.deleteAt(this.state.editItem.at)
    this.forceUpdate()
  }

  renderEditableCell = (cellInfo) => {
    if (!this.state.editItem.editable) return (<div>{cellInfo.value}</div>)
    if (this.state.editItem.at === cellInfo.index) {
      const affectAtColumn = cellInfo.column.id
      const representValue = _.get(this.state.editItem.payload, affectAtColumn, '')
      const inputElement = cellInfo.column.id === 'age'
        ? (
          <AgeSelection
            onChangeAgeUpdate={(e, cellInfo) => this.onChangeInputUpdate(
              // HACK: for standard DOM element, should inject `name` into element properties.
              u({ target: { name: 'age' } })(e),
              cellInfo
            )}
            value={representValue}
            min={1}
            max={100}
          />
        )
        : (<Input onChange={(e) => this.onChangeInputUpdate(e, cellInfo)} value={representValue} />)
      return (
        <div
          onBlur={() => this.onUpdateRow(cellInfo)}
        >
          {inputElement}
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
          data={this.state.store.find()}
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
                    <Button style={{ marginRight: '10px' }} small onClick={() => this.onEditRow(row)}>Edit</Button>
                    <Button small onClick={() => this.onDeleteRow(row)}>Delete</Button>
                  </div>
                )
              }
            }
          ]}
        />
        <AddForm
          onSaveItem={this.onSaveItem}
          ageValue={1}
        />
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'))
