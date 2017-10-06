import { injectGlobal } from 'styled-components'

import './App'
// HACK: resolve for work together with react-select and react-table.
injectGlobal`
  body { font-family: 'Roboto', sans-serif; }
  .ReactTable .rt-tbody .rt-td { overflow: visible; }
`

