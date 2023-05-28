import { useMutation, useQueryClient } from 'react-query';
import {useState} from 'react'

export const useSendMessageToPatient = () => {
    const queryClient = useQueryClient();

    const sendMessageToPatient = useMutation(async (message) => {
        try {
            // Simulate an API request to send the message to the patient
            await sendPatientMessageAPI(message);

            // Simulate a successful response
            return { success: true, message: 'Message sent successfully' };
        } catch (error) {
            // Handle any error that occurred during the API request
            throw new Error('Failed to send message');
        }
    }, {
        onSuccess: () => {
            // Invalidate relevant queries to fetch the updated data
            queryClient.invalidateQueries('messages');
            // Add more query invalidations if needed
        }
    });

    const sendPatientMessageAPI = (message) => {
        // Simulate an asynchronous API request
        return new Promise((resolve, reject) => {
            // Replace the following code with your actual API request or communication logic
            setTimeout(() => {
                const success = Math.random() < 0.8; // 80% chance of success
                if (success) {
                    resolve();
                } else {
                    reject();
                }
            }, 1000); // Simulate a delay of 1 second
        });
    };

    return sendMessageToPatient;
};

export const usePatientCommunication = () => {
    const [patientMessages, setPatientMessages] = useState([]);
    const queryClient = useQueryClient();

    const sendMessageToPatient = useMutation((message) => {
        // Send the message to the patient
        // Replace the following code with your actual API request or communication logic
        const newMessage = { id: generateMessageId(), patientId: message.patientId, message: message.message };
        setPatientMessages((prevMessages) => [...prevMessages, newMessage]);
    }, {
        onSuccess: () => {
            // Invalidate the messages query to fetch the updated data
            queryClient.invalidateQueries('messages');
        }
    });

    const generateMessageId = () => {
        // Generate a unique message ID (you can use a library or your own logic)
        // For simplicity, using a random number as the ID
        return Math.floor(Math.random() * 1000000);
    };

    return { patientMessages, sendMessageToPatient };
};