import { useEffect, useState } from 'react'
import { doc, firestore, getDoc, storage, uploadBytes, ref, getDownloadURL, addDoc, collection } from '../fb'
import CreatableSelect from 'react-select/creatable'
import { pdf } from '@react-pdf/renderer'
import Pdf from './Pdf'

function Prescription() {
	const [patient, setPatient] = useState()
	const [drugList, setDrugList] = useState()
	const [addPills, setAddPills] = useState(false)
	const [pills, setPills] = useState([])

	useEffect(() => {
		;(async () => {
			const res = await fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=38647')
			const json = await res.json()
			const drugs = Array.from(new Set(json.results.map((i) => i.term)))
			setDrugList(drugs)
		})()
	}, [])

	async function getPatient(e) {
		e.preventDefault()
		const { id } = e.target.elements

		try {
			const snap = await getDoc(doc(firestore, 'users', id.value))
			setPatient({ ...snap.data(), id: id.value })
		} catch (err) {
			alert('Patient not found!')
			console.log(err)
		}
	}

	async function addPill(e) {
		e.preventDefault()
		const { drug, qty, unit, dosage, instruction } = e.target.elements

		const newpill = {
			drug: drug.value,
			qty: qty.value,
			unit: unit.value,
			dosage: dosage.value,
			instruction: instruction.value ? [instruction.value] : Array.from(instruction).map((i) => i.value)
		}

		setPills((prev) => [...prev, newpill])
		setAddPills(false)
	}

	async function writePrescription() {
		const blob = await pdf(<Pdf pills={pills} patient={patient} />).toBlob()
		const url = URL.createObjectURL(blob)
		window.open(url)

		const fileRef = ref(storage, 'filename')
		await uploadBytes(fileRef, blob)

		await addDoc(collection(firestore, 'users', patient.id, 'prescriptions'), {
			pills,
			time: new Date(),
			url: await getDownloadURL(fileRef),
			doctor: 'xyz'
		})
	}

	return (
		<div className='m-5'>
			<form onSubmit={getPatient}>
				<input name='id' placeholder='Enter patient id' required />
				<button>Go</button>
			</form>

			{patient && (
				<div>
					<div>Name: {patient.name}</div>
					<div>Email: {patient.email}</div>
					<div>DOB: {patient.dob}</div>
					<div>Gender: {patient.gender}</div>
					<div>Blood Group: {patient.bloodGroup}</div>
				</div>
			)}
			<br />

			{pills.map((i) => (
				<div key={i.drug} className='my-4'>
					<span key={i.drug}>{i.drug}</span>
					<br />
					<small>
						{i.dosage}: {i.qty} {i.unit}
						{parseInt(i.qty) > 1 ? 's' : ''}
					</small>
					<br />
					<small>{i.instruction.join(', ')}</small>
				</div>
			))}
			<br />

			{!addPills && <button onClick={() => setAddPills(true)}>Add pill</button>}

			{addPills && (
				<form onSubmit={addPill}>
					<button className='btn btn-primary'>
						<i className='bi bi-plus-circle me-2'></i>
						Add
					</button>
					<button className='btn btn-danger ms-3' type='button' onClick={() => setAddPills(false)}>
						Cancel
					</button>
					<br />
					<br />
					<input list='drugs' name='drug' placeholder='Medicine' className='form-control' />
					<datalist id='drugs'>
						{drugList.map((i) => (
							<option value={i} key={i} />
						))}
					</datalist>
					<br />
					<div className='d-flex justify-content-between'>
						<div className='form-check'>
							<input className='form-check-input' type='radio' name='dosage' value='Daily' id='daily' defaultChecked />
							<label className='form-check-label' htmlFor='daily'>
								Daily
							</label>
						</div>
						<div className='form-check'>
							<input className='form-check-input' type='radio' name='dosage' value='Weekly' id='weekly' />
							<label className='form-check-label' htmlFor='weekly'>
								Weekly
							</label>
						</div>
						<div className='form-check'>
							<input className='form-check-input' type='radio' name='dosage' value='As required' id='asrequired' />
							<label className='form-check-label' htmlFor='asrequired'>
								As required
							</label>
						</div>
					</div>
					<br />
					can
					<div className='row'>
						{/* Dosage */}
						<div className='col-2'>
							<input name='qty' className='form-control' defaultValue={1} />
						</div>
						<div className='col-5'>
							<select name='unit' className='form-select' defaultValue='pill'>
								<option value='pill'>pill</option>
								<option value='tsp'>tsp</option>
								<option value='puff'>puff</option>
								<option value='item'>item</option>
								<option value='time'>time</option>
							</select>
						</div>

						{/* Instruction */}
						<div className='col'>
							<CreatableSelect
								name='instruction'
								isMulti
								placeholder={'When/How'}
								options={[
									{ value: 'Anytime', label: 'Anytime' },
									{ value: 'Before meal', label: 'Before meal' },
									{ value: 'After meal', label: 'After meal' },
									{ value: 'Before breakfast', label: 'Before breakfast' },
									{ value: 'After breakfast', label: 'After breakfast' },
									{ value: 'Before lunch', label: 'Before lunch' },
									{ value: 'After lunch', label: 'After lunch' },
									{ value: 'Before dinner', label: 'Before dinner' },
									{ value: 'After dinner', label: 'After dinner' },
									{ value: 'Before bed', label: 'Before sleep' }
								]}
							/>
						</div>
					</div>
				</form>
			)}
			<br />
			<button onClick={writePrescription}>OK</button>
		</div>
	)
}

export default Prescription
