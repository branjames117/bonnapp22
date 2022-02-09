import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Card from '../layout/Card';
import Button from '../layout/Button';
import Link from 'next/link';

export default function Forgot() {
  const [userData, setUserData] = useState({ email: '' });
  const [formSubmitted, setFormSubmitted] = useState();
  const [enteredEmailIsValid, setEnteredEmailIsValid] = useState();
  const [emailExists, setEmailExists] = useState();
  const [APIError, setAPIError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* set valid form inputs to true just at initial render */
  useEffect(() => {
    setEnteredEmailIsValid(true);
    setEmailExists(true);
    setFormSubmitted(false);
    setAPIError(false);
  }, [userData]);

  /* input change handler */
  const inputChangeHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    setFormSubmitted(true);
    let validForm = true;
    const { email } = userData;

    /* email validation */
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()) ===
      false
    ) {
      validForm = false;
      setEnteredEmailIsValid(false);
    }

    if (!validForm) return;

    /* try block for fetching user by email address */
    try {
      const result = await fetch('/api/user/password-reset', {
        method: 'POST',
        body: JSON.stringify(email.trim().toLowerCase()),
        headers: { 'Content-Type': 'application/json' },
      });

      /* if database connection issue, give that feedback */
      if (result.error === 'No connection to the database') {
        setLoading(false);
        setAPIError(true);
        return;
      }

      /* if no email in database, give that feedback */
      if (result.error === 'Email address not found') {
        setLoading(false);
        setEmailExists(false);
        return;
      }

      if (!result.error) {
        /* as long as signIn gave us no errors, reroute user to profile */
        setLoading(true);
        router.replace(`/reset`);
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
          <h2>Forgot Password</h2>
          <form onSubmit={submitHandler}>
            <div className='control'>
              <label htmlFor='email'>Email</label>
              <input
                autoComplete='off'
                type='email'
                id='email'
                name='email'
                onChange={inputChangeHandler}
                value={userData.email}
                className={
                  formSubmitted && !emailExists ? 'controlError' : null
                }
              />
            </div>
            <Button>request reset link</Button>

            {!emailExists && <p className='error'>Email address not found.</p>}
            {APIError && (
              <p className='error'>
                Something went wrong with the database.
                <br />
                Contact the administrator.
              </p>
            )}
          </form>
        </Card>
      )}

      {loading && (
        <Card>
          <h2>Account Found</h2>
          <p>Sending email...</p>
        </Card>
      )}
    </div>
  );
}
