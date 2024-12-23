import Edit from "./components/Edit";
import Form from "./components/Form";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "./components/Profile";



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={ Home} />
          <Route path="/form" Component={Form} />
          <Route path="/edit/:id" Component={Edit}/>
          <Route path="/profile/:id" Component={Profile}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
