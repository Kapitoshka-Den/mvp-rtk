import axios from "axios";
import { useEffect, useState } from "react";
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

  const [audiences, setAudiences] = useState<AudienceType[]>([]);

  useEffect(() => {
    axios
      .get((baseUrlForAudience+"?skip=0&take=100"), {
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("refresh token"),
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
        <NavLink to={"/equipInAudience/" + elem.id} key={elem.id}>
          каб. {elem.audienceNumber}
        </NavLink>
      ))}

      <div className="dropup position-absolute bottom-0 end-0 rounded-circle m-5">
        <button
          onClick={() =>
            navigator("/audienceCreate")
          }
          type="button"
          className="btn btn-primary btn-lg  hide-toggle"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default AudienceList;
