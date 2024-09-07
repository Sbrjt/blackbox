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
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from '../../fb'

function UserProfile({ userId }) {
  const [data, setData] = useState('')
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (userId) {
      onSnapshot(doc(firestore, 'users', userId), (snap) => {
        setData({ ...snap.data(), id: snap.id })
      })
    }
  }, [userId])

  async function edit(e) {
    e.preventDefault()

    const {
      age,
      father,
      mother,
      email,
      phone,
      address,
      dob,
      gender,
      weight,
      height,
      blood,
    } = e.target.elements

    try {
      await updateDoc(doc(firestore, 'users', userId), {
        age: age.value,
        father: father.value,
        mother: mother.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        dob: dob.value,
        gender: gender.value,
        weight: weight.value,
        height: height.value,
        blood: blood.value,
      })

      setEditMode(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className=" bg-light">
        <div className="container px-4 py-5">
          <div className="row g-5 py-5 gap-4 ">
            <div className="col bg-white rounded-4 p-5 card">
              <div className=" text-center">
                <img src="/images/avatar.svg" className="img-fluid" alt="..." />
                <h4 className="pInfo overflow-hidden">
                  Name:
                  <span className="info">
                    <p className="overflow-hidden">{data.name}</p>
                  </span>
                </h4>
                <br />
                <h4 className="name">
                  Hospital Name:
                  <span className="n overflow-hidden">
                    <p className="overflow-hidden">hospital name</p>
                  </span>
                </h4>
              </div>
            </div>

            <div className="col-9 bg-white rounded-4 p-5 card">
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-5 g-4">
                <form onSubmit={edit}>
                  {!editMode && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditMode(true)
                      }}
                    >
                      Edit
                    </button>
                  )}
                  {editMode && (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false)
                        }}
                      >
                        Cancel
                      </button>
                      <button>Submit</button>
                    </>
                  )}
                  <div className="col">
                    <p className="text-muted mb-2">Patient Id:</p>
                    <h4 className="fw-semibold text-body-emphasis">
                      {data.id}
                    </h4>
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Age:</p>
                    {editMode ? (
                      <input name="age" defaultValue={data.age} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.age}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Father's Name:</p>
                    {editMode ? (
                      <input name="father" defaultValue={data.father} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.father}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Mother's Name:</p>
                    {editMode ? (
                      <input name="mother" defaultValue={data.mother} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.mother}
                      </h4>
                    )}
                  </div>
                  <div>
                    <p className="text-muted mb-2">Email Id:</p>
                    {editMode ? (
                      <input name="email" defaultValue={data.email} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.email}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Phone:</p>
                    {editMode ? (
                      <input name="phone" defaultValue={data.phone} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.phone}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Address:</p>
                    {editMode ? (
                      <input name="address" defaultValue={data.address} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.address}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">DOB:</p>

                    {editMode ? (
                      <input name="dob" defaultValue={data.dob} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.dob}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Gender:</p>
                    {editMode ? (
                      <input name="gender" defaultValue={data.gender} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.gender}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    <p className="text-muted mb-2">Weight:</p>
                    {editMode ? (
                      <input name="weight" defaultValue={data.weight} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.weight}
                      </h4>
                    )}
                  </div>
                  <div className="col">
                    {' '}
                    <p className="text-muted mb-2">Height:</p>
                    {editMode ? (
                      <input name="height" defaultValue={data.height} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.height}
                      </h4>
                    )}
                  </div>

                  <div className="col">
                    <p className="text-muted mb-2">Blood Group:</p>
                    {editMode ? (
                      <input name="blood" defaultValue={data.blood} />
                    ) : (
                      <h4 className="fw-semibold text-body-emphasis">
                        {data.blood}
                      </h4>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
