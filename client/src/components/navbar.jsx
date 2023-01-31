import {Link} from 'react-router-dom'

export default function Navbar(){
    return(
        <header className='p-10'>
            <div className='text-4xl font-bold'>
                <Link to="/">
                    <h1>Workout Buddy</h1>
                </Link>
            </div>
        </header>
    )
}