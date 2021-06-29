import React, { useContext, useEffect } from "react";
import { Getprofile } from "./Api";
import Profilecontext from "./Profilecontext";
export default function Homepage()
{   
   let com = useContext(Profilecontext);
    useEffect(async()=>{
      let result = await Getprofile(window.localStorage.getItem("userid"));
      com.updateuserprofile(result.data);
      com.updatebalance(result.data.balance);
      com.updatetotalincome(result.data.totalincome);
      com.updatetotalexpense(result.data.totalexpense);
      com.updatelast10(result.data.last10);

    },[])
    return <div className="container-fluid">
        <div className="row gap">
            <div className="col-4">
            <div class="card">
             <div class="card-body">
              Total income :&#x20b9; {com.totalincome}
             </div>
               </div>
                </div>
                <div className="col-4">
            <div class="card">
             <div class="card-body">
              Total Expense :&#x20b9; {com.totalexpense}
             </div>
               </div>
                </div>
                <div className="col-4">
            <div class="card">
             <div class="card-body">
              Balance :&#x20b9; {com.balance}
             </div>
               </div>
                </div>
            </div>
            <div className="row col-12 heading">
              Last 10 transactions :
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
    com.last10.map((i,index)=>{
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
}