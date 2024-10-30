import React, { useState } from "react";
import "./Login.css"; 
import { login } from "../../../Services/authServices";
import { InputField } from "../../../Component/Generic/InputField";
import { validateLoginForm } from "../../../Utilis/utilis";
import { initialLoginData } from "../../../Constants/Auth/Login";
import { useNavigate, Link } from "react-router-dom"; 

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialLoginData);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await login(formData);
        localStorage.setItem("token", response.data.token);
        setErrors({});
        setSuccessMessage(response.message);
        navigate("/");
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
              <h2 className="text-center text-primary">Login</h2>
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
                <button type="submit" className="btn btn-custom btn-block">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p>
                  Not have an account?{" "}
                  <Link to="/register">Click here to register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
