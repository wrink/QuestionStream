// JS Imports
import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';

// CSS Imports
import './index.css';

function ConfigForm({ values, onChange, onSubmit }) {
  const isValid = (
    values.type &&
    values.location &&
    (values.red_shirt_purchased || values.black_jeans_purchased || values.blue_sweater_purchased)
  );

  useEffect(() => onChange(values), [values]);

  return (
    <div className='container'>
      <div className='ConfigPage-title'>
        <h5>Customer setup</h5>
        <p>First time customer setup.</p>
      </div>

      <label htmlFor='type' className='form-label'>
        Type
      </label>
      <Field as='select' name='type' className='form-select'>
        <option value='' disabled defaultValue>Select one</option>
        <option value='New'>New</option>
        <option value='Returning'>Returning</option>
      </Field>

      <label htmlFor='location' className='form-label'>
        Location
      </label>
      <Field as='select' name='location' className='form-select'>
        <option value='' disabled defaultValue>Select one</option>
        <option value='Idaho'>Idaho</option>
        <option value='New York'>New York</option>
        <option value='Wisconsin'>Wisconsin</option>
      </Field>

      <label className='form-label'>
        Products Purchased
      </label>
      <div className='d-flex'>
        <div className='form-check'>
          <Field type='checkbox' name='red_shirt_purchased' className='form-check-input' />
          <label htmlFor='red_shirt_purchased' className='form-check-label'>Red Shirt</label>
        </div>
        <div className='form-check'>
          <Field type='checkbox' name='black_jeans_purchased' className='form-check-input' />
          <label htmlFor='black_jeans_purchased' className='form-check-label'>Black Jeans</label>
        </div>
        <div className='form-check'>
          <Field type='checkbox' name='blue_sweater_purchased' className='form-check-input' />
          <label htmlFor='blue_sweater_purchased' className='form-check-label'>Blue Sweater</label>
        </div>
      </div>

      <button type='submit' disabled={!isValid} className='ConfigPage-button btn btn-dark' onClick={onSubmit}>Start</button>
    </div>
  )
}

function ConfigPage({ config, onChange, onSubmit }) {
  const initialValues = {
    type: '',
    location: '',
    red_shirt_purchased: false,
    black_jeans_purchased: false,
    blue_sweater_purchased: false,
    ...config
  }

  return (
    <Formik initialValues={initialValues}>
      {(props) => (<ConfigForm {...props} onChange={onChange} onSubmit={onSubmit}/>)}
    </Formik>
  );
}

export default ConfigPage;
