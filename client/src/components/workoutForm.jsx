import {useState ,useContext,  useEffect} from 'react'
import { WorkoutsContext } from '../App'


export default function WorkoutForm(){

    const [formData, setFormData] = useState({
        title: '',
        load: '',
        reps: '',
    })

    const context = useContext(WorkoutsContext)

    const [error, setError] = useState(null)
    const [empty, setEmpty] = useState([])

    function handleChange(e){
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name] : value,
        }))
    }

    async function submitForm(e){
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_FETCH_URI, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        console.log(json)
        if(!response.ok){
            setError(json.error)
            setEmpty(json.empty)
        }
        if(response.ok){
            setFormData({
                title: '',
                reps: '',
                load: ''
            })
            setError(null)
            console.log(json)
            context.dispatch({
                type: 'CREATE_WORKOUT',
                payload: json,
            })
            setEmpty([])
        }
    }
    return (
        <form className='font-bold' onSubmit={submitForm}>
            <label htmlFor="title">Exercise Title:</label>
            <input 
                type="text" 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className = {empty.includes('title') ? 'border-2 border-red-400 block w-full p-1 my-2': 'block w-full p-1 my-2'}
            />

            <label htmlFor="reps">Reps:</label>
            <input
                type="text" 
                id="reps"
                name="reps"
                value={formData.reps}
                onChange={handleChange}
                className = {empty.includes('reps') ? 'border-2 border-red-400 block w-full p-1 my-2': 'block w-full p-1 my-2'}
            />

            <label htmlFor="load">Load (kg):</label>
            <input 
                type="number" 
                id="load"
                name="load"
                value={formData.load}
                onChange={handleChange}
                className = {empty.includes('load') ? 'border-2 border-red-400 block w-full p-1 my-2': 'block w-full p-1 my-2'}
            />

            <button className="bg-teal-600 rounded cursor-pointer hover:bg-teal-800 text-white py-2 px-5 my-5 border-none" type='submit'>Add workout</button>
            {error && <div className='text-red-600 bg-red-50 rounded-md border-red-600 border p-2 font-normal'>
                    {error}
                </div>}
        </form>
    )
}