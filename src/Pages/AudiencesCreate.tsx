import axios from "axios";
import e from "express";
import { useState } from "react";
import {
  Button,
  FloatingLabel,
  Form,
  FormGroup,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
} from "react-bootstrap";
import { baseUrlForAudience } from "../Services/BaseUrl";

const AudienceCreate = () => {
  const [type, setType] = useState("audience");
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [showToast, setShowToast] = useState(false);
  function onClick() {
    axios
      .post(
        baseUrlForAudience,
        type == "audience"
          ? {
              name: name,
              audience: {
                technicalTask: task,
              },
            }
          : {
              name: name,
              user: {
                jobTitle: task,
              },
            },
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("refresh token"),
          },
        }
      )
      .then((response) => setShowToast(true))
      .catch((e) => console.log(e));
  }



  return (
    <div className="d-flex align-items-control justify-content-center">
      <Form>
        <FormGroup>
          <FloatingLabel label="Binds type" className="mb-3">
            <Form.Select onChange={(e)=>setType(e.target.value)}>
              <option selected={true} value={"user"}>User</option>
              <option value={"audience"}>Audience</option>
            </Form.Select>
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Номер аудитории / Ваше имя">
            <Form.Control
              type="label"
              placeholder="Audiecne Number"
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Техническое задание / Ваша должность">
            <Form.Control
              as="textarea"
              placeholder="Tech task"
              onChange={(e) => setTask(e.target.value)}
              className="mt-3"
            />
          </FloatingLabel>
        </FormGroup>

        <div className="text-center">
          <Button type="button" onClick={onClick} className="mt-3">
            Submit
          </Button>
        </div>
      </Form>
      <ToastContainer
        position="top-center"
        className="d-flex flex-column mb-3 align-items-center"
      >
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <ToastHeader>
            <strong className="me-auto">Информация</strong>
          </ToastHeader>
          <ToastBody>Запись была успешно добавлена</ToastBody>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AudienceCreate;
