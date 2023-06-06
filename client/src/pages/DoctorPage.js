import React, { useEffect, useState } from 'react';
import { useDoctors } from '../hooks/useDoctors';
import { useDoctorFilters } from '../hooks/useDoctorsFilter';
import './styles/DoctorPage.css'; // import the CSS file

const DoctorPage = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('');

    const { doctors, error: doctorsError, isLoading: doctorsLoading } = useDoctors();
    const [filteredDoctors, setFilteredDoctors] = useState(doctors);
    const filter = useDoctorFilters(doctors, nameFilter, specialtyFilter);

    useEffect(() => {
        if (filter) {
            setFilteredDoctors(filter);
        }
    }, [filter]);

    const handleNameFilterChange = (event) => {
        setNameFilter(event.target.value);
    };

    const handleSpecialtyFilterChange = (event) => {
        setSpecialtyFilter(event.target.value);
    };

    if (doctorsLoading) {
        return <h1>Loading..</h1>;
    }


    return (
        <div className="doctor-page">
            <h1 className="page-label">Search Doctor, Make an appointment</h1>
            <h4 className="page-description">Discover the best doctors nearest to you.</h4>
            <hr />
            <div className="wrapper">
                <div className="filter">
                    <div className="filter-item">
                        <label htmlFor="name-filter">Name:</label>
                        <input
                            id="name-filter"
                            type="text"
                            placeholder="Search by Name"
                            value={nameFilter}
                            onChange={handleNameFilterChange}
                        />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="specialty-filter">Specialty:</label>
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
                    {filteredDoctors && filteredDoctors.length > 0 ? (
                        filteredDoctors.map((doctor) => (
                            <div
                                className="doctor available"
                                key={doctor._id}
                            >
                                <div class="doctor-info">
                                    <div className="doctor-image">
                                        <div className="doctor-status available"></div>
                                        <img
                                            src="https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=2000"
                                            alt="doctor"
                                            height="100"
                                            width="100"
                                        />
                                    </div>
                                    <div className="name-specialty">
                                        <h3 className="Name">{`${doctor.firstName} ${doctor.lastName}`}</h3>
                                        <label className="specialty">{doctor.specialty}</label>
                                    </div>
                                </div>
                                <vl></vl>
                                <div class="doctor-specs">
                                    <h3>Degree</h3>
                                    <p>{doctor.degree}</p>
                                    <h3>Specialty</h3>
                                    <p>{doctor.specialty}</p>
                                    <h3>Location</h3>
                                    <p>{doctor.address}</p>
                                    <p>Booking available Online</p>
                                </div>
                                <button
                                    className="view-profile-button"
                                    onClick={() => {
                                        window.location.href = `/doctor/${doctor._id}`;
                                    }}
                                >View Profile</button>
                            </div>
                        ))
                    ) : (
                        <p>No doctors found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorPage;
