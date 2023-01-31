export default function WorkoutDetails({workout}){
    return (
        <div className="bg-white py-2 px-5 shadow-lg mb-5">
            <h4 className="font-bold text-xl text-green-800 mb-3 uppercase">{workout.title}</h4>
            <p className="my-1"><strong>Load (kg): </strong>{workout.load}</p>
            <p className="my-1"><strong>Reps: </strong>{workout.reps}</p>
            <p className="my-1">{workout.createdAt}</p>
        </div>
    )
}