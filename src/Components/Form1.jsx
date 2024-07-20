import React from 'react';

const Form1 = ({ formData, formErrors, setFormData, setFormErrors }) => {
  const { emailId, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  return (
    <div className="form-container">
      <h2>Step 1</h2>
      <input
        type="email"
        name="emailId"
        placeholder="Email"
        value={emailId}
        onChange={handleChange}
        className={formErrors.emailId ? 'error' : ''}
        required
      />
      {formErrors.emailId && <div className="error-message">{formErrors.emailId}</div>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        className={formErrors.password ? 'error' : ''}
        required
      />
      {formErrors.password && <div className="error-message">{formErrors.password}</div>}
    </div>
  );
};

export default Form1;
