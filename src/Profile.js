import React, { useContext, useState } from "react";
import { Changename, Email } from "./Api";
import Profilecontext from "./Profilecontext";

export default function Profile()
{
    
    let com = useContext(Profilecontext);
    let [name,updatename] = useState(com.userprofile.name);
    let [message,udpatemessage] = useState("");
    let [message1,udpatemessage1] = useState("");
return <div className="container-fluid">
<div className="row">
<div className="offset-4 col-4">
    <form style={{marginTop:"5vh"}} 
    onSubmit={
        async(e)=>{
            e.preventDefault();
            let obj = 
            {
                name : name
            }
            let result = await Changename(obj,window.localStorage.getItem("userid"));
            if(result.data.message==="Changed")
            {
                udpatemessage("Name successfully Changed");
            }
        }
    }>
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address :</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" value={com.userprofile.email} disabled readonly/>
  </div>
  <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Name :</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" value={name} onChange={
      (e)=>{
          updatename(e.target.value);
      }
  }/>
  </div>
  <button className="btn btn-success" type="submit">Change name</button>
  </form><br/>
  <div style={{color:"green"}}>{message}</div><br/>
  <button className="btn btn-success" type="button" onClick={
      async()=>{
          let result = await Email({email:com.userprofile.email})
          udpatemessage1(result.data.message);
      }
  }>Change password</button>
  <br/><br/>
  <div style={{color:"green"}}>{message1}</div><br/>
</div>
</div>
</div>
}