import React, { useState } from 'react';
import classes from './VendorSurveyForm.module.css';
import { stringify } from 'flatted';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initialRegister = {
    name: '',
    location: '',
    price: '',
    workingDays: '',
  };
  const [register, setRegister] = useState(initialRegister);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // post structure
    let post = {
      name: register.name,
      price: register.price,
      location: register.location,
      workingDays: register.workingDays,
      createdAt: new Date().toISOString(),
    };

    console.log(Object.values(post));
    // save the post
    let response = await fetch('/api/vendor', {
      method: 'POST',
      body: JSON.stringify(post),
    });
    // setRegister(initialRegister);
    // setIsLoading(false);
    // // get the data
    let data = await response.json();
    // console.log(data);

    if (data.success) {
      // reset the fields
      setIsLoading(false);
      setRegister(initialRegister);

      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  return (
    <>
      <h1 className={classes.header}>ConGas Vendor Survey Form</h1>
      <form className={classes.form} onSubmit={registerHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Name</label>
          <input
          required
            type='text'
            id='name'
            name='name'
            value={register.name}
            onChange={handleChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='location'>Location</label>
          <input
          required
            type='text'
            id='location'
            name='location'
            value={register.location}
            onChange={handleChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Price</label>
          <input
            required
            type='number'
            id='price'
            name='price'
            value={register.price}
            onChange={handleChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='workingDays'>Working Days</label>
          <select
            required
            id='workingDays'
            name='workingDays'
            value={register.workingDays}
            onChange={handleChange}>
            <option value=''>--Please choose working period--</option>
            <option value='Mon-Fri'>Mon-Fri</option>
            <option value='Mon-Sun'>Mon-Sun</option>
          </select>
        </div>
        <div className={classes.register__btn}>
          <button type='submit'>
            {isLoading ? 'Registering' : 'Register'}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
