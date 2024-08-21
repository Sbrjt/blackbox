import { useEffect, useState } from 'react'
import {
	auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	setDoc,
	doc,
	firestore,
	onAuthStateChanged,
	signOut,
	getDoc,
	storage,
	uploadBytes,
	ref,
	getDownloadURL
} from '../fb'

function User() {
	const [data, setData] = useState('')
	const [img, setImg] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				const docref = await getDoc(doc(firestore, 'users', usr.uid))
				setData(JSON.stringify(docref.data()))
			} else {
				window.location.href = '/userLogin'
			}
		})
	}, [])

	async function upload() {
		try {
			const imgref = ref(storage, img.name)
			await uploadBytes(imgref, img)
			console.log('uploaded: ', await getDownloadURL(imgref))
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			Dashboard
			<br />
			{data || 'loading...'}
			<div>
				<input
					className='form-control form-control-lg'
					id='formFileLg'
					type='file'
					onChange={(e) => {
						setImg(e.target.files[0])
					}}
				/>
				<button onClick={upload}>Upload report</button>
			</div>
		</>
	)
}

export default User
