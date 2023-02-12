import axios from "axios";
import { useState } from "react";
import { Button, FloatingLabel, Form, FormGroup } from "react-bootstrap";

const AudienceCreate = () => {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");

  function onClick() {
    axios.post(
      "http://banaworld.ru:5003/Equipment/Api/Audience",
      {
        audienceNumber:number,
        purchaseDate:date,
        technicalTask:task
      },
      {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      }
    ).then().catch(e=>console.log(e));
  }

  return (
    <div className="d-flex align-items-control justify-content-center">
      <Form>
        <FormGroup>
          <FloatingLabel label="Номер аудитории">
            <Form.Control
              type="label"
              placeholder="Audiecne Number"
              onChange={(e) => setNumber(e.target.value)}
              className="mb-3"
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "280px" }}
          />
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Техническое задание">
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
    </div>
  );
};

export default AudienceCreate;
