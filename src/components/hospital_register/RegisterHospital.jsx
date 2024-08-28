import { useState } from 'react'
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, setDoc, doc, firestore, onAuthStateChanged, signOut } from '../../fb'

function RegisterHospital() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    async function register(e) {
        e.preventDefault()
        const { id, name, email, pwd } = e.target.elements

        let usr

        // try {
        //     // Sign in user
        //     usr = await signInWithEmailAndPassword(auth, email.value, pwd.value)
        //     console.log('sign in: ', usr.user.email)
        // } catch (err) {
        //     // If new user, sign up and create new record in firestore
        //     usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)
        //     console.log(usr.user)

        //     await setDoc(doc(firestore, 'users', usr.user.uid), {
        //         name: usr.user.email,
        //         email: usr.user.email,
        //         role: 'user'
        //     })

        //     console.log('create user: ', usr.user.email)
        // }

        try {
            // Register in user
            usr = await createUserWithEmailAndPassword(auth, email.value, pwd.value)
            console.log(usr.user)

            await setDoc(doc(firestore, 'hospitals', usr.user.uid), {
                id: id.value,
                name: name.value,
                email: usr.user.email,
                role: 'hospital',
                dob: "",
                bloodGroup: "",
            })

            console.log('created user: ', usr.user.email)
        } catch (err) {
            alert("Error")
            console.log(err)
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
                <><form onSubmit={register}>
                    <input id='id' placeholder='Hospital ID' required />
                    <br></br>
                    <input id='name' placeholder='Hospital Name' required />
                    <br></br>
                    <input id='email' placeholder='email' required />
                    <br></br>
                    <input id='pwd' placeholder='password' required />
                    <br></br>
                    <button>Register Hospital</button>
                </form><a href='/UserLogin' >Already Have an account? </a></>
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

export default RegisterHospital