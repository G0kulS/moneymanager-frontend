import React, { useState } from "react";
import {Line,Bar} from "react-chartjs-2";
import {Getdata} from "./Api"
export default function Graph()
{ 
  let month = [
    'January',
    'February',
    'March',
    'April',"May","June","July","August","September","October","November","December"
         ]
  let income = ["Any","Salary","Stock","Rent","Wage","Bonus","Others"] ; 
  let expense =["Any","Rent","Grocery","Travel","EMI","Outing","Others"];
  let mode = ["","income","expense"];
  let [list1,updatelist1] = useState([]);
  let [list2,updatelist2] = useState([]);
  let [moneytype1,updatemoneytype1] = useState("");
  let [moneytype2,updatemoneytype2] = useState("");
  let [type1,updatetype1] = useState("Any");
  let [type2,updatetype2] = useState("Any");
  let [from,updatefrom] = useState("");
  let [to,updateto] = useState("");
  let [graph,updategraph] = useState("line")
  let [labels,updatelabels] = useState([
    'January',
    'February',
    'March',
    'April'
  ]);
  let [message,updatemessage] = useState("");
  let [data1,updatedata1] = useState([]);
  let [data2,updatedata2] = useState([]);
  const data = {
    labels: labels,
    datasets: [{
      type: graph,
      label: `${moneytype1}-${type1}`,
      data: data1,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)'
    }, {
      type: graph,
      label: `${moneytype2}-${type2}`,
      data: data2,
      fill: false,
      borderColor: 'rgb(54, 162, 235)'
    }]
  };

    return <div className="container-fluid">
        <div className="row">
        <div className="col-2"><br/>  
          <form onSubmit={
           async(e)=>{
              e.preventDefault();
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
                  mode:moneytype1,
                  type:type1,
                  userid:window.localStorage.getItem("userid")
              }
              let result = await Getdata(obj);
              let temp = result.data;
              console.log(temp);
              if(temp.length!=0)
              {
              let temp1 = returnlabel(fromyear,frommonth,toyear,tomonth,month)
              console.log(temp1)
              updatelabels(...[temp1])
              let t= graphdata(temp,temp1,obj);
              updatedata1(...[t]);
              updatemessage("");
              }
              else
              {
                updatemessage("No data Available for line 1")
              }
            }
          }>         
                <div className="mb-3">
           <div style={{color:"green"}}>Line 1:</div><br/>       
          <label for="exampleFormControlInput1" className="form-label">Income/Expense :  </label>
          <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} required value={moneytype1} onChange={
            (e)=>{
              updatemoneytype1(e.target.value);
              if(e.target.value==="expense")
              {
                  updatelist1(...[expense]);
              }
              if(e.target.value==="income")
              {
                  updatelist1(...[income])
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
      <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">Type :  </label>
          <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} required value={type1} onChange={
            (e)=>{
              updatetype1(e.target.value);
              
            }
          }>
           {
            list1.map((i)=>{
                 return <option value={i}>{i}</option>
               })
           }
           </select>
      </div>
      <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">From date :  </label>
      <input type="date" className="form-control" id="exampleFormControlInput1" value={from} onChange={
        (e)=>{
            updatefrom(e.target.value);
        }
    } required />
     </div>
     <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">To date :  </label>
      <input type="date" className="form-control" id="exampleFormControlInput1" value={to} onChange={
        (e)=>{
            updateto(e.target.value);
        }
    } required/>
     </div><br/>
     <button className="btn btn-success" type="submit">Show line 1</button>
      </form> </div>  
     <div className="col-2"><br/>
     <form onSubmit={
      async (e)=>{
         e.preventDefault();
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
                  mode:moneytype2,
                  type:type2,
                  userid:window.localStorage.getItem("userid")
              }
              let result = await Getdata(obj);
              let temp = result.data;
              console.log("line2",temp);
              if(temp.length!=0)
              {
              let temp1 = returnlabel(fromyear,frommonth,toyear,tomonth,month)
              console.log(temp1)
              updatelabels(...[temp1])
              let t= graphdata(temp,temp1,obj);
              updatedata2(...[t]);
              updatemessage("");
              }
              else
              {
                updatemessage("No data Available for line 2")
              }
       }
     }>
     <div className="mb-3">
           <div style={{color:"green"}}>Line 2</div>  <br/>     
          <label for="exampleFormControlInput1" className="form-label">Income/Expense :  </label>
          <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} required value={moneytype2} onChange={
            (e)=>{
              updatemoneytype2(e.target.value);
              if(e.target.value==="expense")
              {
                  updatelist2(...[expense]);
              }
              if(e.target.value==="income")
              {
                  updatelist2(...[income])
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
      <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">Type :  </label>
          <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} required value={type2} onChange={
            (e)=>{
              updatetype2(e.target.value);
              
            }
          }>
           {
            list2.map((i)=>{
                 return <option value={i}>{i}</option>
               })
           }
           </select>
      </div>
      <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">From date :  </label>
      <input type="date" className="form-control" id="exampleFormControlInput1" required value={from} onChange={
        (e)=>{
            updatefrom(e.target.value);
        }
    }/>
     </div>
     <div className="mb-3">
       <label for="exampleFormControlInput1" className="form-label">To date :  </label>
      <input type="date" className="form-control" id="exampleFormControlInput1" required value={to} onChange={
        (e)=>{
            updateto(e.target.value);
        }
    }/>
     </div><br/>
     <button className="btn btn-success" type="submit">Show line 2</button> 
     </form>
                
                </div>
            <div className="col-8">
                <Bar data={data}/>
                </div>
            </div><br/>
            <div className="row">
              <div className="col-4" style={{color:"green"}}>{message}</div>
              <div className="offset-1 col-3">
                Graph style : 
                <select name="type" id="type" className="form-label" style={{marginLeft:"2vw"}} value={graph} onChange={
                  (e)=>{
                    updategraph(e.target.value)
                  }
                } >
                <option value="line">Line</option>
                <option value="bar">Bar</option>
                </select>
                </div>
                </div>
        </div>
}

function returnlabel(fromyear,frommonth,toyear,tomonth,month)
{ 
  
  let result = [];
  if(toyear-fromyear===0)
  {
     if(tomonth-frommonth===0)
     {
        result.push(month[tomonth-1]);
     }
     else
     {
       result = result.concat(month.slice((frommonth-1),tomonth));
     }
  }
  else
  {
    result=result.concat(month.slice((frommonth-1),12));
    let i=fromyear+1
     for(;i<toyear;i++)
     {
       
       
       result.push(i);
       result=result.concat(month.slice(0,12))

     }
     result.push(i)
     result=result.concat(month.slice(0,tomonth))
      
  }
  return result;
}

function graphdata(data,lab,obj)
{
   let result = new Array(lab.length).fill(0,0,lab.length);
   let startmonth = obj.frommonth;
   let startyear = obj.fromyear;
   console.log(obj,startmonth,startyear,lab,result,lab.length);
   for(let i =0 ; i<data.length;i++)
   {
      if((data[i].year-startyear)===0)
      {
         result[data[i].month-startmonth]+=data[i].amount;
      }
      else
      {
         let add = 12 - startmonth;
         let difference = data[i].year - startyear;
         let total  = add + ((difference-1)*12) + difference + data[i].month;
         result[total]+=data[i].amount;
         console.log(add,difference,total);

      }
   }
    console.log(result);
    return result;
}