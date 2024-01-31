// importing required modules and files
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


// code for the functional component
function Register() {
  //  setting up state variables using useState hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();
// State to track submission status
  const [submitted, setSubmitted] = useState(false); 

  // Code to store the user data into local storage
  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((key) => {
        setValue(key, parsedData[key]);
      });
    }
  }, [setValue]);

  // function  to handle onSubmit event of the form to make back to home visible
  const onSubmit = (data) => {
    console.log('Form submitted:', data);
    localStorage.setItem('formData', JSON.stringify(data));
    // Set submission status to true
    setSubmitted(true);
  };

  // varibles to check confirm password
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <div className="parent-container">
      <h1>Join Now</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name  */}
        <input className='name_input' placeholder='Your Name' type="text" {...register("firstname", { required: true, maxLength: 30})} />
        {errors.firstname && <p className="error">First name is required</p>}

        {/* email  */}
        <input className='name_input' placeholder='Your email' type="email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
        {errors.email && <p className="error">Invalid email format</p>}

        {/* password */}

        <input className='name_input' placeholder='PassWord' type="password" {...register("password", { required: true, minLength: 10, pattern: /[!@#$%^&*(),.?":{}|<>]/ })} />
        {errors.password && <p className="error">Password should be at least 10 characters long and contain at least one symbol</p>}

        <input className='name_input' placeholder='confirm password' type="password" {...register("confirmPassword", { required: true, validate: (value) => value === password })} />
        {errors.confirmPassword && <p className="error">Passwords must match</p>}

        {/* submit button */}
        
        <input type="submit" value={"Sign Up"} />
        
      {/* button only vivble on complition of form */}
        <Link to={"/"}>{submitted &&  <button className='back_home' type="button">🔙 Back to home</button>} </Link> {/* Conditionally render the button */}
      </form>
    </div>
  );
}

export default Register;
