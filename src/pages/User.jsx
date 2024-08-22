import { useEffect, useState } from 'react'
import { auth, doc, firestore, onAuthStateChanged, getDoc, storage, uploadBytes, ref, getDownloadURL, arrayUnion, updateDoc } from '../fb'

function User() {
	const [id, setId] = useState()
	const [data, setData] = useState('')
	const [img, setImg] = useState()

	let docRef

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)
				const snap = await getDoc(doc(firestore, 'users', usr.uid))
				setData(JSON.stringify(snap.data()))
			} else {
				window.location.href = '/userLogin'
			}
		})
	}, [])

	async function upload() {
		try {
			const imgref = ref(storage, img.name)
			await uploadBytes(imgref, img)
			const url = await getDownloadURL(imgref)
			await updateDoc(doc(firestore, 'users', id), {
				files: arrayUnion(url)
			})
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
