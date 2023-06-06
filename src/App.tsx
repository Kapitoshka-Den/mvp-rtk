import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { NavLink, Route, Router, Routes, useNavigate } from "react-router-dom";
import AudienceList from "./Pages/AudienceList";
import CreateEquip from "./Pages/CreateEquip";
import Authorize from "./Pages/Authorize";
import Registration from "./Pages/Registration";
import EquipmentList from "./Pages/EquipmentList";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { tokensDelete } from "./Services/LocalStorageService";
import Equipment from "./Pages/Equipment";
import AudienceCreate from "./Pages/AudiencesCreate";
import AudienceInfo from "./Pages/AudienceInfo";

const App = () => {
  const navigator = useNavigate();

  return (
    <div className="App">
      <nav style={{ height: "10%",background:"#0d6efd" }} className="d-flex flex-row">
        <ul className="padding-inline-start header">
          {window.localStorage.getItem("acces token") ? (
            <div className="header">
              <div>
                <NavLink className="m-1" to="/audienceList">
                  Audiences
                </NavLink>
                <NavLink className="m-1" to="/">
                  Login
                </NavLink>
              </div>
              <Button
              className="logout"
                onClick={() => {
                  tokensDelete();
                  navigator("/");
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <NavLink className="m-1" to="/">
              Login
            </NavLink>
          )}
        </ul>
      </nav>
      <Routes>
        <Route
          path="/equipInAudience/:audienceId"
          element={<EquipmentList />}
        />
        <Route path="/" element={<Authorize />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/audienceList" element={<AudienceList />} />
        <Route path="/createEquip" element={<CreateEquip props="test" />} />
        <Route path="/Login" element={<Authorize />} />
        <Route path="/equipment/:audiencetId" element={<Equipment />} />
        <Route path="/audienceCreate" element={<AudienceCreate />} />
        <Route path="/audienceInfo/:audienceId" element={<AudienceInfo />} />
      </Routes>
    </div>
  );
};

export default App;
