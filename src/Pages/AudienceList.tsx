import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { baseUrlForAudience } from "../Services/BaseUrl";

type AudienceType = {
  id: string;
  audienceNumber: string;
  purchaseDate: string;
  technicalTask: string;
};

const AudienceList = () => {
  const navigator = useNavigate();

  const [toast, setToast] = useState(false);
  const [audiences, setAudiences] = useState<AudienceType[]>([]);

  const onDelClick = (e: string) => {
    setToast(true);
    axios
      .delete(baseUrlForAudience + "/" + e, {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => {
        if(response.status == 200){
          setToast(true)
          loadList()
        }
      })
      .catch((e) => console.log(e));
  };
  const loadList = () => {
    axios
      .get(baseUrlForAudience + "?skip=0&take=100", {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => {
        setAudiences(response.data);
      });
  };
  useEffect(() => {
    loadList();
  }, []);
  return (
    <div className="d-flex flex-column">
      <h1 style={{ textAlign: "center" }}>Аудитории</h1>
      {audiences.map((elem) => (
        <div className="d-flex justify-content-between m-3 ">
          <NavLink
            to={"/equipInAudience/" + elem.id}
            key={elem.id}
            className="d-flex align-items-center"
          >
            каб. {elem.audienceNumber}
          </NavLink>
          <Button
            variant="outline-danger"
            onClick={() => onDelClick(elem.id)}
          >
            Delete
          </Button>
        </div>
      ))}

      <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
        <button
          onClick={() => navigator("/audienceCreate")}
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
        <Toast show={toast} onClose={() => setToast(false)} bg="info" delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Информация</strong>
          </Toast.Header>
          <Toast.Body>Данная запись была удалена </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};
export default AudienceList;
