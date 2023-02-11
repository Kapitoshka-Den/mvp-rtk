import axios from "axios";
import { error } from "console";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, FormGroup } from "react-bootstrap";
import { Navigate, NavLink, redirect, useNavigate } from "react-router-dom";
import { tokensAdd, tokensDelete } from "../Services/LocalStorageService";

const Authorize = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(window.localStorage.getItem("refresh token")) navigate("/audienceList")
  })
  const [userEmail,setEmail] = useState("")
  const [userPassword,setPassword] = useState("")

  const base_url = "http://banaworld.ru:5003/Auth/api/Auth"


  function SignIn(userEmail:string,userPassword:string){
      axios.post('http://banaworld.ru:5003/Auth/api/Auth/SignIn',{
        email:userEmail,
        password:userPassword
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
      <h1 style={{ textAlign: "center" }}>Авторизация</h1>
      <Form>
        <FormGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
          </FloatingLabel>
        </FormGroup>
        <FormGroup>
          <FloatingLabel
            label="Password"
            controlId="floatingPassword"
            className="mb-3"
          >
            <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          </FloatingLabel>
        </FormGroup>
        <div className="text-center">
          <NavLink to="/registration" style={{ textAlign: "center" }}>
            Регистрация
          </NavLink>
        </div>
        <div className="text-center">
          <Button type="button" className="text-center" onClick={()=>SignIn(userEmail,userPassword)}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Authorize;
