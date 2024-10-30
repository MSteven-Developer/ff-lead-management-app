import React, { useState } from "react";
import "./Register.css";
import { register } from "../../../Services/authServices";
import { InputField } from "../../../Component/Generic/InputField";
import { validateRegisterForm } from "../../../Utilis/utilis";
import { initialRegisterData } from "../../../Constants/Auth/Register";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState(initialRegisterData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await register(formData);
        setErrors({});
        setSuccessMessage(response.message);
      } catch (error) {
        setSuccessMessage("");
        setErrors({
          submit:
            error.response?.data?.message ||
            "Error submitting form. Please try again.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow">
            <div className="card-body">
              <h2 className="text-center text-primary">Register</h2>
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              {errors.submit && (
                <div className="alert alert-danger text-danger">
                  {errors.submit}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <InputField
                    type="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <InputField
                    type="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    name="password"
                  />
                </div>
                <div className="form-group">
                  <InputField
                    type="password"
                    label="Confirm Password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    error={errors.password_confirmation}
                    name="password_confirmation"
                  />
                </div>
                <button type="submit" className="btn btn-custom btn-block">
                  Register
                </button>
                <div className="text-center mt-3">
                  <p>
                    Already have a account?{" "}
                    <Link to="/login">Click here to Login</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;