import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'

import { useState, useContext, useEffect } from 'react'
import { WorkoutsContext } from '../App'

export default function Home(){

    const context = useContext(WorkoutsContext)

    console.log(context)

    useEffect(() => {
        const fetchWorkouts = async () => {
            fetch(import.meta.env.VITE_FETCH_URI)
                .then(res => res.json())
                .then(data => {console.log(data); context.dispatch({
                    type: "SET_WORKOUTS",
                    payload: data,
                })})
                .catch(err => console.log(err.message))            
        }
        fetchWorkouts()
    }, [])

    return (
        <div className="bg-gray-200 h-screen px-10 py-5 grid grid-cols-4">
            <div className='col-span-2'>
                {context.workouts && context.workouts.map(workout => {
                    return(
                        <WorkoutDetails key={workout._id} workout={workout}/>
                    )
                })}
            </div>
            <div className='col-span-1 col-start-4'>
                <WorkoutForm/>
            </div>
        </div>
    )
}