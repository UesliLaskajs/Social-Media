import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory from react-router-dom
import { Label, TextInput, Button, Spinner, Alert } from "flowbite-react";
import axios from "axios";
import OAuth from "../Components/OAuth";
function Signup() {
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (!data.username || !data.email || !data.password) {
      return setErrorMessage("All fields are required");
    }

    axios
      .post("http://localhost:3000/apiauth/sign-up", data)
      .then((res) => {
        if (res.data.success === false) {
          setErrorMessage(res.data.message);
          setLoading(false);
        } else {
          console.log("Data sent to the server");
        }

        if (res.status === 201) {
          navigate("/sign-in"); 
        }
      })
      .catch((err) => {
        console.log("An error occurred", err);
        setErrorMessage(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl flex-col md:flex-row md:items-center  mx-auto gap-10">
        <div className="flex-1">
          <Link to={"/"} className=" text-4xl  font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Uesli`s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is a portfolio project. You can Sign up with your email and
            password or Google.
          </p>
        </div>
        <div className=" flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label value="Username">Username</Label>
            <TextInput
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
            />

            <Label value="Email">Email</Label>
            <TextInput
              type="email"
              placeholder="email"
              id="email"
              onChange={handleChange}
            />

            <Label value="Password">Password</Label>
            <TextInput
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />

            <Button
              type="submit"
              gradientDuoTone={"purpleToPink"}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign up"
              )}
            </Button>
            <OAuth/>

            <div className="flex  gap-2 mt-5 text-m md:text-xl">
              <span>Have an Account ?</span>
              <Link to={"/sign-in"} className="text-blue-500">
                Sign in
              </Link>
              <Alert className="my-custom-alert">
                {errorMessage && (
                  <div className="text-red-500">{errorMessage}</div>
                )}
              </Alert>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
