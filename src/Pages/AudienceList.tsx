import axios from "axios";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import GetAudience from "../Services/Audience";

type AudienceType = {
  id: string;
  audienceNumber: string;
  purchaseDate: string;
  technicalTask: string;
};

const AudienceList = () => {
  const [audiences, setAudiences] = useState<AudienceType[]>([]);

  useEffect(() => {
    axios
      .get("http://banaworld.ru:5003/Equipment/Api/Audience?skip=0&take=100", {
        headers: {
          Authorization:
            "Bearer "+window.localStorage.getItem("refresh token"),
        },
      })
      .then((response) => {
        setAudiences(response.data);
      });
  }, []);
  return (
    <div className="d-flex flex-column">
      <h1 style={{ textAlign: "center" }}>Аудитории</h1>
      {audiences.map((elem) => (
        <NavLink to={"/equipInAudience/"+elem.id} key={elem.id}>каб. {elem.audienceNumber}</NavLink>
      ))}
    </div>
  );
};
export default AudienceList;
