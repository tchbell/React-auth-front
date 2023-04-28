import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Cookies from 'universal-cookie';

import { Button } from 'react-bootstrap';
export default function AuthComponent() {
  const cookies = new Cookies();
  const [message, setMessage] = useState('');
  const token = cookies.get('TOKEN');

  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove('TOKEN', { path: '/' });
    // redirect user to the landing page
    window.location.href = '/';
  };

  useEffect(() => {
    const configuration = {
      method: 'get',
      // url: 'https://fullstack-auth-app-1121.herokuapp.com/login',
      url: 'http://localhost:3000/auth-endpoint',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(configuration)
      .then((result) => {
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-center">Auth Component</h1>
      <h3 className="text-center text-danger">{message}</h3>
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
