import { useState, useEffect } from 'react';

export const useDoctorFilters = (doctors, nameFilter, specialtyFilter) => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);

  useEffect(() => {
    if (!doctors) return;
    let filteredDoctors = doctors.filter(doctor => {
      if (nameFilter && !doctor.firstName.toLowerCase().includes(nameFilter.toLowerCase())) {
        return false;
      }
      if (specialtyFilter && !doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())) {
        return false;
      }
      return true;
    });
    setFilteredDoctors(filteredDoctors);
  }, [doctors, nameFilter, specialtyFilter]);

  return filteredDoctors;
};
