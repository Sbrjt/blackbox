import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../fb'

function LoginHospital() {
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
            alert("Bad Credintioals")
        }
    }

    onAuthStateChanged(auth, (usr) => {
        if (usr) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
            // console.log("user logged out")
        }
    })

    return (
        <>
            {!isLoggedIn && (
                <><form onSubmit={login}>
                    <input id='email' placeholder='email' required />
                    <br></br>
                    <input id='pwd' placeholder='password' required />
                    <br></br>
                    <button>LoginHospital</button>
                </form><a href='/HospitalRegister'>New Here?... Register uour hospital</a></>
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

export default LoginHospital