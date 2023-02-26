import axios from "axios";
import { response } from "express";
import { useEffect, useState } from "react";
import { Button, Toast, ToastContainer, ToastHeader } from "react-bootstrap";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { baseUrlForAudience, baseUrlForEquipment } from "../Services/BaseUrl";
import { EquipmentClass } from "../types/EquipmentType";

const EquipmentList = () => {
  const params = useParams();

  const [equipments, setEquipments] = useState<EquipmentClass[]>([]);
  const [numberAuid, setNumber] = useState("");
  const [toastShow, setToastShow] = useState(false);

  const navigator = useNavigate();

  const onDelClick = (e: string) => {
    axios
      .delete(baseUrlForEquipment + "/" + e, {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => {
        if (response.status == 200) {
          setToastShow(true);
          loadEquipList();
        }
      })
      .catch((error) => console.log(error.response.status));
  };

  const loadEquipList = () => {
    console.log(params.audienceId)
    axios
      .get(
        baseUrlForEquipment + "?binderId=" + params.audienceId,
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("refresh token"),
          },
        }
      )
      .then((response) => setEquipments(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadEquipList();
    axios
      .get(baseUrlForAudience + "/" + params.audienceId, {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => {
        setNumber(response.data.audienceNumber);
      });
  }, []);
  return (
    <div className="d-flex flex-column">
      <h1>{"Оборудование аудитории " + numberAuid}</h1>

      {equipments.map((elem) => (
        <div className="d-flex justify-content-between m-3">
          <NavLink to={"/equipment/" + elem.id} key={elem.id}>
            {elem.title} - {elem.model}
          </NavLink>
          <Button variant="outline-danger" onClick={() => onDelClick(elem.id)}>
            Delete
          </Button>
        </div>
      ))}
      <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
        <button
          onClick={() =>
            navigator("/createEquip", {
              state: { equipmentId: params.audienceId },
            })
          }
          type="button"
          className="btn btn-primary btn-lg  hide-toggle"
        >
          +
        </button>
      </div>
      <ToastContainer
        className="d-flex flex-column mb-3 align-items-center"
        position="middle-center"
      >
        <Toast
          show={toastShow}
          onClose={() => setToastShow(false)}
          bg="info"
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Информация</strong>
          </Toast.Header>
          <Toast.Body>Данная запись была удалена </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default EquipmentList;
