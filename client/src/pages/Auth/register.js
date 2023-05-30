import React, { useState } from "react";

function FormContainer() {
    // using one state hook to store the form data as an object
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
    });

    // handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // sending the form data to a server or doing some validation here
        console.log(formData);
    };

    // handling the input change for any field
    const handleChange = (e) => {
        // updating the state with the new value for the field
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
