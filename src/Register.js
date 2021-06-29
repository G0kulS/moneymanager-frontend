import React, { useState } from  "react" ; 
import { useHistory } from "react-router-dom";
import { Register } from "./Api";

export default function Registry()
{   
    let history = useHistory();
    let [type,updatetype] = useState("password");
    let [name,updatename] = useState("");
    let [password,updatepassword] = useState("");
    let [cpassword,updatecpassword] = useState("");
    let [email,updateemail] = useState("");
    let [message,updatemessage] = useState("");
    
    return <div className="frontpage">
          <div className="container-fluid">
          <div className="row">
            <div className="col-12 topbar bg-success ">
            <span style={{fontSize:"5vh"}}><h2>Welcome to Money Manager</h2></span>
            </div>
        </div>
              <div className="row">
              <div className="offset-4 col-4">
                  <form style={{marginTop:"5vh"}} onSubmit={
                      async (e)=>{
                          e.preventDefault();
                          if(password===cpassword)
                          {
                           let obj = {
                             name:name,
                             email:email,
                             password:password,
                             income : [],
                             expense:[],
                             balance : 0 ,
                             totalincome:0,
                             totalexpense:0,
                             last10:[]  
                           }   
                          let result = await Register(obj); 
                          updatemessage(result.data.message);
                          updatename("");
                          updateemail("");
                          updatecpassword("");
                          updatepassword("")
                         }
                         else
                         {
                          updatemessage("password must be identical");
                          updatename("");
                          updateemail("");
                          updatecpassword("");
                          updatepassword("") 
                         }
                      }
                  }>
              <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Name :</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" minLength="5" required value={name} onChange={
      (e)=>{
          updatename(e.target.value);
      }
  }/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address :</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} required onChange={
      (e)=>{
          updateemail(e.target.value);
      }
  }/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password :</label>
  <input type={type} class="form-control" id="exampleFormControlInput1" required minLength="8" value={password} onChange={
      (e)=>{
          updatepassword(e.target.value);
      }
  }/>
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Confirm Password :</label>
  <input type={type} class="form-control" id="exampleFormControlInput1" required minLength="8" value={cpassword} onChange={
      (e)=>{
          updatecpassword(e.target.value);
      }
  }/>
</div>
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onChange={
      ()=>{
          if(type=="password")
          {
              updatetype("text")
          }
          else
          {
              updatetype("password");
          }
      }
  }/>
  <label class="form-check-label" for="flexCheckDefault">
    Show password
  </label>
</div><br/>
<button className="btn btn-success" type="submit">Register</button>&nbsp;&nbsp;<button type="button" className="btn btn-success" onClick={
    ()=>{
       history.push("/")
    }
}>Back</button>
</form><br/>
<div style={{color:"green"}}>{message}</div>
              </div>
              </div>
              </div>
         </div>
}