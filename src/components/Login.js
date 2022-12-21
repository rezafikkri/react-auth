import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuth } from '../context/AuthContext';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // method login
    this.props.login(this.state);

  }

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect push to='/profile' />;
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="email" name="email" onChange={this.handleChange} value={this.state.email} />
          <input type="password" placeholder="password" name="password" onChange={this.handleChange} value={this.state.password} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default withAuth(Login);
