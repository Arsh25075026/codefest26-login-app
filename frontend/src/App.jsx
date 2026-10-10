  import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://codefest26-login-app-2.onrender.com/api/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Registration failed.');
        return;
      }

      alert('Registration successful! Please log in.');

      setIsLoginMode(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Registration fetch error:', error);
      alert(
        'Could not connect to the backend. Check whether the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        'https://codefest26-login-app-2.onrender.com/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Login failed.');
        return;
      }

      setUsername(data.username);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login fetch error:', error);
      alert(
        'Could not connect to the backend. Check whether the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Logged-in page MUST come first
  if (isLoggedIn) {
    return (
      <div className="card">
        <h1 className="hello">
          Welcome to Codefest '26, {username}!
        </h1>

        <p className="cred">
          You have successfully logged in.
        </p>

        <button
          type="button"
          className="button"
          onClick={() => {
            setIsLoggedIn(false);
            setIsLoginMode(false);
            setUsername('');
            setEmail('');
            setPassword('');
          }}
        >
          Log Out
        </button>
      </div>
    );
  }

  // Login page
  if (isLoginMode) {
    return (
      <div className="page">
        <div className="hello">
          THE MOST AWAITED : CODEFEST'26
        </div>

        <div className="cred">Login Credentials</div>

        <form className="form" onSubmit={handleLogin}>
          <label className="from">Email :</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />

          <label className="from">Password :</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />

          <button
            type="submit"
            className="button"
            disabled={loading}
          >
            {loading ? 'PLEASE WAIT...' : 'SUBMIT'}
          </button>
        </form>

        <p className="new">
          NEW HERE?
          <button
            type="button"
            className="change"
            onClick={() => {
              setIsLoginMode(false);
              setPassword('');
              setUsername('');
            }}
          >
            SIGN UP
          </button>
        </p>
      </div>
    );
  }

  // Signup page
  return (
    <div className="page">
      <div className="hello">
        THE MOST AWAITED : CODEFEST'26
      </div>

      <div className="cred">SignUp Credentials (MADE BY : ARSH (CSE PART TWO : IIT VARANSI))</div>

      <form className="form" onSubmit={handleSubmit}>
        <label className="from">Username :</label>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <br />

        <label className="from">Email :</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />

        <label className="from">Password :</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />

        <button
          type="submit"
          className="button"
          disabled={loading}
        >
          {loading ? 'PLEASE WAIT...' : 'SUBMIT'}
        </button>
      </form>

      <p className="new">
        ALREADY REGISTERED?
        <button
          type="button"
          className="change"
          onClick={() => {
            setIsLoginMode(true);
            setUsername('');
            setPassword('');
          }}
        >
          LOGIN
        </button>
      </p>
    </div>
  );
};

export default App;