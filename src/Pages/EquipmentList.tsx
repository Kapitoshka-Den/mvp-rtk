import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { EquipmentClass } from "../types/EquipmentType";

const EquipmentList = () => {
  const params = useParams();

  const [equipments, setEquipments] = useState<EquipmentClass[]>([]);
  const [numberAuid, setNumber] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    axios
      .get("http://banaworld.ru:5003/Equipment/Api/Equipment?skip=0&take=20", {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => setEquipments(response.data))
      .catch((error) => console.log(error));
    axios
      .get(
        "http://banaworld.ru:5003/Equipment/Api/Audience/" + params.audienceId,
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("refresh token"),
          },
        }
      )
      .then((response) => {
        setNumber(response.data.audienceNumber);
      });
  }, []);
  return (
    <div>
      <h1>{"Оборудование аудитории " + numberAuid}</h1>

      {equipments.map((elem) => (
        <NavLink to={"/equipment/"+elem.id} key={elem.id}>
          {elem.title} - {elem.responsibleName}
        </NavLink>
      ))}
      <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
        <button
          onClick={()=>navigator("/createEquip",{state:{audienceId:params.audienceId}})}
          type="button"
          className="btn btn-primary btn-lg  hide-toggle"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default EquipmentList;
