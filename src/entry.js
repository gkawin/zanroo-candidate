import { injectGlobal } from 'styled-components'

import './App'
injectGlobal`
  body {
    font-family: 'Roboto', sans-serif;
  }
  .ReactTable .rt-tbody .rt-td {
    overflow: visible;
  }
`

