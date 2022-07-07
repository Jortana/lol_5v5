// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import AppFrame from '../layout/frame/AppFrame'
// import BasePage from './BasePage'
import RouterWaiter from 'react-router-waiter'

import routes from './routes'
import onRouteBefore from './routes/onRouteBefore'

function App() {
  // return <BasePage />
  return <RouterWaiter routes={routes} onRouteBefore={onRouteBefore} />
}

export default App
