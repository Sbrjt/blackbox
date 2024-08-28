import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/home/Home'
import LoginUser from './components/user_login/LoginUser'
import RegisterUser from './components/user_register/RegisterUser'

import LoginHospital from './components/hospital_login/LoginHospital'
import RegisterHospital from './components/hospital_register/RegisterHospital'
import User from './components/user/User'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/userLogin' element={<LoginUser />} />
				<Route path='/userRegister' element={<RegisterUser />} />
				<Route path='/hospitalLogin' element={<LoginHospital />} />
				<Route path='/hospitalRegister' element={<RegisterHospital />} />
				<Route path='/user' element={<User />} />
				<Route path='*' element={<Home />} />
			</Routes>
		</Router>
	)
}

export default App
