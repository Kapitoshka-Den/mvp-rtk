import { NavLink } from "react-router-dom"
import GetAudience from "../Services/Audience"


const AudienceList = () =>{
    return(
        <div>
            {
                GetAudience().map((elem)=>(
                    <div>{elem}</div>
                ))
            }
        </div>
    )
}
export default AudienceList