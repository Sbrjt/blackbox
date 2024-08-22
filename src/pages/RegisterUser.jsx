import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'

function RegisterUser() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	async function register(e) {
		e.preventDefault()
		const { name, email, pwd } = e.target.elements

		try {
			const usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)

			await setDoc(doc(firestore, 'users', usr.user.uid), {
				name: name.value,
				email: usr.user.email,
				dob: '',
				bloodGroup: '',
				gender: ''
			})
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
				<>
					<form onSubmit={register}>
						<input id='name' placeholder='name' required />
						<br></br>
						<input id='email' placeholder='email' required />
						<br></br>
						<input id='pwd' placeholder='password' required />
						<br></br>
						<button>Register User</button>
					</form>
					<a href='/UserLogin'>Already Have an account? </a>
				</>
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

export default RegisterUser
