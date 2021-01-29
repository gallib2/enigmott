import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
// import Canvas from './Canvas';
// import Riddle from './riddle';
import Signup from './signup/signup';
import Login from './login/login';
import Riddle from './riddle/riddle';
import HomePage from './homePage/home-page';
import ProtectedRoute from './protectedRoute';


function App() {
  return (
    <Switch>
        <ProtectedRoute exact path='/riddle' component={Riddle} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <ProtectedRoute exact path='/' component={HomePage} />
        <Route path='*' component={() => '404 Not Found'} />
    </Switch>
  );
}



// function App() {
//   return (
//     <div className="App">
//       {/* <div style={{width: '100%', position: "fixed", top:'0px', backgroundColor:'white'}}>hello</div> */}
//       <Signup/>
//         {/* <Riddle/> */}
//       {/* <Canvas/> */}
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

export default App;
