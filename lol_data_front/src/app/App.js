// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import AppFrame from '../layout/frame/AppFrame'
// import BasePage from './BasePage'
// import RouterWaiter from 'react-router-waiter'
import { useRoutes } from 'react-router-dom'

import routes from './routes'

function App() {
  const element = useRoutes(routes)
  return <>{element}</>
}

export default App
