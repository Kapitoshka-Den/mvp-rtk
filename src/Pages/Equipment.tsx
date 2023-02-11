import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EquipmentClass } from "../types/EquipmentType";
import QRCode from "react-qr-code";

const Equipment = () => {
  const [equip, setEquip] = useState<EquipmentClass>();

  const params = useParams();

  useEffect(() => {
    axios
      .get(
        "http://banaworld.ru:5003/Equipment/Api/Equipment/" +
          params.equipmentId,
        {
          headers: {
            Authorization:
              "Bearer " + window.localStorage.getItem("refresh token"),
          },
        }
      )
      .then((response) => setEquip(response.data))
      .catch((error) => console.log(error));
  }, []);

  const dowloadQrCode = () => {
    const canvasUrl = document.getElementById("qrCode") as HTMLCanvasElement;
    const svgData = new XMLSerializer().serializeToString(canvasUrl);
    
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx!.drawImage(img, img.width, img.height);
    
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = equip!.title;
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <Form>
        <FloatingLabel label="Title">
          <Form.Control
            type="label"
            value={equip?.title}
            className="mb-3"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel label="Description">
          <Form.Control
            as="textarea"
            value={equip?.description}
            className="mb-3"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel label="Responsible name">
          <Form.Control
            type="label"
            value={equip?.responsibleName}
            className="mb-3"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel label="Model">
          <Form.Control
            type="label"
            value={equip?.model}
            className="mb-3"
            readOnly
          />
        </FloatingLabel>

        <QRCode
          id="qrCode"
          value={equip == null ? "" : equip.id}
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          viewBox={`0 0 256 256`}
        ></QRCode>
        <div className="text-center">
          <Button
            type="button"
            variant="primary"
            className="mt-2"
            onClick={dowloadQrCode}
          >
            Download
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Equipment;
