import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setuserName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Use axios.post to send email and password for login
      const res = await axios.post("http://localhost:3001/signup", {
        username:username,
        email: email,
        password: password
      });

      // Assuming you get a token or success response
      console.log("Login successful: ", res.data);

      // Navigate to home page on successful login
      navigate("/home");
    } catch (error) {
      console.error("Login failed: ", error.response?.data || error.message);
      // Handle login error (e.g., show a message)
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-900 flex items-center justify-center">
      <div className="w-full max-w-lg duration-150 hover:bg-white/10 bg-white/30 rounded-xl hover:shadow-[0px_4px_10px_rgba(255,255,255,0.5)] backdrop-blur-md border border-white/30 px-8 py-6">
        <h1 className="text-3xl text-center font-semibold text-white mb-4">
          Dive into the world of Encryption
        </h1>
        <p className="text-center text-white text-md mb-4">SignUp to see more</p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">User Name</label>
            <input
              id="email"
              name="username"
              type="string"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-full py-2 px-4 font-semibold"
          >
            Continue
          </button>
          <p className="text-xs text-center text-gray-500 mt-2">
            By continuing, you agree to Drobot's Terms of Service and acknowledge you've read our Privacy Policy. Notice at collection.
          </p>
        </form>
        <a href="/" className="block text-center text-sm font-semibold mt-4 text-red-600">
            Alreadt a member? Login
        </a>
      </div>
    </div>
  );
};

export default SignUp;
