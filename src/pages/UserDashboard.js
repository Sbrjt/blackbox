import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'

function UserDashboard() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	async function login(e) {
		e.preventDefault()
		const { email, pwd } = e.target.elements

		let usr

		try {
			// Sign in user
			usr = await signInWithEmailAndPassword(auth, email.value, pwd.value)
			console.log('sign in: ', usr.user.email)
		} catch (err) {
			// If new user, sign up and create new record in firestore
			usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)
			console.log(usr.user)

			await setDoc(doc(firestore, 'users', usr.user.uid), {
				name: usr.user.email,
				email: usr.user.email,
				role: 'user'
			})

			console.log('create user: ', usr.user.email)
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
