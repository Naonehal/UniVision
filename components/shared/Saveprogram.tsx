// SaveProgram component
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { IProgram } from '@/lib/database/models/program.model';
import { saveProgramForUser, deleteSavedProgram, checkIfProgramIsSaved } from '@/lib/actions/save.actions';

const SaveProgram = ({ program, userId }: { program: IProgram, userId: string }) => {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Function to update the save status
        const updateSaveStatus = async () => {
            const savedStatus = await checkIfProgramIsSaved(userId, program._id);
            setIsSaved(savedStatus);
        };

        updateSaveStatus();
    }, [userId, program._id]);

    const handleSaveToggle = async () => {
        try {
            if (isSaved) {
                await deleteSavedProgram(userId, program._id); // Delete the saved program
            } else {
                await saveProgramForUser(userId, program._id); // Save the program
            }
            setIsSaved(!isSaved); // Toggle the save status
            // Further actions after save/unsave (e.g., show notification)
        } catch (error) {
            console.error(error);
        }
    };

    const buttonClass = `button sm:w-fit ${isSaved ? 'bg-green-500' : ''}`;

    return (
        <Button
            onClick={handleSaveToggle}
            size="lg"
            className={buttonClass}
        >
            {isSaved ? 'Saved' : 'Save Program'}
        </Button>
    );
};

export default SaveProgram;
