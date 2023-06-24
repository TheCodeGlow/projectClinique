import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { usePatient, useUpdatePatient } from '../../hooks/usePatients';


const PatientEdit = () => {
    const { id } = useParams();
    const { patient, isLoading } = usePatient(id);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const updatePatientMutation = useUpdatePatient(id);
    const { mutate, isError, error } = updatePatientMutation;
    console.log(error);

    const fileInputRef = useRef(null);

    const submitForm = async (data) => {
        const updatedPatient = {
            firstName: data.firstName,
            lastName: data.lastName,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            weight: data.weight,
            height: data.height,
            profilePicture: fileInputRef.current.files[0],
        }
        mutate(updatedPatient);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <form className='mt-20 shadow-lg w-3/5 p-16 self-center' onSubmit={handleSubmit(submitForm)}
            encType='multipart/form-data'
        >
            <div className="mb-4 self-center">
                <label htmlFor="profilePictureInput" className="w-60 h-60 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer">
                    {patient.profilePicture ? (
                        <img
                            src={process.env.PUBLIC_URL + '/uploads/' + patient.profilePicture}
                            alt="Patient Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <svg
                            className="w-6 h-6 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    )}
                </label>
                <input id="profilePictureInput" type="file" ref={fileInputRef} className="hidden" />
                {errors.profilePicture && <span className="text-red-500">Profile Picture is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">First Name:</label>
                <input
                    type="text"
                    defaultValue={patient.firstName}
                    {...register('firstName', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.firstName && <span className="text-red-500">First Name is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Last Name:</label>
                <input
                    type="text"
                    defaultValue={patient.lastName}
                    {...register('lastName', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.lastName && <span className="text-red-500">Last Name is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Date of Birth:</label>
                <input
                    type="date"
                    defaultValue={new Date(patient.dateOfBirth).toISOString().substring(0, 10)}
                    {...register('dateOfBirth', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.dateOfBirth && <span className="text-red-500">Date of Birth is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Gender:</label>
                <select
                    defaultValue={patient.gender}
                    {...register('gender', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <span className="text-red-500">Gender is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Phone:</label>
                <input
                    type="text"
                    defaultValue={patient.phone}
                    {...register('phone', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.phone && <span className="text-red-500">Phone is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Address:</label>
                <input
                    type="text"
                    defaultValue={patient.address}
                    {...register('address', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.address && <span className="text-red-500">Address is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Weight(kg):</label>
                <input
                    type="number"
                    defaultValue={patient.weight}
                    {...register('weight', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.weight && <span className="text-red-500">Weight is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Height(cm):</label>
                <input
                    type="number"
                    defaultValue={patient.height}
                    {...register('height', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.height && <span className="text-red-500">Height is required</span>}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update
            </button>
        </form>
    );
};

export default PatientEdit;
