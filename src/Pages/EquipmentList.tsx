import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { baseUrlForAudience, baseUrlForEquipment } from "../Services/BaseUrl";
import { EquipmentClass } from "../types/EquipmentType";

const EquipmentList = () => {
  const params = useParams();

  const [equipments, setEquipments] = useState<EquipmentClass[]>([]);
  const [numberAuid, setNumber] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    console.log(params.audienceId)
    axios
      .get(baseUrlForEquipment+"?skip=0&take=20&audienceId="+params.audienceId, {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => setEquipments(response.data))
      .catch((error) => console.log(error));
    axios
      .get(
        baseUrlForAudience + params.audienceId,
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
    <div className="d-flex flex-column">
      <h1>{"Оборудование аудитории " + numberAuid}</h1>

      {equipments.map((elem) => (
        <NavLink to={"/equipment/"+elem.id} key={elem.id}>
          {elem.title} - {elem.responsibleName}
        </NavLink>
      ))}
      <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
        <button
          onClick={()=>navigator("/createEquip",{state:{equipmentId:params.audienceId}})}
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
