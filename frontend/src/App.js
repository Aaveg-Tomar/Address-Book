import Edit from "./components/Edit";
import Form from "./components/Form";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import Main from "./components/Main";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Manager from "./manager/Manager";
import User from "./user/User";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" Component={ Home} />
          <Route path="/form" Component={Form} />
          <Route path="/edit/:id" Component={Edit}/>
          <Route path="/profile/:id" Component={Profile}/>
          <Route path="/" Component={Main}/>
          <Route path="/login" Component={Login}/>
          <Route path="/signup" Component={SignUp}/>
          
          <Route path="/manager" Component={Manager}/>
          <Route path="/user" Component={User}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
