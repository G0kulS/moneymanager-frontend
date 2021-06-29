import React, { useContext, useState } from "react";
import { Getdata } from "./Api";
import Profilecontext, { ProfileDetails } from "./Profilecontext";


export default function Filter()
 
{   let com = useContext(Profilecontext);
     let income = ["Any","Salary","Stock","Rent","Wage","Bonus","Others"] ; 
    let expense =["Any","Rent","Grocery","Travel","EMI","Outing","Others"];
    let mode = ["income","expense"];
    let [type,updatetype] = useState("Any");
    let [list,updatelist] = useState(...[income]);
    let [moneytype,updatemoneytype] = useState("income")
    let [from ,updatefrom] = useState("2021-06-01");
    let [to ,updateto] = useState("2021-12-31");
    let [arr,updatearr] = useState([]);
    
    return <div className="container-fluid">
    <div className="row gap" style={{marginTop:"3vh"}}>
        <div className="col-3">
         <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">Income/Expense :  </label>
          <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} required value={moneytype} onChange={
            (e)=>{
              updatemoneytype(e.target.value);
              if(e.target.value==="expense")
              {
                  updatelist(...[expense]);
              }
              else
              {
                  updatelist(...[income])
              }
            }
          }>
           {
               mode.map((i)=>{
                 return <option value={i}>{i}</option>
               })
           }
           </select>
      </div>
            </div>
            <div className="col-2">
            <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">Type :  </label>
          <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} required value={type} onChange={
            (e)=>{
              updatetype(e.target.value);
              
            }
          }>
           {
            list.map((i)=>{
                 return <option value={i}>{i}</option>
               })
           }
           </select>
      </div>
         </div>
         <div className="col-1 ">
             From date
         </div>
            <div className="col-2">     
    <input type="date" className="form-control" id="exampleFormControlInput1" value={from} onChange={
        (e)=>{
            updatefrom(e.target.value);
        }
    } required/>
   
            </div>
            <div className="col-1">
             &nbsp;&nbsp;&nbsp;To date 
         </div>
            <div className="col-2">
           
    <input type="date" className="form-control" id="exampleFormControlInput1" value={to} onChange={
        (e)=>{
            updateto(e.target.value);
        }
    } required/>
   
            </div>
            <div className="col-1">
             <button className="btn bg-success" type="button" onClick={
                async()=>{
                    let fromyear =  parseInt(from.substring(0,4));
                    let frommonth = parseInt(from.substring(5,7));
                    let fromdate = parseInt(from.substring(8,10));
                    let toyear =  parseInt(to.substring(0,4));
                    let tomonth = parseInt(to.substring(5,7));
                    let todate = parseInt(to.substring(8,10));
                    let obj = {
                        fromdate:fromdate,
                        frommonth:frommonth,
                        fromyear:fromyear,
                        todate:todate,
                        tomonth:tomonth,
                        toyear:toyear,
                        mode:moneytype,
                        type:type,
                        userid:window.localStorage.getItem("userid")
                    }
                   let result = await Getdata(obj);
                   console.log(result.data)
                   let temp = result.data;
                   updatearr(...[temp]);
                   
                 }
             }>Search</button>
         </div>
                  
        </div>
        <div className="row">
            <div style={{overflow:"auto"}}>
            <div className="col-12 bg-success middlebar">
                Result 
            </div>
        </div>
        <div className="row">
        <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Income/Expense</th>
      <th scope="col">Type</th>
      <th scope="col">Date</th>
      <th scope="col">Amount</th>
    </tr>
  </thead>
  <tbody>
    {
    arr.length==0?<tr><td colspan="5">No data available</td></tr>:arr.map((i,index)=>{
      
      return <tr>
        <td>{index+1}</td>
        <td>{i.mode.charAt(0).toUpperCase() + i.mode.slice(1)}</td>
        <td>{i.type}</td>
        <td>{i.date+"-"+i.month+"-"+i.year}</td>
        <td>{i.amount}</td>
      </tr>
    })
   } 
  </tbody>
</table>
              </div>
            </div>
        </div>
}