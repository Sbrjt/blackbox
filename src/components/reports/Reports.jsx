import React from 'react'
import "./Reports.css";
const Reports = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0056b3', height: '60px' }}>
        <div className="container-fluid">
          <a className="navbar-brand fw-semibold fs-10" href="#">
            <img
              src="arrow_back.svg"
              alt="Logo"
              style={{ marginLeft: '10px', height: '40px', width: '40px' }}
            />
          </a>
          <a className="navbar-brand fw-semibold fs-10" href="#">
            <img
              src="login.svg"
              alt="Logo"
              style={{ height: '40px', width: '40px' }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Reports
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Medicine
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Scheduler
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link mx-2" href="#">
                  Help
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fw-bold mx-2" href="#">
                  <img
                    src="login.png"
                    alt="user details"
                    style={{ width: '40px', height: '40px' }}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Card Section */}
      <div className="card h-100 custom-rounded-card">
        <a
          href="#"
          style={{
            width: '50%',
            height: '50%',
            marginBottom: '20px',
            alignItems: 'center',
            marginTop: '20px',
            marginLeft: '25%',
          }}
        >
          <img
            style={{ width: '50%', height: '50%', marginBottom: '20px' }}
            src="add.svg"
            className="card-img-top"
            alt="Card Image 1"
          />
        </a>
        <hr style={{ height: '5px', width: '100%', marginTop: '0px' }} />
        <div
          className="c-footer"
          style={{
            height: '100%',
            padding: '10px',
            width: '100%',
            borderRadius: '20px',
          }}
        >
          <input
            type="text"
            placeholder=""
            style={{
              width: '100%',
              height: '100%',
              padding: '10px',
              borderRadius: '20px',
            }}
            name=""
          />
        </div>
      </div>
    </div>
  )
}

export default Reports