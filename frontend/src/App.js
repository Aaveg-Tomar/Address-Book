import Edit from "./components/Edit";
import Form from "./components/Form";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={ Home} />
          <Route path="/form" Component={Form} />
          <Route path="/edit/:id" Component={Edit}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
