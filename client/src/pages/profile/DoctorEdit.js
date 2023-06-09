import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useDoctor, useUpdateDoctor } from '../../hooks/useDoctors';
import axios from 'axios';
const DoctorEdit = () => {
    const { id } = useParams();
    const { doctor, isLoading } = useDoctor(id);
    const { register, handleSubmit, formState: { errors } } = useForm();
     const updateDoctorMutation = useUpdateDoctor(id);
     const { mutate, isError, error } = updateDoctorMutation;
     console.log(error);

    const fileInputRef = useRef(null);

    const submitForm = async (data) => {
        const updatedDoctor = {
            firstName: data.firstName,
            lastName: data.lastName,
            specialty: data.specialty,
            degree: data.degree,
            bio: data.bio,
            profilePicture: fileInputRef.current.files[0],
        }
        console.log(updatedDoctor);
        mutate(updatedDoctor);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <form className='mt-20 shadow-lg w-3/5 p-16' onSubmit={handleSubmit(submitForm)}
            encType='multipart/form-data'
        >
            <div className="mb-4 self-center">
                <label htmlFor="profilePictureInput" className="w-60 h-60 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center cursor-pointer">
                    {doctor.profilePicture ? (
                        <img
                            src={process.env.PUBLIC_URL + '/uploads/' + doctor.profilePicture}
                            alt="Doctor Profile"
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
                    defaultValue={doctor.firstName}
                    {...register('firstName', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.firstName && <span className="text-red-500">First Name is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Last Name:</label>
                <input
                    type="text"
                    defaultValue={doctor.lastName}
                    {...register('lastName', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.lastName && <span className="text-red-500">Last Name is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Specialty:</label>
                <input
                    type="text"
                    defaultValue={doctor.specialty}
                    {...register('specialty', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.specialty && <span className="text-red-500">Specialty is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Degree:</label>
                <input
                    type="text"
                    defaultValue={doctor.degree}
                    {...register('degree', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.degree && <span className="text-red-500">Degree is required</span>}
            </div>
            <div className="mb-4">
                <label className="block">Bio:</label>
                <textarea
                    defaultValue={doctor.bio}
                    {...register('bio', { required: true })}
                    className="border border-gray-300 px-4 py-2 rounded-md w-full"
                />
                {errors.bio && <span className="text-red-500">Bio is required</span>}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update
            </button>
        </form>
    );
};

export default DoctorEdit;
