import { useState, useEffect, useCallback } from 'react';
import { SkillPath } from '@/libs/types';
import { useAppContext } from '@/context/AppContext';

const DEFAULT_NUM_SETS = 3;

export const useSkillPathProgressData = () => {
    const [muscleDataState, setMuscleDataState] = useState<MuscleData[]>([]);
    const { data, refetch: refetchProgramData } = useProgramData();
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const { day, user } = useAppContext();

    const refetchMuscleData = useCallback(async () => {
        if (!user?.id) {
            // Wait for user.id to be available
            return;
        }
        try {
            await refetchProgramData(); // Refetch program data
            setShouldRefetch(true); // Set flag to refetch muscle data
            console.log("Refetching muscle data...");
        } catch (err) {
            console.error("An unexpected error occurred while refetching program data:", err);
            // Optionally, handle the error further, such as showing a notification to the user
        }
    }, [refetchProgramData, user?.id]);


    useEffect(() => {
        if (data && user?.id) {
            setShouldRefetch(true); // Initial data fetch
        }
    } , [data, user?.id]);

    useEffect(() => {
        if (shouldRefetch && data) {
            try {
                const muscleData = data.reduce((acc: MuscleData[], curr: any) => {
                    const muscle = acc.find((m) => m.muscle_name === curr.muscle_name);
                    if (muscle) {
                        muscle.num_exercises += 1;
                        muscle.num_sets += DEFAULT_NUM_SETS;
                        muscle.recovery_days = curr.days;
                        muscle.day_of_week = curr.day_of_week;
                        muscle.template_name = curr.template_name;
                    } else {
                        acc.push({
                            id: curr.muscle_id,
                            muscle_name: curr.muscle_name,
                            num_exercises: 1,
                            num_sets: DEFAULT_NUM_SETS,
                            recovery_days: curr.days,
                            day_of_week: curr.day_of_week,
                            template_name: curr.template_name,
                        });
                    }
                    return acc;
                }, []);

                setMuscleDataState(muscleData);
                setShouldRefetch(false); // Reset the flag
            } catch (err) {
                console.error("An unexpected error occurred while processing muscle data:", err);
                // Optionally, handle the error further, such as showing a notification to the user
            }
        }
    }, [shouldRefetch, data, day]);


    useEffect(() => {
        if (data) {
            setShouldRefetch(true); // Initial data fetch
        }
    }, [data]);

    return { muscleDataState, setMuscleDataState, refetchMuscleData };
};


// Use supabase get the user's progress for a given SkillPath. This will be used to save the user's progress.and fetched in progress-overview page