
import './App.css';
import Todos from './components/todos'
import Loginpage from './components/login'
import Signup from './components/signup'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import CredState from './context/Credentials/credState';


function App() {

    console.log('App component is reloading');
    return (
        <>
            <CredState>
                <Router>
                    <Routes>
                        <Route path='/' element={<Loginpage />}></Route>
                        <Route exact path='/signup' element={<Signup />}></Route>
                        <Route exact path='/home' element={<div className="maincontainer">
                            <Todos /></div>}>
                        </Route>
                    </Routes>
                </Router>
            </CredState>
        </>
    );
}

export default App;
