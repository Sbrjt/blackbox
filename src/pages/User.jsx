import { useEffect, useState } from 'react'
import {
	auth,
	doc,
	firestore,
	onAuthStateChanged,
	getDoc,
	storage,
	uploadBytes,
	ref,
	getDownloadURL,
	arrayUnion,
	updateDoc,
	setDoc,
	serverTimestamp,
	addDoc,
	collection,
	getDocs
} from '../fb'
import { renderToPipeableStream } from 'react-dom/server'

function User() {
	const [id, setId] = useState()
	const [data, setData] = useState('')
	const [editMode, setEditMode] = useState(false)
	const [newUpload, setNewUpload] = useState()
	const [reports, setReports] = useState()

	useEffect(() => {
		onAuthStateChanged(auth, async (usr) => {
			if (usr) {
				setId(usr.uid)
				const snap = await getDoc(doc(firestore, 'users', usr.uid))
				setData(snap.data())
				const x = await getDocs(collection(firestore, 'users', usr.uid, 'reports'))
				setReports(
					x.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			} else {
				window.location.href = '/userLogin'
			}
		})
	}, [])

	async function upload() {
		console.log('uploading')

		try {
			const imgref = ref(storage, newUpload.name)
			// upload img to fb storage
			await uploadBytes(imgref, newUpload)

			// also keep track in firestore
			await addDoc(collection(firestore, 'users', id, 'reports'), {
				file: newUpload.name,
				url: await getDownloadURL(imgref),
				time: serverTimestamp()
			})
		} catch (err) {
			console.log(err)
		}
	}

	async function edit(e) {
		e.preventDefault()
		const { name, email, dob, gender, bloodGroup } = e.target.elements

		try {
			await updateDoc(doc(firestore, 'users', id), {
				name: name.value,
				email: email.value,
				dob: dob.value,
				bloodGroup: bloodGroup.value,
				gender: gender.value
			})
			setEditMode(false)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			Dashboard
			<br />
			{data ? (
				<form onSubmit={edit}>
					<div>Name: {editMode ? <input id='name' defaultValue={data.name} /> : <span>{data.name}</span>}</div>
					<div>Email: {editMode ? <input id='email' defaultValue={data.email} /> : <span>{data.email}</span>}</div>
					<div>DOB: {editMode ? <input id='dob' defaultValue={data.dob} /> : <span>{data.dob}</span>}</div>
					<div>Gender: {editMode ? <input id='gender' defaultValue={data.gender} /> : <span>{data.gender}</span>}</div>
					<div>Blood Group: {editMode ? <input id='bloodGroup' defaultValue={data.bloodGroup} /> : <span>{data.bloodGroup}</span>}</div>
					{editMode && <button>Submit</button>}
					{editMode && (
						<button type='button' onClick={() => setEditMode(false)}>
							Cancel
						</button>
					)}
					{!editMode && (
						<button
							type='button'
							onClick={() => {
								setEditMode(true)
								console.log(editMode)
							}}
						>
							Edit
						</button>
					)}
				</form>
			) : (
				<p>Loading...</p>
			)}
			<div>
				Reports:
				<br />
				{reports ? reports.map((i) => <img key={i.id} src={i.url} height='50' alt={i.id} />) : 'Loading...'}
			</div>
			<div>
				<input
					className='form-control form-control-lg'
					type='file'
					onChange={(e) => {
						setNewUpload(e.target.files[0])
					}}
				/>
				<button onClick={upload}>Upload report</button>
			</div>
		</>
	)
}

export default User
