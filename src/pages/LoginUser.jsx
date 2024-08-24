import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'

function LoginUser() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	async function login(e) {
		e.preventDefault()
		const { email, pwd } = e.target.elements

		try {
			const usr = await signInWithEmailAndPassword(auth, email.value, pwd.value)
			window.location.href = '/user'
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
					<br></br>
					<input id='pwd' placeholder='password' required />
					<br></br>
					<button>LoginUser</button>
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

export default LoginUser
