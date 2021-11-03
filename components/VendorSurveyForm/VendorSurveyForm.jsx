import React, { useState, useEffect } from 'react';
import classes from './VendorSurveyForm.module.css';
import Modal from '../UI/Modal/Modal';

const RegisterForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialRegister = {
    name: '',
    location: '',
    price: '',
    workingDays: '',
    lat: '',
    long: ''
  };

  const [register, setRegister] = useState(initialRegister);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setRegister({ ...register, lat: position.coords.latitude, long: position.coords.longitude })
    });
  }, [])

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowModal(false);

    // post structure
    let post = {
      name: register.name,
      price: register.price,
      location: register.location,
      workingDays: register.workingDays,
      lat: register.lat,
      long: register.long,
      createdAt: new Date().toISOString(),
    };
    console.log(post);
    // save the post
    let response = await fetch('/api/vendor', {
      method: 'POST',
      body: JSON.stringify(post),
    });
    // get the data
    let data = await response.json();
    // console.log(data);

    if (data.success) {
      // reset the fields
      setIsLoading(false);
      setRegister(initialRegister);
      setShowModal(true);
      // set the message
      return setMessage(data.message);
    } else {
      // set the error
      return setError(data.message);
    }
  };

  { showModal && setTimeout(() => { setShowModal(false) }, 1500) }

  return (
    <>
      {showModal && (
        <Modal onCloseModal={props.onClose}>
          {showModal && <p className={classes.message} onClose={hideModalHandler}>{message}</p>}
        </Modal>
      )}
      <h1 className={classes.header}>ConGas Vendor Survey Form</h1>
      <form className={classes.form} onSubmit={registerHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Company Name</label>
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
            <option value='24/7'>24/7</option>
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
