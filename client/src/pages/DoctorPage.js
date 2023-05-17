import React, { useState } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import { useDoctorFilters } from '../hooks/useDoctorsFilter';
import './styles/DoctorPage.css'; // import the CSS file

const DoctorPage = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');

    const { doctors, error: doctorsError, isLoading: doctorsLoading } = useDoctors();
    const filteredDoctors = useDoctorFilters(doctors, nameFilter, specialtyFilter);

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value);
    };

    const handleSpecialtyFilterChange = (event) => {
        setSpecialtyFilter(event.target.value);
    };

    if (doctorsLoading) {
        return (
            <h1>Loading..</h1>
        )
    }

    console.log("doctors: " + doctors)
    console.log("filteredDoctors: " + filteredDoctors)



    return (
        <div className="wrapper"> 
            <div className="filter">
                <div className="filter-item"> 
                    <label htmlFor="name-filter">Name</label> 
                    <input
                        id="name-filter"
                        type="text"
                        placeholder="Search by Name"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                    />
                </div>
                <div className="filter-item">
                    <label htmlFor="specialty-filter">Specialty</label> 
                    <input
                        id="specialty-filter" 
                        type="text"
                        placeholder="Search by Specialty"
                        value={specialtyFilter}
                        onChange={handleSpecialtyFilterChange}
                    />
                </div>
            </div>

            <div className="doctors"> 
                {(filteredDoctors && filteredDoctors.map((doctor) => (
                    <div className="doctor" key={doctor._id}>
                        <h3 className="Name"> {`${doctor.firstName} ${doctor.lastName}`}</h3>
                        <h5 className="specialty">{doctor.specialty}</h5>
                    </div>
                ))
                )}
            </div>
        </div>
    );
};

export default DoctorPage;
