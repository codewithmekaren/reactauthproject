import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({});

  const [valid, setValid] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isvalid = true;
    let validationErrors = {};
    if (formData.fname === "" || formData.fname === null) {
      isvalid = false;
      validationErrors.fname = "First name required";
    } else {
      // Valid fname

      validationErrors.fname = "";

      console.log("Valid fname:", formData.fname);
    }
    if (formData.lname === "" || formData.lname === null) {
      isvalid = false; // Typo here! Should be `isvalid`
      validationErrors.lname = "Last name required";
    } else {
      // Valid fname

      validationErrors.lname = "";

      console.log("Valid lname:", formData.lname);
    }
    if (formData.email === "" || formData.email === null) {
      isvalid = false;
      validationErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isvalid = false;
      validationErrors.email = "Email is not valid";
    } else {
      // Valid fname
      validationErrors.email = "";

      console.log("Valid email:", formData.email);
    }

    // Validate password
    if (formData.password === "" || formData.password === null) {
      isvalid = false;
      validationErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      isvalid = false;
      validationErrors.password = "Password length at least 6 char";
    } else {
      validationErrors.password = "";

      console.log("Valid password:", formData.password);
    }

    // Validate confirm password
    if (formData.cpassword !== formData.password) {
      isvalid = false;
      validationErrors.cpassword = "Confirm password must match password";
    } else {
      validationErrors.cpassword = "";

      console.log("Valid cpassword:", formData.cpassword);
    }
    setErrors(validationErrors);
    setValid(isvalid);
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .post("http://localhost:8000/users", formData)
          .then((result) => {
            console.log(result);
            alert("registered successfuly");
            navigate("/login");
          });
      } catch (error) {
        const errorMessage = error.response.data.message;
        alert(`Registration failed: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="signup-form">
            <form
              className="mt-5 border p-4 bg-light shadow"
              onSubmit={handleSubmit}
            >
              <h3 className="mb-5 text-secondary">Create Your Account</h3>
              {valid ? (
                <div></div>
              ) : (
                <span className="text-danger">
                  {errors.fname};{errors.lname};{errors.email};{errors.password}
                  ;{errors.cpassword}
                </span>
              )}
              <div className="row">
                {/* First name */}
                <div className="mb-3 col-md-6">
                  <label htmlFor="fname">First Name</label>
                  <input
                    type="text"
                    name="fname"
                    className="form-control"
                    id="fname"
                    placeholder="Enter First Name"
                    onChange={(event) =>
                      setFormData({ ...formData, fname: event.target.value })
                    }
                  />
                </div>
                {/* Last name */}
                <div className="mb-3 col-md-6">
                  <label htmlFor="lname">Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    className="form-control"
                    id="lname"
                    placeholder="Enter Last Name"
                    onChange={(event) =>
                      setFormData({ ...formData, lname: event.target.value })
                    }
                  />
                </div>

                <div className="mb-3 col-md-12">
                  <label htmlFor="email">Email Address</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter Your Email Address"
                    onChange={(event) =>
                      setFormData({ ...formData, email: event.target.value })
                    }
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label htmlFor="password">Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Create Password"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        password: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label htmlFor="confirmPassword">Confirm Password</label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Your Password"
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        cpassword: event.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary float-end">
                    Signup Now
                  </button>
                </div>
              </div>
            </form>
            <p className="text-center mt-3 text-secondary">
              If you have account, Please <Link to="/login">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
