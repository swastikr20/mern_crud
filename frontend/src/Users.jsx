/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Users(){
    const [users,setUsers]=useState([])
    // const user=[];

    useEffect(()=>{
        axios.get('http://localhost:3001')
        .then(result=> {
            setUsers(result.data)
            console.log(result.data)
        })
        .catch(err=>console.log(err))
    },[]);

    const handleDelete = async (user) => {
        try {
            await axios.delete(`http://localhost:3001/deleteUser/${user._id}`);
            // Remove the deleted user from the state
            setUsers(users.filter(u => u._id !== user._id));
            console.log("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add + </Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(  (users)=>
                                <tr>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.age}</td>
                                    <td>
                                        <Link to={`/update/${users._id}`} className="btn btn-success">Update</Link>
                                        <button className="btn btn-danger" onClick={()=>handleDelete(users)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;