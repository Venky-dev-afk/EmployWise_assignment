import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import UserList from './Pages/UserList'
import EditUser from './Pages/EditUser'
import PrivateRoute from './Components/PrivateRoute'

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={token ? <Navigate to="/users" /> : <Navigate to="/login"/>} />
          <Route path='/login' element={<Login />} />

          <Route element={<PrivateRoute/>}>
          <Route path='/users' element={<UserList/>} />
          <Route path='/edit/:id' element={<EditUser/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
