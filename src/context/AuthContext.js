import React, { Component } from 'react';
import axios from 'axios';

const axiosReq = axios.create({
  baseURL: 'http://localhost:4000/api',
});
axiosReq.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});
const AuthContext = React.createContext();

export class AuthContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      user: localStorage.getItem('user') ?? '',
      token: localStorage.getItem('token'),
      isLoggedIn: Boolean(localStorage.getItem('token')),
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.initUser = this.initUser.bind(this);
  }

  // Login
  async login(credentials) {
    try {
      const response = await axiosReq.post("/login", credentials);
      const { token } = response.data;

      localStorage.setItem('token', token);
      this.setState({
        token,
        isLoggedIn: true,
      });
    } catch (err) {
      console.error(err); 
    }
  }

  async initUser() {
    try {
      const response = await axiosReq.get('/profile');
      this.setState({
        user: response.data,
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    this.setState({
      isLoggedIn: false,
    });
    console.log('logout');
    return true;
  }

  render() {
    return (
      <AuthContext.Provider value={{
        login: this.login,
        logout: this.logout,
        initUser: this.initUser,
        ...this.state,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export function withAuth(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {(context) => (
            <WrappedComponent {...this.props} {...context} />
          )}
        </AuthContext.Consumer>
      );
    }
  }
}
