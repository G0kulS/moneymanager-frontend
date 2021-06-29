import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Changepassword } from "./Api";

export default function Resetpassword()
{ let [type,updatetype] = useState("password");
  let [password,udpatepassword] = useState("");
  let [cpassword,udpatecpassword] = useState("");
  let [message,updatemessage] = useState("");
  let {id} = useParams();
  let history = useHistory();
    return<div className="frontpage">
        <div className="container-fluid">
            <div className="row">
            <div className="row">
            <div className="col-12 topbar bg-success ">
            <span style={{fontSize:"5vh"}}><h2>Welcome to Money Manager</h2></span>
            </div>
        </div>
                <div className="offset-4 col-4">
                    <form style={{marginTop:"10vh"}} onSubmit={
                        async(e)=>{
                            e.preventDefault();
                            if(password==cpassword)
                            {   

                                let result = await Changepassword(id,{password:password});
                                updatemessage(result.data.message);
                                udpatepassword("");
                                udpatecpassword("");
                            }
                            else
                            {   updatemessage("password must be identical");
                                udpatepassword("");
                                udpatecpassword("");
                            }
                            
                        }
                    }>
                <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">New Password</label>
  <input type={type} class="form-control" id="exampleFormControlInput1" value={password} minLength="8" required onChange={
      (e)=>{
          udpatepassword(e.target.value)
      }
  } />
</div>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Confirm Password</label>
  <input type={type} class="form-control" id="exampleFormControlInput1" value={cpassword} minLength="8" required onChange={
      (e)=>{
          udpatecpassword(e.target.value)
      }
  } />
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
<button className="btn btn-success" type="submit">Save</button>&nbsp;&nbsp;<button type="button" className="btn btn-success" onClick={
    ()=>{
       history.push("/")
    }
}>Back</button>
 </form><br/>
 <div style={{color:"green"}}>
     {message}
     </div>
                </div>
                </div>
         </div>
        </div>
}
