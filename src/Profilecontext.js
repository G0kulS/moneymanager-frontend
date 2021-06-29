import React, { useState }  from "react";

const Profilecontext = React.createContext();

export default Profilecontext;

export const ProfileDetails =   ({children}) => {
    let[balance,updatebalance] = useState(0);
    let[totalincome,updatetotalincome] = useState(0);
    let[totalexpense,updatetotalexpense] = useState(0);
    let[curmonthinc,updatecurmoninc] = useState(0);
    let[userprofile,updateuserprofile] = useState("");
    let[last10,updatelast10] = useState([]);
    let[filtertotal,updatefiltertotal] = useState(0);
   
    return <Profilecontext.Provider value = {{filtertotal,updatefiltertotal,last10,updatelast10,balance,updatebalance,totalincome,updatetotalincome,totalexpense,updatetotalexpense,curmonthinc,updatecurmoninc,userprofile,updateuserprofile}}>{children}</Profilecontext.Provider>
}