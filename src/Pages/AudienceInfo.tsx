import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import { FloatingLabel, Button ,Form} from "react-bootstrap";
import {  useParams } from "react-router-dom";
import { baseUrlForAudience } from "../Services/BaseUrl";
import {BindType} from "../types/BindType"

const AudienceInfo = () =>{
    const params = useParams();
    const [audience,setAudience] = useState<BindType>()
    const qrRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      console.log(params)
        axios
          .get(baseUrlForAudience +"/"+ params.audienceId
          , {
            headers: {
              Authorization:
                "Bearer " + window.localStorage.getItem("refresh token"),
            },
          })
          .then((response) => {
            console.log(response.data)
            setAudience(response.data)})
          .catch((error) => console.log(error));
      }, []);
    
      const dowloadQrCode = () => {
          let canvas = qrRef.current!.querySelector("canvas");
          console.log(qrRef.current)
          let image = canvas!.toDataURL("image/png");
          let anchor = document.createElement("a");
          anchor.href = image;
          anchor.download = audience?.name+".png";
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
            value={audience?.name}
            className="mb-3"
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel label="Description">
          <Form.Control
            as="textarea"
            value={audience?.user != null? audience?.user.jobTitle:audience?.audience.technicalTask}
            className="mb-3"
            readOnly
          />
        </FloatingLabel>
        


        <div ref={qrRef}>
          <QRCodeCanvas
            id="qrCode"
            value={
              audience == null
                ? ""
                : "http://banaworld.ru:5003/Equipment/Api/Equipment/" +
                  params.audienceId
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
    )
}

export default AudienceInfo