import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'
import '../css/LoginUser.css'

function LoginUser() {
	const [reg, setReg] = useState(false)

	async function login(e) {
		e.preventDefault()
		const { email, pwd } = e.target.elements
		const usr = await signInWithEmailAndPassword(auth, email.value, pwd.value)
	}

	async function register(e) {
		e.preventDefault()
		const { name, email, pwd } = e.target.elements
		const usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)

		await setDoc(doc(firestore, 'users', usr.user.uid), {
			name: name.value,
			email: usr.user.email
		})
	}

	// if user is logged in redirect to dashboard
	onAuthStateChanged(auth, (usr) => {
		if (usr) {
			window.location.href = '/user'
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
