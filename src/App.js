import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import RegisterUser from './pages/RegisterUser'
import User from './pages/User'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/userLogin' element={<LoginUser />} />
				<Route path='/userRegister' element={<RegisterUser />} />
				<Route path='/user' element={<User />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
