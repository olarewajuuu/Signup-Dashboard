import { useState } from "react";
import googleLogo from "/logo_google_icon.png";
import signupimage from "/signupimage.png";
import show from "/show.png";
import hide from "/hide.webp";
import CryptoJS from "crypto-js";
const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const apiurl = import.meta.env.VITE_API_URL;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "Unknown";

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email ID.";
    }

    if (!firstName) {
      newErrors.firstName = "First Name is required.";
    }

    if (!lastName) {
      newErrors.lastName = "Last Name is required.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (
      !/[a-zA-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      newErrors.password =
        "Password must contain a character, symbol, and number.";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const agentCode = "TBC";
      const requestType = "REGT";

      const securityKey = CryptoJS.MD5(`${agentCode}|${accessToken}`).toString();

      const requestBody = {
        requestType,
        userMail: email,
        userPassword: password,
        userFullname: firstName + lastName,
        userPhone: phone,
        agentCode,
        userAgent,
      };

      try {
        const res = await fetch(apiurl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Security-Key": securityKey,
          },
          body: JSON.stringify(requestBody),
        });
        console.log(res, "res")
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Signup response:", data);
        return data;
      } catch (error) {
        console.error("Error during signup request:", error);
        throw error;
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
      {/* Description Section */}
      <div className="md:w-1/3 bg-blue-500 text-white flex flex-col items-center justify-center p-8">
        <div className="flex flex-col ml-10 justify-center">
          <img src={signupimage} alt="Logo" className="w-80 h-80 mb-4" />
          <h1 className="text-4xl font-bold mb-2">
            We simply your finacial handlings
          </h1>
          <h4 className="text-lg text-left">
            Join us to explore amazing opportunities!
          </h4>
        </div>
      </div>

      {/* Form Section */}
      <div className="md:w-2/3 bg-white flex items-center justify-center p-8">
        <form
          className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

          {/* Google Signup Button */}
          <button
            type="button"
            className="w-full bg-gray-200 text-black py-2 px-4 rounded-md hover:bg-gray-100 mb-4 flex items-center justify-center gap-2"
          >
            <img src={googleLogo} alt="" className="w-[24px]" />
            Sign up with Google
          </button>

          {/* Or Separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <p className="text-sm text-gray-500">Please enter your email ID</p>
          </div>

          {/* First Name and Last Name */}
          <div className="mb-4">
            <div className="flex gap-4 mb-1">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Make sure it match the name on your NIN card
            </p>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <div className="mb-1 relative">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pt-6 pr-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img src={hide} alt="Hide password" className="h-5 w-5" />
                ) : (
                  <img src={show} alt="Show password" className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Make sure it contains special character, symbor and numbers
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-md py-2 px-3 mt-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
            <p className="text-sm text-gray-500">
              You will receive an OTP on your phone.
            </p>
          </div>

          {/* Terms and Conditions */}
          <p className="text-sm text-gray-500 mb-4">
            By signing up, you agree to our{" "}
            <a href="#" className="text-blue-500">
              Terms and Conditions
            </a>
            .
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Agree and Continue
          </button>

          {/* Login Link */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
