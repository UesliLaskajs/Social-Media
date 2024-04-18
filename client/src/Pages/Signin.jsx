import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/Users/UserSlice";
import { Label, TextInput, Button, Spinner, Alert } from "flowbite-react";
import OAuth from "../Components/OAuth";
import axios from "axios";

function SignIn() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ username: "", password: "" });

  // Accessing error message from the Redux state
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInStart());

    const trimmedData = {
      username: data.username.trim(),
      password: data.password.trim(),
    };

    if (!trimmedData.username || !trimmedData.password) {
      dispatch(signInFailure("Please enter your username and password."));
      return;
    }

    axios
      .post("http://localhost:3000/apiauth/sign-in", trimmedData)
      .then((res) => {
        console.log("Sign-in successful:", res.data);
        dispatch(signInSuccess(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log("Sign-in failed:", err);
        dispatch(
          signInFailure("An error occurred. Please try again later.", err)
        );
      });
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl flex-col md:flex-row md:items-center  mx-auto gap-10">
        <div className="flex-1">
          <Link to={"/"} className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Uesli`s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a portfolio project. You can sign up with your email and
            password or Google.
          </p>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label value="Username">Username</Label>
            <TextInput
              type="text"
              placeholder="Enter your username"
              id="username"
              value={data.username}
              onChange={handleChange}
            />
            <Label value="Password">Password</Label>
            <TextInput
              type="password"
              placeholder="Enter your password"
              id="password"
              value={data.password}
              onChange={handleChange}
            />

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth/>

            <div className="flex gap-2 mt-5 text-m md:text-xl">
              <span>Dont have an account?</span>
              <Link to={"/sign-up"} className="text-blue-500">
                Sign up
              </Link>
            </div>
            <Alert className="my-custom-alert">
              {errorMessage && (
                <div className="text-red-500">{errorMessage}</div>
              )}
            </Alert>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
