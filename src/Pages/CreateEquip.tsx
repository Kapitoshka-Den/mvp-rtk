import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownButton,
  FormGroup,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import QRCode from "react-qr-code";
import { parsePath, useLocation, useParams } from "react-router-dom";
import { baseUrlForEquipment } from "../Services/BaseUrl";
import { EquipmentClass } from "../types/EquipmentType";
import { EquipmentType } from "../types/EquipmetTypes";

const CreateEquip = (props: any) => {
  const params = useLocation();

  const [types, setTypes] = useState<EquipmentType[]>([]);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [direction, setDirection] = useState("");
  const [responName, setresponName] = useState("");
  const [model, setModel] = useState("");
  const [file, setFile] = useState<any>();

  const formData = new FormData();

  useEffect(() => {
    console.log(params.state.audienceId);
    axios
      .get(
        baseUrlForEquipment+"?skip=0&take=100",
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("refresh token"),
          },
        }
      )
      .then((response) => setTypes(response.data))
      .catch((error) => console.log(error));
  }, []);

  function onClick() {
    axios
      .post(
        "http://banaworld.ru:5003/Equipment/Api/Equipment",
        {
          title: title,
          description: direction,
          responsibleName: responName,
          model: model,
          typeId: type,
          audienceId: params.state.audienceId,
        },
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("refresh token"),
          },
        }
      )
      .then((response) => {
        formData.append("File",file)
        formData.append("EquipmentId",response.data)
        console.log(response.data)
        axios
          .post(
            "http://banaworld.ru:5003/Equipment/Api/Attach",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization:
                  "Bearer " + window.localStorage.getItem("refresh token"),
              },
            }
          )
          .then()
          .catch((error) => {
            console.log(error);
          });
          
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 style={{ textAlign: "center" }}>Добавление оборудования</h1>
      <Form>
        <FormGroup>
          <FloatingLabel label="Тип оборудования">
            <Form.Select
              className="mb-3"
              size="lg"
              onChange={(e) => {
                console.log(type);
                setType(e.target.value);
              }}
            >
              {types.map((elem, index) => (
                <option key={elem.id} value={elem.id}>
                  {elem.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Title equipment" className="mb-3">
            <Form.Control
              type="label"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Direction" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Direction"
              onChange={(e) => setDirection(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Responsible name" className="mb-3">
            <Form.Control
              type="label"
              placeholder="Responsible Name"
              onChange={(e) => setresponName(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel label="Model" className="mb-3">
            <Form.Control
              type="label"
              placeholder="Responsible Name"
              onChange={(e) => setModel(e.target.value)}
            />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <Form.Control
            type="file"
            className="mb-3"
            placeholder="file"
            size="lg"
            onChange={(event) => {
              const target = event.target as HTMLInputElement;
              setFile(target.files?.item(0));
              console.log(file);
            }}
          />
        </FormGroup>
        <div className="text-center">
          <Button type="button" onClick={onClick}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateEquip;
