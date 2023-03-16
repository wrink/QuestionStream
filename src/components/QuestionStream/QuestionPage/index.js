// JS Imports
import React, { useState, useEffect } from 'react';
import { Formik, Field } from 'formik';

// CSS Imports
import './index.css';

function QuestionForm({ question, values, onChange, onSubmit }) {
  const {
    id,
    prompt,
    responses,
    type
  } = question;

  const isValid = (values[id] || type === 'checkbox');

  useEffect(() => onChange(values), [values]);

  return (
    <div className='container'>
      <div className='QuestionPage-title'>
        <h5>{prompt}</h5>
      </div>

      {(type === 'checkbox') && responses.map((option, i) => (
        <div className='form-check' key={i}>
          <Field type='checkbox' name={option} className='form-check-input'/>
          <label htmlFor={option} className='form-check-label'>{option}</label>
        </div>
      ))}

      {(type === 'radio') && responses.map((option, i) => (
        <div className='form-radio' key={i}>
          <label className='form-radio-label'>
            <Field type='radio' value={option} name={id} className='form-radio-input'/>
            {option}
          </label>
        </div>
      ))}

      {(type === 'text') && (
        <Field as='textarea' rows={3} placeholder='Enter a description...' name={id} className='form-control'/>
      )}

      <button type='submit' disabled={!isValid} className='QuestionPage-button btn btn-dark' onClick={onSubmit}>Submit</button>
    </div>
  )
}

function QuestionPage({ question, config, onChange, onSubmit }) {
  const {
    responses,
    type
  } = question;

  console.log(config);

  const initialValues = (type !== 'checkbox') ? { value: null } : 
    responses.reduce((obj, key) => ({ ...obj, [key]: false, ...config}), {});

  return (
    <Formik initialValues={initialValues}>
      {(props) => (<QuestionForm {...props} question={question} onChange={onChange} onSubmit={onSubmit} />)}
    </Formik>
  );
}

export default QuestionPage;
