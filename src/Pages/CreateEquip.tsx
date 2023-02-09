import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import QRCode from "react-qr-code";
import GetEquipTypes from "../Services/EquipType";

const CreateEquip = () => {
    const [equipState,setEquipState] = useState("Dropdown Button")
  return (
    <>  
    <div className="d-flex justify-content-around align-items-center flex-column h-75">
      <DropdownButton title={equipState} onSelect={(e)=>{setEquipState(e!)}}>
          {GetEquipTypes().map((elem) => (
            <Dropdown.Item eventKey={elem}>{elem}</Dropdown.Item>
          ))}
      </DropdownButton>
      <input type="text" placeholder="name" />
      <input type="text" placeholder="manufacture" />
      <input type="submit" />
    </div>
    </>
  );
};

export default CreateEquip;
