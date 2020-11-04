import React from 'react';

//Error Message
export const showErrorMsg = (msg) => (
  <div className="alert alert-danger" role="alert">
    {msg}
  </div>
)

//Success Message
export const showSuccessMsg = (msg) => (
  <div className="alert alert-success" role="alert">
    {msg}
  </div>
)