/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/getUser/${id}`);
            const userData = response.data;
            if (!userData) {
                throw new Error("User data not found");
            }
            setName(userData.name);
            setEmail(userData.email);
            setAge(userData.age);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user:", error);
            setError(error);
            setLoading(false);
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/updateUser/${id}`,{name,email,age})
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Render loading message if data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="age">Age</label>
                        <input
                            type="text"
                            id="age"
                            placeholder="Enter Age"
                            className="form-control"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
