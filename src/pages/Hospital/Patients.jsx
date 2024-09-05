import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, collection, setDoc, onSnapshot, orderBy, query } from '../../fb'

function Patients({ hospitalId }) {
	const [newPatient, setNewPatient] = useState()
	const [patients, setPatients] = useState()
	const [selectedId, setSelectedId] = useState()
	const [selectedPatient, setSelectedPatient] = useState()

	useEffect(() => {
		if (hospitalId) {
			onSnapshot(query(collection(firestore, 'hospitals', hospitalId, 'patients'), orderBy('admit date')), (snap) => {
				setPatients(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			})
		}
	}, [hospitalId])

	useEffect(() => {
		if (selectedId) {
			onSnapshot(doc(firestore, 'users', selectedId), (snap) => {
				setSelectedPatient(snap.data())
			})
		}
	}, [selectedId])

	async function getNewPatient(e) {
		e.preventDefault()
		const { id } = e.target.elements

		try {
			const snap = await getDoc(doc(firestore, 'users', id.value))
			setNewPatient({ ...snap.data(), id: id.value })
			// also add the pic
		} catch (err) {
			alert('Patient not found!')
			console.log(err)
		}
	}

	async function addNewPatient(e) {
		e.preventDefault()

		console.log(newPatient)

		try {
			await setDoc(doc(firestore, 'hospitals', hospitalId, 'patients', newPatient.id), {
				name: newPatient.name,
				'admit date': new Date()
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<h1>Patients</h1>

			<div>
				Add new patient:
				{!newPatient && (
					<form onSubmit={getNewPatient}>
						<input name='id' placeholder='Enter patient id' required />
						<button>Go</button>
					</form>
				)}
				{newPatient && (
					<>
						<div>
							<div>Name: {newPatient.name}</div>
							<div>Email: {newPatient.email}</div>
							<div>Phone: {newPatient.phone}</div>
						</div>
						<button onClick={addNewPatient}>Add</button>
						<button
							onClick={() => {
								setNewPatient()
							}}
						>
							Cancel
						</button>
					</>
				)}
			</div>

			<div>
				{patients
					? patients.map((i) => (
							<button key={i.id} onClick={() => setSelectedId(i.id)}>
								<p>{i.id}</p>
								<p>{i.name}</p>
								<br />
							</button>
					  ))
					: 'Loading...'}
			</div>

			{selectedPatient && (
				<>
					<p>Name: {selectedPatient.name}</p>
					<p>Email: {selectedPatient.email}</p>
				</>
			)}
		</>
	)
}

export default Patients
