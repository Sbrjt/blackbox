import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginUser from './pages/LoginUser'
import RegisterUser from './pages/RegisterUser'
import LoginHospital from './pages/LoginHospital'
import RegisterHospital from './pages/RegisterHospital'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/userLogin' element={<LoginUser />} />
				<Route path='/userRegister' element={<RegisterUser />} />
				<Route path='/hospitalLogin' element={<LoginHospital />} />
				<Route path='/hospitalRegister' element={<RegisterHospital />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
