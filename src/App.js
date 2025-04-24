import './App.css'

import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import OnlineUsers from './components/onlineUsers/OnlineUsers';

function App() {

  return (
    <div className="App">
      <BrowserRouter>

        <Sidebar />

        <div className="container">
          <Navbar />
          <Switch>

            <Route exact path='/'>
                <Dashboard/>
            </Route>

              <Route path='/create'>
                <Create/>
              </Route>

              <Route path='/project/:id'>
                <Project/>
              </Route>

          </Switch>
        </div>

        <OnlineUsers />
      </BrowserRouter>
    </div>
  );
}

export default App
