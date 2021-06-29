import {
    BrowserRouter as Router, 
    Route,Switch,Link, useHistory} from "react-router-dom";
import Homepage from "./Homepage";
import React, { useContext, useState } from "react";
import {Modal,Button} from "react-bootstrap";
import Graph from "./Graph"
import Profile from "./Profile";
import { Addincome,Addexpense} from "./Api";
import Profilecontext, { ProfileDetails } from "./Profilecontext";
import Filter from "./Filter";
import Edit from "./Edit";
export default function Home()
{    
  
  let history = useHistory();
  const [modalShow, setModalShow] = useState(false);
    return <Router>
            <button className="btn btn-success btn-circle btn-xl"  onClick={() => setModalShow(true)}>+</button>
            
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    
              <div className="container-fluid">
           <div className="row">
               <div className="col-12 topbar bg-success">
                   <h2>Welcome to Money Manager</h2>
                </div></div>
                <div className="row">
               <div className="col-1 sidebar bg-success">
              <Link to="/home"><button type="button" className="btn btn-success sidebarbutton"><i class="fas fa-h-square fa-2x"></i></button></Link>
              <Link to="filter"> <button type="button" className="btn btn-success sidebarbutton"><i class="fas fa-funnel-dollar fa-2x"></i></button></Link> 
              <Link to="/graph"><button type="button" className="btn btn-success sidebarbutton"><i class="fas fa-chart-line fa-2x"></i></button></Link>
              <Link to="/edit">  <button type="button" className="btn btn-success sidebarbutton"><i class="far fa-edit fa-2x"></i></button></Link>
              <Link to="/profile"> <button type="button" className="btn btn-success sidebarbutton"><i class="far fa-id-badge fa-2x"></i></button></Link>
                <button type="button" className="btn btn-success sidebarbutton" onClick={
                  ()=>{
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("userid");
                    history.push("/");
                  }
                }><i class="fas fa-sign-out-alt fa-2x"></i></button>
                </div>
                <div className="col-11">
                  <div className="container-fluid">
                    <div className="row">
                <Switch>
                        <Route path="/home" exact="true">
                        <Homepage></Homepage>
                        </Route>
                        <Route path="/graph" exact="true">
                        <Graph></Graph>
                        </Route>
                        <Route path="/profile" exact="true">
                        <Profile></Profile>
                        </Route>
                        <Route path="/filter" exact="true">
                       <Filter></Filter>
                        </Route>
                        <Route path="/edit" exact="true">
                        <Edit></Edit>
                        </Route>
               </Switch>
               </div>
               </div>
               </div>
               </div>
        </div>
        </Router>
}
function MyVerticallyCenteredModal(props) {
   let com = useContext(Profilecontext);
    let [incbtn,updateincbtn] = useState("btn btn-secondary");
    let [expbtn,updateexpbtn] = useState("btn btn-secondary");
    let income = ["Salary","Stock","Rent","Wage","Bonus","Others"] ; 
    let expense =["Rent","Grocery","Travel","EMI","Outing","Others"];
    let [moneytype,updatemoneytype] = useState("Salary");
    let [List,updatelist] = useState([...income]);
    let [type,udpatetype] = useState("Income Type");
    let [message,updatemessage] = useState("");
    let [amount,udpateamount] = useState(0);
    let [date,updatedate] = useState("");
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Button type="button" className={incbtn} style={{marginRight:"4vw"}} onClick={
                ()=>{
                    updateincbtn("btn btn-success");
                    updateexpbtn("btn btn-secondary");
                    updatelist([...income]);
                    udpatetype("Income Type");
                    updatemoneytype("Salary");
                    updatemessage("");
                }
            }>Income</Button><Button type="button" className={expbtn} onClick={
                ()=>{
                    updateincbtn("btn btn-secondary");
                    updateexpbtn("btn btn-success");
                    updatelist([...expense]);
                    udpatetype("Expense Type")
                    updatemoneytype("Rent");
                    updatemessage("");
                }
            }>Expense</Button>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={
            async(e)=>{
                
                e.preventDefault();
                if(type==="Income Type")
                {
                let obj={
                  userid: window.localStorage.getItem("userid"),
                  mode :"income",
                  type: moneytype,
                  amount:amount,
                  year:  parseInt(date.substring(0,4)),
                  month: parseInt(date.substring(5,7)),
                  date: parseInt(date.substring(8,10))
                }
                let result = await Addincome(obj);
                com.updatetotalincome(com.totalincome+amount);
                com.updatebalance(com.balance+amount);
                let temp = com.last10;
    if(com.last10.length<10)
    {
      
      temp.push(obj);
      com.updatelast10(...[temp]);
    }
    else
    {
       temp.shift();
       temp.push(obj);
       com.updatelast10(...[temp])
    }
                if(result.data.message=="Added")
                {
                  updatemoneytype("Salary");
                  udpateamount(0);
                  updatedate("");
                  updatemessage(result.data.message);
                }
              }
              else
              {
                let obj={
                  userid: window.localStorage.getItem("userid"),
                  mode :"expense",
                  type: moneytype,
                  amount:amount,
                  year:  parseInt(date.substring(0,4)),
                  month: parseInt(date.substring(5,7)),
                  date: parseInt(date.substring(8,10))
                }
                let result = await Addexpense(obj);
                com.updatetotalexpense(com.totalexpense+amount);
                com.updatebalance(com.balance-amount);
                let temp = com.last10;
    if(com.last10.length<10)
    {
      
      temp.push(obj);
      com.updatelast10(...[temp]);
    }
    else
    {
       temp.shift();
       temp.push(obj);
       com.updatelast10(...[temp])
    }
                if(result.data.message=="Added")
                {
                  updatemoneytype("Rent");
                  udpateamount(0);
                  updatedate("");
                  updatemessage(result.data.message);
                }
              }
            }
        }>
        <Modal.Body>
        <div class="mb-3">
       <label for="exampleFormControlInput1" class="form-label">Date :</label>
       <input type="date" class="form-control" id="exampleFormControlInput1" required value={date} onChange={
         (e)=>{
           updatedate(e.target.value);
           updatemessage("");
         }
       }/>
      </div>
      <div class="mb-3">
       <label for="exampleFormControlInput1" class="form-label">{type} :  </label>
          <select name="type" id="type" class="form-label" style={{marginLeft:"2vw"}} required value={moneytype} onChange={
            (e)=>{
              updatemoneytype(e.target.value);
            }
          }>
           {
               List.map((i)=>{
                 return <option value={i}>{i}</option>
               })
           }
           </select>
      </div>
      <div class="mb-3">
       <label for="exampleFormControlInput1" class="form-label">Amount</label>
       <input type="number" class="form-control" id="exampleFormControlInput1" required value={amount} onChange={
         (e)=>{
           
           udpateamount(+(e.target.value));
         }
       }/>
      </div>
        </Modal.Body>
        <Modal.Footer>
        <div style={{color:"green"}}>{message}</div>  <Button type="submit" className="btn btn-success">Save</Button><Button className="btn btn-success" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
        </form>
      </Modal>
    );
  }

 