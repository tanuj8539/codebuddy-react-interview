import React from 'react';

const Form3 = ({ formData, formErrors, setFormData, setFormErrors }) => {

  const { countryCode, phoneNumber, acceptTermsAndCondition } = formData;

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  return (
    <div className="form-container">
      <h2>Step 3</h2>
      <select
        name="countryCode"
        value={countryCode}
        onChange={handleChange}
        className={formErrors.countryCode ? 'error' : ''}
        required
      >
        <option value="+91">India (+91)</option>
        <option value="+1">America (+1)</option>
      </select>
      {formErrors.countryCode && <div className="error-message">{formErrors.countryCode}</div>}
      <input
        type="number"
        name="phoneNumber"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handleChange}
        className={formErrors.phoneNumber ? 'error' : ''}
        required
      />
      {formErrors.phoneNumber && <div className="error-message">{formErrors.phoneNumber}</div>}
      <label>
        <input
          type="checkbox"
          name="acceptTermsAndCondition"
          checked={acceptTermsAndCondition}
          onChange={handleChange}
          className={formErrors.acceptTermsAndCondition ? 'error' : ''}
          required
        />
        Accept Terms and Conditions
      </label>
      {formErrors.acceptTermsAndCondition && <div className="error-message">{formErrors.acceptTermsAndCondition}</div>}
    </div>
  );
};

export default Form3;
