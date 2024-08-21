import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'

function UserDashboard() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	async function register(e) {
		e.preventDefault()
		const { name, email, password, gender, age } = e.target.elements

		let usr

		try {
			usr = await createUserWithEmailAndPassword(auth, email.value, password.value)
			console.log(usr.user)

			await setDoc(doc(firestore, 'users', usr.user.uid), {
				name: name.value,
				email: email.value,
				gender: gender.value,
				age: age.value
			})

			window.location.href = '/user'
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			{!isLoggedIn && (
				<form onSubmit={register}>
					<input id='name' placeholder='name' required />
					<input id='email' placeholder='email' required />
					<input id='password' placeholder='password' required />
					<input id='age' placeholder='age' required />
					<input id='gender' placeholder='gender' required />
					<br />
					<button>Register</button>
				</form>
			)}
		</>
	)
}

export default UserDashboard
