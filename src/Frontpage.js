import React,{useEffect, useState} from "react" ; 
import {Link, useHistory} from "react-router-dom";
import { Login } from "./Api";
export default function Frontpage()
{  let [email,udpateemail] = useState("");
   let [password,updatepassword] = useState("");
   let [type ,updatetype] = useState("password") 
   let [message,updatemessage] = useState("");
   let history = useHistory(); 

   useEffect(()=>{
       if(window.localStorage.getItem("token")!=undefined && window.localStorage.getItem("userid")!=undefined )
       {
         history.push("/home");
       }
   },[])

    return<div className="frontpage"> 
         <div className="container-fluid">
        <div className="row">
            <div className="col-12 topbar bg-success ">
            <span style={{fontSize:"5vh"}}><h2>Welcome to Money Manager</h2></span>
            </div>
        </div>
        <div className="row">
            <div className ="offset-4 col-4">
           <form style={{marginTop:"15vh"}} onSubmit={
               async(e)=>{
                     e.preventDefault();
                     let obj = {
                         email:email,
                         password:password
                     }
                     let result = await Login(obj);
                     if(result.data.message=="Allowed")
                     {
                     updatemessage(result.data.message);
                     window.localStorage.setItem("token",result.data.token);
                     window.localStorage.setItem("userid",result.data.userid);
                     updatepassword("");
                     udpateemail("");
                     history.push("/home");
                    }
                     else
                     {
                         updatemessage(result.data.message);
                         updatepassword("");
                         udpateemail("");
                     }
               }
           }
           > <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required value={email} onChange={
      (e)=>{
          udpateemail(e.target.value);
      }
  }/>
   </div>
   <div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Password</label>
  <input type={type} class="form-control" id="exampleFormControlInput1" required minLength="8" value={password} onChange={
      (e)=>{
          updatepassword(e.target.value);
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
</div>
<div>

</div><br/>
<button className="btn btn-success" type="submit">Login</button>
  </form><br/>
  <Link to="/forgetpassword"><span>Forgot password</span></Link>&nbsp;&nbsp;<Link to="/register"><span>Register</span></Link><br/>
  <br/> <div style={{color:"green"}}>{message}</div>
            </div>
            </div>
        </div></div>
}