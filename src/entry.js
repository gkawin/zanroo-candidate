import { injectGlobal } from 'styled-components'

import './App'
injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
  }
  // HACK: resolve for work together with react-select and react-table.
  .ReactTable .rt-tbody .rt-td {
    overflow: visible;
  }
`

