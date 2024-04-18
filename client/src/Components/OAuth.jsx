import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { signInSuccess } from "../redux/Users/UserSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function OAuth() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const auth = getAuth(app);
  const handleOAuth = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultGoogle = await signInWithPopup(auth, provider);
      axios
        .post("http://localhost:3000/apiauth/google", {
          username: resultGoogle.user.displayName,
          email: resultGoogle.user.email,
          photo: resultGoogle.user.photoURL,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(signInSuccess(res));
            navigate("/")
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleOAuth}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
