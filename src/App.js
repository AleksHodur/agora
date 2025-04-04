import './App.css'

import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './hooks/useAuthContext';
import OnlineUsers from './components/onlineUsers/OnlineUsers';

function App() {

  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      { authIsReady && (
        <BrowserRouter>

          { user && <Sidebar />}

          <div className="container">
            <Navbar />
            <Switch>

              <Route exact path='/'>
                  { !user && <Redirect to="/login"/>}
                  { user && <Dashboard/>}
              </Route>

                <Route path='/create'>
                  { !user && <Redirect to="/login"/>}
                  { user && <Create/>}
                </Route>

                <Route path='/project/:id'>
                  { !user && <Redirect to="/login"/>}
                  { user && <Project/>}
                </Route>

                <Route path='/login'>
                  { !user && <Login/>}
                  { user && <Redirect to="/" />}
                </Route>

                <Route path='/signup'>
                { !user && <Signup/>}
                { user && <Redirect to="/" />}
                </Route>

            </Switch>
          </div>

          { user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
