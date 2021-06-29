import React, { useState } from "react" ; 
import { useHistory } from "react-router-dom";
import { Email } from "./Api";

export default function Forgetpassword()
{   
    let history = useHistory(); 
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
                     <form style={{marginTop:"30vh"}} onSubmit={
                         async(e)=>{
                             e.preventDefault();
                             let obj ={
                               email : email
                             }
                             let result = await Email(obj);
                             if(result.data.sent==true)
                             {  
                                updatemessage(result.data.message);
                                updateemail("")
                             }
                             else
                             {
                                updatemessage(result.data.message);
                                updateemail("");
                             }
                             
                         }
                     }>
                 <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} required onChange={
      (e)=>{
         updateemail(e.target.value);
      }
  }/ >
      </div>
   <button className="btn btn-success" type="submit">Send mail</button>&nbsp;&nbsp;<button type="button" className="btn btn-success" onClick={
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