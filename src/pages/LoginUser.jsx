import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'
import { useNavigate } from 'react-router-dom'

function UserDashboard() {
	const navigate = useNavigate()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	async function login(e) {
		e.preventDefault()
		const { email, pwd } = e.target.elements

		try {
			const usr = await signInWithEmailAndPassword(auth, email.value, pwd.value)
			navigate('/user')
		} catch (err) {
			console.log(err)
		}
	}

	onAuthStateChanged(auth, (usr) => {
		if (usr) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
		}
	})

	return (
		<>
			{!isLoggedIn && (
				<form onSubmit={login}>
					<input id='email' placeholder='email' required />
					<input id='pwd' placeholder='password' required />
					<button>Log/Sign in</button>
				</form>
			)}
			{isLoggedIn && (
				<button
					onClick={() => {
						signOut(auth)
					}}
				>
					Log out
				</button>
			)}
		</>
	)
}

export default UserDashboard
