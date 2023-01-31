import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Navbar from './components/navbar'
import { createContext, useState, useReducer } from 'react';

export const WorkoutsContext = createContext()


function App() {

  const [workouts, setWorkouts] = useState([]);

  const [state, dispatch] = useReducer(reducer, {workouts: []});

  function reducer(state, action){
    switch (action.type){
      case 'SET_WORKOUTS':
        return {
            workouts: action.payload
        }
      case 'CREATE_WORKOUT':
        return {
            workouts: [action.payload, ...state.workouts]
        }
      default:
        return state
    }

  }

  return (
    <div>
      <WorkoutsContext.Provider value={{...state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      </WorkoutsContext.Provider>
    </div>
  )
}

export default App
