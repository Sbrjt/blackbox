import { useEffect, useState } from 'react'
import { doc, firestore, getDoc } from '../fb'
import CreatableSelect from 'react-select/creatable'

// const drugList = Array.from(
// 	new Set((await (await fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=38647')).json()).results.map((i) => i.term))
// )

function Prescription() {
	const [patientData, setPatientData] = useState()
	const [drugList, setDrugList] = useState()
	const [addPills, setAddPills] = useState(false)
	const [pills, setPills] = useState([])

	useEffect(() => {
		;(async () => {
			const response = await fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=38647')
			const data = await response.json()
			const uniqueDrugNames = Array.from(new Set(data.results.map((i) => i.term)))
			setDrugList(uniqueDrugNames)
		})()
	}, [])

	async function getPatient(e) {
		e.preventDefault()
		const { id } = e.target.elements

		try {
			const snap = await getDoc(doc(firestore, 'users', id.value))
			setPatientData(snap.data())
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
	}

	return (
		<div className='m-5'>
			<form onSubmit={getPatient}>
				<input name='id' placeholder='Enter patient id' required />
				<button>Go</button>
			</form>

			{patientData && (
				<div>
					<div>Name: {patientData.name}</div>
					<div>Email: {patientData.email}</div>
					<div>DOB: {patientData.dob}</div>
					<div>Gender: {patientData.gender}</div>
					<div>Blood Group: {patientData.bloodGroup}</div>
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
									{ value: 'Daily', label: 'Daily' },
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
		</div>
	)
}

export default Prescription
