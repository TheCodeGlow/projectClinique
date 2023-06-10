import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ChatEngine } from 'react-chat-engine';
import { ChatEngineWrapper, ChatEngineCore } from 'chat-engine';

function FormContainer() {
    const { register, registerError, isRegisterLoading, } = useAuth();
    // using one state hook to store the form data as an object
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        height: "",
        weight: "",
        phone: "",
        email: "",
        password: "",
    });
    // create new user in chatengine
    const createChatEngineUser = async (formData) => {
        const projectID = ' 05e8fe9c-bf36-496a-bf00-1c5bfd1daa81';
        const apiKey = '6b28863a-0809-402f-a801-ade24870c663';
        const username = formData.firstName + formData.lastName;
        const secret = formData.password;

        const chatEngine = ChatEngineCore.create({
            apiKey,
            projectID,
        });

        chatEngine.connect(
            {
                username,
                secret,
            },
            () => {
                console.log('ChatEngine connected');
            },
            (error) => {
                console.log('ChatEngine connection error:', error);
            }
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
        if (!isRegisterLoading && !registerError) {
            createChatEngineUser(formData);
            window.location.href = "/";
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="FormContainer">
            <h1>Patient Registration Form</h1>
            <p>Please fill in the following information</p>
            <form onSubmit={handleSubmit}>
                <div className="FormGroup">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange} // using the same handler for all fields
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        placeholder="Enter your date of birth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="FormGroup">
                    <label htmlFor="phone">Phone number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                //heigh and weight
                <div className="FormGroup">
                    <label htmlFor="height">Height</label>
                    <input
                        type="text"
                        id="height"
                        name="height"
                        placeholder="Enter your height"
                        value={formData.height}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="weight">Weight</label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        placeholder="Enter your weight"
                        value={formData.weight}
                        onChange={handleChange}
                    />
                </div>
                <div className="FormGroup">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                By registering, you agree to the Terms of Service and Privacy Policy.
            </p>
        </div>
    );
}

export default FormContainer;
