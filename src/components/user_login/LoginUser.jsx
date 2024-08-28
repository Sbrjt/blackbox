import { useState } from "react";
import "./LoginUser.css";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  firestore,
  onAuthStateChanged,
  signOut,
} from "../../fb";

function LoginUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(e) {
    e.preventDefault();
    const { email, pwd } = e.target.elements;

    try {
      const usr = await signInWithEmailAndPassword(
        auth,
        email.value,
        pwd.value
      );
      window.location.href = "/user";
    } catch (err) {
      console.log(err);
    }
  }

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      {/* {!isLoggedIn && (
        <form onSubmit={login}>
          <input id="email" placeholder="email" required />
          <br></br>
          <input id="pwd" placeholder="password" required />
          <br></br>
          <button>LoginUser</button>
        </form>
      )}
      {isLoggedIn && (
        <button
          onClick={() => {
            signOut(auth);
          }}
        >
          Log out
        </button>
      )} */}
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#0056b3" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand fw-semibold fs-10" href="#">
            Navbar
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
                <a
                  className="nav-link fs-5 fw-bold mx-2"
                  aria-current="page"
                  href="#"
                >
                  User
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  Hospital
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  About Us
                </a>
              </li>
              <li className="nav-item mx-4">
                <a className="nav-link fs-5 fw-bold mx-2" href="#">
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4 content">
        <div className="row align-items-center">
          <div
            className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0"
            style={{ marginLeft: "5px" }}
          >
            <div className="hero-text">
              <h1>Hello!..</h1>
              <p style={{ color: "black", fontWeight: "bold" }}>
                Medical Management Made Simple...
              </p>
            </div>
            <img
              style={{ maxWidth: "60%", height: "auto" }}
              className="hero-img"
              src="../../assets/medical2.svg"
              alt="Medical Illustration"
            />
          </div>
          <div className="col-lg-4 offset-lg-1">
            <div
              className="card card-custom mx-auto"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              <div className="card-body text-center">
                {/* Profile Picture */}
                <div className="mb-4">
                  <img
              style={{ maxWidth: "60%", height: "auto" }}
              className="hero-img"
              src="../../assets/medical2.svg"
              alt="Medical Illustration"
            />
                </div>
                {/* Username */}
                {!isLoggedIn && (
                  <form onSubmit={login}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                    </div>
                    {/* Login Button */}
                    <button
                      type="submit"
                      className="btn btn-custom w-100"
                      style={{ backgroundColor: "darkblue" }}
                    >
                      Login
                    </button>
                  </form>
                )}
                {isLoggedIn && (
                  <button
                    onClick={() => {
                      signOut(auth);
                    }}
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>

            <p
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              New Hospital? <br />{" "}
              <button
                style={{
                  borderRadius: "20px",
                  marginTop: "10px",
                  padding: "10px",
                  color: "blue",
                  width: "30%",
                }}
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
