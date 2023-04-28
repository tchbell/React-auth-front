import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted');

    const configuration = {
      method: 'post',
      // url: 'https://fullstack-auth-app-1121.herokuapp.com/login',
      url: 'http://localhost:3000/login',
      data: {
        email,
        password,
      },
    };

    axios(configuration)
      .then((result) => {
        setLogin(true);
        cookies.set('TOKEN', result.data.token, {
          path: '/',
        });
        // redirect user to the auth page
        window.location.href = '/auth';
      })
      .catch((error) => {
        error = new Error();
      });
  };
  return (
    <>
      {' '}
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* email */}
        <Form.Group controlId="loginEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
      {/* display success message */}
      {login ? (
        <p className="text-success">You Are Logged in Successfully</p>
      ) : (
        <p className="text-danger">You Are Not Logged in</p>
      )}
    </>
  );
}
