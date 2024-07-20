import React from 'react';

const Form2 = ({ formData, formErrors, setFormData, setFormErrors }) => {

  const { firstName, lastName, address } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  return (
    <div className="form-container">
      <h2>Step 2</h2>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={handleChange}
        className={formErrors.firstName ? 'error' : ''}
        required
      />
      {formErrors.firstName && <div className="error-message">{formErrors.firstName}</div>}
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={handleChange}
        className={formErrors.lastName ? 'error' : ''}
      />
      {formErrors.lastName && <div className="error-message">{formErrors.lastName}</div>}
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={address}
        onChange={handleChange}
        className={formErrors.address ? 'error' : ''}
        required
      />
      {formErrors.address && <div className="error-message">{formErrors.address}</div>}
    </div>
  );
};

export default Form2;
