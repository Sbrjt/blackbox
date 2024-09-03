import { Route, Routes } from 'react-router-dom'
import Login from './Hospital/Login'
import Register from './Hospital/Register'
import Prescription from './Hospital/Prescription'

function User() {
	return (
		<>
			<Routes>
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='prescription' element={<Prescription />} />
			</Routes>
		</>
	)
}

export default User
