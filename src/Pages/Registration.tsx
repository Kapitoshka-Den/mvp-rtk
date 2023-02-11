import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { tokensAdd, tokensDelete } from "../Services/LocalStorageService";

const Registration = () => {
  const navigate = useNavigate();
  
useEffect(()=>{
  if(window.localStorage.getItem("refresh token")) navigate("/audienceList")
})


  const [userEmail,setEmail] = useState("")
  const [userLogin,setLogin] = useState("")
  const [userPassword,setPassword] = useState("")



function SignUp(email:string, login:string,password:string) {
      axios.post('http://banaworld.ru:5003/Auth/api/Auth/SignIn',{
        email:userEmail,
        password:userPassword,
        login:userLogin
      }).then((response)=>{
        tokensDelete()
        tokensAdd(response.data.accessToken,response.data.refreshToken)
        navigate("/audienceList")
      })
      .catch((error)=>{
        console.log(error);
      })
}
  

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 style={{textAlign:'center'}}>Регистрация</h1>
      <Form>
        <FormGroup>
            <FloatingLabel label="Login" className="mb-3">
                <Form.Control type="label" placeholder="Label" />
            </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3">
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
            <FloatingLabel label="Password"
            controlId="floatingPassword"
            className="mb-3">
                <Form.Control type="password" placeholder="Password"/>
            </FloatingLabel>
        </FormGroup>
        <div className="text-center">

        <Button type="button" 
            className="text-center">
            Submit
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default Registration;
