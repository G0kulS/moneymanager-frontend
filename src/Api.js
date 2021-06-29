import React from "react";
import  axios from "axios";

export function Register(data)
{
    return axios.post("https://moneymanager-server.herokuapp.com/register",data);
} 

export function Login(data)
{
    return axios.post("https://moneymanager-server.herokuapp.com/login",data);
}
export function Email(data)
{
    return axios.post("https://moneymanager-server.herokuapp.com/email",data);
}
export function Changepassword(id,data)
{
    return axios.put(`https://moneymanager-server.herokuapp.com/changepassword/${id}`,data)
}
export function Addincome(data)
{
    return axios.post("https://moneymanager-server.herokuapp.com/addincome",data,{
        headers:{ authorization:window.localStorage.getItem("token")}
    })
}
export function Addexpense(data)
{
    return axios.post("https://moneymanager-server.herokuapp.com/addexpense",data,{
        headers:{ authorization:window.localStorage.getItem("token")}
    })
}
export function Getprofile(id)
{
    return axios.get(`https://moneymanager-server.herokuapp.com/getprofile/${id}`,{
        headers:{ authorization:window.localStorage.getItem("token")}
    })
}
export function Getdata(data)
{
    return axios.post(`https://moneymanager-server.herokuapp.com/getdata`,data,{
        headers:{ authorization:window.localStorage.getItem("token")}
    })
}
export function Delete(data)
{
    return axios.post(`https://moneymanager-server.herokuapp.com/delete`,data,{
        headers:{ authorization:window.localStorage.getItem("token")}
    })
}
export function Changename(data,id)
{
    return axios.put(`https://moneymanager-server.herokuapp.com/changename/${id}`,data,{
        headers:{ authorization:window.localStorage.getItem("token")}
    })
}