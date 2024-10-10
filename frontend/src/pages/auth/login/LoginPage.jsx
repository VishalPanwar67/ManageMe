import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      // console.log(response.status);
      if (response.status === 201) {
        // console.log("Login successful. Redirecting...");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="flex h-screen items-center justify-center  bg-purple-900 ">
          {/* From Uiverse.io by Yaya12085 */}
          <div className="w-96 rounded-2xl bg-slate-900 ">
            <div className="flex flex-col gap-2 p-8">
              <p className="text-center text-3xl text-gray-300 mb-4">Sign In</p>

              <input
                className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800  text-red-500"
                placeholder="Email"
                type="email"
                value={email}
                name="LoginEmail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800  text-red-500"
                placeholder="Password"
                type="text"
                value={password}
                name="LoginPassword"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-message">{error}</p>}
              <button
                className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
                type="submit"
                // disabled={!termsAccepted}
              >
                Sign In
              </button>
              <p className="text-green-400">
                Don't have an account?
                <a
                  href="/signup"
                  className="text-blue-400 transition hover:underline mx-1"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
