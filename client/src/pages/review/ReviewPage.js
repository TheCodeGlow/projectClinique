import React, { useState, useEffect } from 'react';
import { useCreateFeedback } from '../../hooks/useFeedback';
import useAuth from '../../hooks/useAuth';
import { FaStar } from 'react-icons/fa';
import { useDoctors } from '../../hooks/useDoctors';

const ReviewPage = () => {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const { user } = useAuth();
    const { doctors, isLoading: doctorLoading } = useDoctors();

    const { mutate: createFeedback, isLoading, isSuccess, error } = useCreateFeedback();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({ title, rating, content, patient: user._id, doctor: e.target.doctor.value });
        createFeedback({ title, rating, content, patient: user.patient, doctor: e.target.doctor.value });
    };
    if (doctorLoading) {
        return (
            <div className="self-center mx-auto mt-8 shadow-lg shadow-blue rounded-lg p-20 ">
                <h1 className="text-4xl font-bold">Loading...</h1>
            </div>
        )
    }

    return (
        <div className="w-3/4 mx-auto mt-8 shadow-lg shadow-blue rounded-lg p-20 ">
            <h1 className="text-4xl font-bold">Leave a Review</h1>
            <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="mb-4">
                    <label htmlFor="doctor" className="block text-gray-500 font-bold text-xl mb-2">
                        Doctor
                    </label>
                    <select
                        id="doctor"
                        className="border-gray-300 text-gray-500 text-lg font-semibold focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                        required
                    >
                        <option className='text-gray-500 text-lg font-semibold' value="">Select a doctor</option>
                        {doctors &&
                            doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor._id} className='text-gray-500 text-lg font-semibold'>
                                    {doctor.firstName} {doctor.lastName}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-500 font-bold text-xl mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="rating" className="block text-gray-500 font-bold text-xl mb-2">
                        Rating
                    </label>
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <FaStar
                                key={value}
                                className={`h-6 w-6 text-gray-400 cursor-pointer transition-colors duration-300 ${value <= rating ? 'text-yellow-500' : ''
                                    }`}
                                onClick={() => setRating(value)}
                            />
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-500 font-bold text-xl mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full p-2 rounded-md shadow-sm"
                        rows={4}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                {isSuccess && (
                    <p className="text-green-600 mt-2">Review submitted successfully!</p>
                )}
                {error && <p className="text-red-600 mt-2">Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default ReviewPage;
