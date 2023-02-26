import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { EquipmentClass } from "../types/EquipmentType";
import QRCode from "react-qr-code";
import { baseUrlForEquipment } from "../Services/BaseUrl";
import { QRCodeCanvas } from "qrcode.react";

const Equipment = () => {
  const [equip, setEquip] = useState<EquipmentClass | null>(null);
  const qrRef = useRef<HTMLDivElement>(null)
  const params = useParams();

  useEffect(() => {
    axios
      .get(baseUrlForEquipment +"/"+ params.audiencetId, {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => setEquip(response.data))
      .catch((error) => console.log(error));
  }, []);

  const dowloadQrCode = () => {
      let canvas = qrRef.current!.querySelector("canvas");
      console.log(qrRef.current)
      let image = canvas!.toDataURL("image/png");
      let anchor = document.createElement("a");
      anchor.href = image;
      anchor.download = equip?.title+".png";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
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
        <FloatingLabel label="Purchase Date">
          <Form.Control
            type="label"
            value={equip?.purchaseDate}
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

        <div ref={qrRef}>
          <QRCodeCanvas
            id="qrCode"
            value={
              equip == null
                ? ""
                : "http://banaworld.ru:5003/Equipment/Api/Equipment/" +
                  params.audiencetId
            }
            level="H"
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          ></QRCodeCanvas>
        </div>
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
