import React from "react";
import "../css/MedicineSection.css"
const MedicineSection = () => {
  return (
    <div>
      <div className="navBar">
        <div id="logoImage"></div>
        <div id="homeDiv">
          <a id="home" className="options">
            Home
          </a>
        </div>
        <div id="reportsDiv">
          <a id="reports" className="options">
            Reports
          </a>
        </div>
        <div id="medicineDiv">
          <a id="medicine" className="options">
            Medicine
          </a>
        </div>
        <div id="schedulerDiv">
          <a id="scheduler" className="options">
            Scheduler
          </a>
        </div>
        <div id="helpDiv">
          <a id="help" className="options">
            Help
          </a>
        </div>
        <button id="account">
          <img src="avatar.svg" id="avatar" />
        </button>
      </div>
      <div className="sideOptions">
        <div className="above">
          <h3 id="opt1">
            <span>
              <input type="radio" name="above" value="all" id="check1" />
            </span>{" "}
            All
          </h3>
          <h3 id="opt2">
            <span>
              <input type="radio" name="above" value="Morning" id="check2" />
            </span>{" "}
            Morning
          </h3>
          <h3 id="opt3">
            <span>
              <input type="radio" name="above" value="Afternoon" id="check3" />
            </span>{" "}
            Afternoon
          </h3>
          <h3 id="opt4">
            <span>
              <input type="radio" name="above" value="Evening" id="check4" />
            </span>{" "}
            Evening
          </h3>
        </div>
        <div className="below">
          <h3 id="opt5">
            <span>
              <input type="radio" name="all" value="all" id="check5" />
            </span>{" "}
            Tablets
          </h3>
          <h3 id="opt6">
            <span>
              <input type="radio" name="all" value="all" id="check6" />
            </span>{" "}
            Syrups
          </h3>
          <h3 id="opt7">
            <span>
              <input type="radio" name="all" value="all" id="check7" />
            </span>{" "}
            Injections
          </h3>
        </div>
      </div>
      <div className="mainBody">
        <div className="addMed">
          <img src="plus.svg" id="plusSvg" />
          <p id="text">Add Medicine</p>
        </div>
        <div className="addMed2">
          <input type="text" placeholder="Medicine Name" id="medName" />

          <div className="t">
            <h3 id="daily">
              <span>
                <input type="radio" name="time" value="daily" id="check8" />
              </span>{" "}
              Daily
            </h3>
            <h3 id="weekly">
              <span>
                <input type="radio" name="time" value="weekly" id="check9" />
              </span>{" "}
              Weekly
            </h3>
            <h3 id="asReq">
              <span>
                <input type="radio" name="time" value="asReq" id="check10" />
              </span>{" "}
              As Required
            </h3>
          </div>

          <input type="text" id="per" />
          <input type="text" id="day" />
        </div>

        <div className="addedmed">
          <h3 id="addedMedName">Paracitamol</h3>
          <h3 id="noPerDay">3</h3>
          <h3 id="unit">Pills</h3>
          <h3 id="times">Daily</h3>
          <h3 id="upto">upto: 1 week</h3>
        </div>
      </div>
    </div>
  );
};

export default MedicineSection;
