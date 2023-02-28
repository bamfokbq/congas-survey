import React, { useState, useEffect } from 'react';
import classes from './VendorSurveyForm.module.css';
import Modal from '../UI/Modal/Modal';

const RegisterForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);


  const [vendorName, setVendorName] = useState("")
  const [vendorLocation, setVendorLocation] = useState("")
  const [vendorPrice, setVendorPrice] = useState("")
  const [vendorWorkingDays, setVendorWorkingDays] = useState("")
  const [vendorLandmark, setVendorLandmark] = useState("")
  const [vendorLat, setVendorLat] = useState("")
  const [vendorLong, setVendorLong] = useState("")

  const clearForm = () => {
    setVendorName("")
    setVendorLocation("")
    setVendorPrice("")
    setVendorWorkingDays("")
    setVendorLandmark("")
    setVendorLat("")
    setVendorLong("")
  }

  useEffect(() => {
    if (vendorLat.length === 0 || vendorLong.length === 0) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setVendorLat(position.coords.latitude)
        setVendorLong(position.coords.longitude)
      });
    }
  }, [vendorLat.length, vendorLong.length])

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };


  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowModal(false);

    // post structure
    let post = {
      name: vendorName,
      price: vendorPrice,
      location: vendorLocation,
      landmark: vendorLandmark,
      workingDays: vendorWorkingDays,
      lat: vendorLat,
      long: vendorLong,
      createdAt: new Date().toISOString(),
    };

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
      clearForm()
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
          <label htmlFor='name'>Gas Vendor Name</label>
          <input
            required
            type='text'
            id='name'
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='location'>Location</label>
          <input
            required
            type='text'
            id='location'
            value={vendorLocation}
            onChange={(e) => setVendorLocation(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='landmark'>Closest Landmark</label>
          <input
            required
            type='text'
            id='landmark'
            value={vendorLandmark}
            onChange={(e) => setVendorLandmark(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Base Rate Price</label>
          <input
            required
            type='number'
            id='price'
            value={vendorPrice}
            onChange={(e) => setVendorPrice(e.target.value)}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='workingDays'>Working Days</label>
          <select
            required
            id='workingDays'
            value={vendorWorkingDays}
            onChange={(e) => setVendorWorkingDays(e.target.value)}>
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
