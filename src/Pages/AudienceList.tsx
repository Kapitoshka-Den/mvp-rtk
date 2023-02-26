import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { Button, Form, Toast, ToastContainer } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { baseUrlForAudience } from "../Services/BaseUrl";

type BindType = {
  id: string;
  name: string;
  purchaseDate: string;
  technicalTask: string;
  user:{
    jobTitle:string
  }
  audience:{
    technicalTask:string
  }
};

const AudienceList = () => {
  const navigator = useNavigate();

  const [toast, setToast] = useState(false);
  const [audiences, setAudiences] = useState<BindType[]>([]);

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
        if (response.status == 200) {
          setToast(true);
          loadList();
        }
      })
      .catch((e) => console.log(e));
  };
  const loadList = (e = "default") => {
    axios
      .get(baseUrlForAudience, {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => {
        setAudiences(response.data);
        console.log(e)
        console.log(audiences)
        switch (e) {
          case "audience":
            setAudiences(response.data.filter((elem:BindType)=>
              elem.audience != null
            ))
            break;
          case "user":
            setAudiences(response.data.filter((elem:BindType)=>
              elem.user != null
            ))
          break;
          default:
            break;
        }
      });
  };
  useEffect(() => {
    loadList();
  }, []);
  return (
    <div className="d-flex flex-column">
      <Form.Select
          onChange={(e) => {
          loadList(e.target.value);
        }}
      >
        <option selected={true} value = "default">Все</option>
        <option value = "audience">Аудитории</option>
        <option value="user">Пользователи</option>
      </Form.Select>
      {
      audiences.map((elem) => (
        <div className="d-flex justify-content-between m-3 ">
          <NavLink
            to={"/equipInAudience/" + elem.id}
            key={elem.id}
            className="d-flex align-items-center"
          >
            каб. {elem.name}
          </NavLink>
          <Button variant="outline-danger" onClick={() => onDelClick(elem.id)}>
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
        <Toast
          show={toast}
          onClose={() => setToast(false)}
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
export default AudienceList;
