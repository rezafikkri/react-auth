import './App.css';
import { AuthContextProvider } from './context/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <h1>Auth JWT React</h1>
            
            <Switch>
              <ProtectedRoute path="/profile" component={Profile} />
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </header>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
