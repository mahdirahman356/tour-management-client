import { Outlet } from 'react-router'
import './App.css'
import CommonLayout from './components/layout/CommonLayout'
import { adminSidebarItems } from './router/adminSidebarItems'
import { generateRoutes } from './utils/generateRoutes'
function App() {

  console.log(generateRoutes(adminSidebarItems))

  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  )
}

export default App
