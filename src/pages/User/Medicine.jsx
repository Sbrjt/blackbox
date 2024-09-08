import { useEffect, useState } from 'react'
import { collection, firestore, onSnapshot, query, addDoc } from '../../fb'
import CreatableSelect from 'react-select/creatable'

function Medicine({ userId }) {
	const [medicines, setMedicines] = useState([])
	const [drugList, setDrugList] = useState()

	useEffect(() => {
		if (userId) {
			onSnapshot(query(collection(firestore, 'users', userId, 'medicines')), (snap) => {
				setMedicines(
					snap.docs.map((doc) => ({
						...doc.data(),
						id: doc.id
					}))
				)
			})
		}
	}, [userId])

	useEffect(() => {
		;(async () => {
			const res = await fetch('https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=38647')
			const json = await res.json()
			const drugs = Array.from(new Set(json.results.map((i) => i.term)))
			setDrugList(drugs)
		})()
	}, [])

	async function addPill(e) {
		e.preventDefault()
		const { drug, endDate, qty, unit, dosage, instruction } = e.target.elements

		await addDoc(collection(firestore, 'users', userId, 'medicines'), {
			drug: drug.value,
			endDate: endDate.value,
			qty: parseInt(qty.value),
			unit: unit.value,
			dosage: dosage.value,
			instruction: instruction.value ? [instruction.value] : Array.from(instruction).map((i) => i.value)
		})
	}

	const schedule = (title, filterCondition) => {
		const filteredMedicines = medicines.filter((i) => i.instruction.includes(filterCondition))

		if (filteredMedicines.length === 0) {
			return null // Return null if no medicines match the filter condition
		}

		return (
			<>
				<h4 className='mt-5'>{title}</h4>
				<div className='rounded-4 p-0 pt-3 card m-0'>
					<ul className='list-unstyled'>
						{filteredMedicines.map((i) => (
							<li key={i.id} className='mb-3 d-flex justify-content-center'>
								<div className='d-flex align-items-center justify-content-between bg-white border rounded p-3 w-75 shadow-sm'>
									<img src='/images/bellIcon.svg' className='bellIcon me-3' alt='Notification Icon' />
									<p className='medicineName fw-bold mb-0'>{i.drug}</p>
									<p className='pill mb-0'>
										{i.unit}:{i.qty}
									</p>
								</div>
							</li>
						))}
					</ul>
				</div>
			</>
		)
	}

	return (
		<div className=' bg-light h-100'>
			<div className='container px-md-5 px-3 py-5'>
				<h2 className='pb-2 border-bottom mb-4'>Add to Schedule</h2>

				<div className=''>
					<form onSubmit={addPill}>
						<button className='btn btn-success mb-2'>
							<i className='bi bi-plus-circle me-2'></i>
							Add pill
						</button>
						<div className='row py-3 my-auto'>
							<div className='col me-5'>
								<input list='drugs' name='drug' placeholder='Medicine' className='form-control' />
								<datalist id='drugs'>
									{drugList?.map((i) => (
										<option value={i} key={i} />
									))}
								</datalist>
							</div>
							<div className='col-3 me-5 '>
								<div className='input-group'>
									<span className='input-group-text'>End date</span>
									<input name='endDate' type='date' className='form-control' />
								</div>
							</div>
							<div className='d-flex justify-content-between col-4 my-auto'>
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
						</div>

						<div className='row mb-2'>
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
							<div className='col'>
								<CreatableSelect
									name='instruction'
									isMulti
									placeholder={'When/How'}
									options={[
										{ value: 'Morning', label: 'Morning' },
										{ value: 'Before Breakfast', label: 'Before Breakfast' },
										{ value: 'After Breakfast', label: 'After Breakfast' },
										{ value: 'Before Lunch', label: 'Before Lunch' },
										{ value: 'After Lunch', label: 'After Lunch' },
										{ value: 'Evening', label: 'Evening' },
										{ value: 'Before Dinner', label: 'Before Dinner' },
										{ value: 'After Dinner', label: 'After Dinner' },
										{ value: 'Before Bed', label: 'Before Bed' }
									]}
								/>
							</div>
						</div>
					</form>
				</div>
			</div>

			<div className='container px-md-5 px-3 py-5'>
				<h2 className='pb-2 border-bottom mb-4'>Your Schedule</h2>

				{schedule('Morning', 'Morning')}
				{schedule('Before Breakfast', 'Before Breakfast')}
				{schedule('After Breakfast', 'After Breakfast')}
				{schedule('Before Lunch', 'Before Lunch')}
				{schedule('After Lunch', 'After Lunch')}
				{schedule('Evening', 'Evening')}
				{schedule('Before Dinner', 'Before Dinner')}
				{schedule('After Dinner', 'After Dinner')}
				{schedule('Before Bed', 'Before Bed')}
				{schedule('Default', null)}
			</div>
		</div>
	)
}

export default Medicine
