import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';
import Card from '../layout/Card';
import Button from '../layout/Button';
import Link from 'next/link';

async function createUser(email, username, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, username, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  return response.status;
}

export default function Reset({ username }) {
  const [userData, setUserData] = useState({
    password: '',
    confirmed: '',
  });
  const [enteredPasswordIsValid, setEnteredPasswordIsValid] = useState();
  const [enteredConfirmedIsValid, setEnteredConfirmedIsValid] = useState();
  const [formSubmitted, setFormSubmitted] = useState();
  const [APIError, setAPIError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* set valid form inputs to true every update for better user experience */
  useEffect(() => {
    setEnteredPasswordIsValid(true);
    setEnteredConfirmedIsValid(true);
    setFormSubmitted(false);
    setAPIError(false);
  }, [userData]);

  /* input change handler */
  const inputChangeHandler = (e) => {
    switch (e.target.id) {
      case 'password':
        setUserData((prevState) => ({
          ...prevState,
          password: e.target.value,
        }));
        break;
      case 'confirmed':
        setUserData((prevState) => ({
          ...prevState,
          confirmed: e.target.value,
        }));
        break;
    }
  };

  /* form submit handler */
  async function submitHandler(e) {
    e.preventDefault();
    setFormSubmitted(true);
    let validForm = true;
    const { password, confirmed } = userData;

    /* password validation */
    if (
      password.trim() === '' ||
      password.trim().length < 8 ||
      !password.match(/^[a-zA-Z0-9!@#$%^&*-]+$/)
    ) {
      validForm = false;
      setEnteredPasswordIsValid(false);
    }

    /* confirmed password match validation */
    if (confirmed.trim() !== '' && password !== confirmed) {
      validForm = false;
      setEnteredConfirmedIsValid(false);
    }

    /* if any validations failed, break out of submit handler */
    if (!validForm) return;

    /* try block for updating user with fetch API call */
    try {
      await fetch('/api/user/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          ...userData,
          username,
          newPassword: userData.password,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      setAPIError(true);
    }

    /* try block for logging in user */
    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password: userData.password,
      });

      /* if database connection issue, give that feedback */
      if (result.error === 'No connection to the database') {
        setLoading(false);
        setAPIError(true);
        return;
      }

      if (!result.error) {
        /* as long as signIn gave us no errors, reroute user to profile */
        setLoading(true);
        router.replace(`
        /user/${user.username}`);
      } else {
        setAPIError(true);
      }
    } catch (err) {
      setAPIError(true);
    }
  }

  return (
    <div className='singularContainer'>
      {!loading && (
        <Card>
          <h2>Reset Password</h2>
          <form onSubmit={submitHandler}>
            <div className='control'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={inputChangeHandler}
                value={userData.password}
                className={
                  formSubmitted && !enteredPasswordIsValid
                    ? 'controlError'
                    : null
                }
              />
            </div>
            <div className='control'>
              <label htmlFor='confirmed'>Confirm Password</label>
              <input
                type='password'
                id='confirmed'
                name='confirmed'
                onChange={inputChangeHandler}
                value={userData.confirmed}
                className={
                  formSubmitted && !enteredConfirmedIsValid
                    ? 'controlError'
                    : null
                }
              />
            </div>
            <Button>Reset Password</Button>
            {formSubmitted && APIError && (
              <p className='error'>
                <strong>Error: API call failed.</strong>
                <br />
                <br />
                Contact the administrator. This is a real problem, dude.
              </p>
            )}
            {formSubmitted && !enteredPasswordIsValid && (
              <p className='error'>
                <strong>Error: Invalid password.</strong>
                <br />
                <br />
                Password must be at least 8 characters long and may contain the
                following special characters: ! @ # $ % ^ & * -
              </p>
            )}
            {formSubmitted && !enteredConfirmedIsValid && (
              <p className='error'>
                <strong>Error: Invalid password.</strong>
                <br />
                <br />
                Password and Confirm Password must match.
              </p>
            )}
          </form>
        </Card>
      )}

      {loading && (
        <Card>
          <h2>Password Reset Successful</h2>
          <p>Pulling profile from database...</p>
        </Card>
      )}
    </div>
  );
}
