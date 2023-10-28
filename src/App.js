import './App.css';
import NoteState from './Context/notes/NoteState';
import { About } from './components/About';
import { FirstPage } from './components/FristPage';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import {
  Switch,
  Route
} from "react-router-dom";
import { Signup } from './components/Signup';
import { Alert } from './components/Alert';
import { Userinfo } from './components/Userinfo';
function App() {
  return (
    <>
      <NoteState>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/home">
            <FirstPage />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/user">
            <Userinfo />
          </Route>
        </Switch>
      </NoteState>
    </>
  );
}

export default App;
