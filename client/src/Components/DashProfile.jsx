import { useSelector, useDispatch } from "react-redux";
import { TextInput, Button, Alert } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  updateStart,
  updateError,
  updateSuccess,
} from "../redux/Users/UserSlice";
import { app } from "../firebase";
import axios from "axios";

function DashProfile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const [imgUrl, setImageUrl] = useState(null);

  const [ImageUploadProgressError, setImageUploadProgressError] =
    useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.username || currentUser.data.username,
    email: currentUser.email || currentUser.data.email,
    password: "",
  });
  const filePickRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    const userId = currentUser._id || currentUser.data._id;
    try {
      const response = await axios.put(
        `http://localhost:3000/apiusers/update/${userId}`,
        formData
      );
      dispatch(updateSuccess(response.data));
    } catch (err) {
      dispatch(updateError(err.response.data.message || "Update failed"));
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      setImageUploadProgressError(null);
      if (image) {
        const storage = getStorage(app);
        const imageName = new Date().getTime() + image.name;
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          () => {
            setImageUploadProgressError("Could not upload image");
            setImage(null);

            setImageUrl(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              setFormData({ ...formData, photo: downloadURL });
            });
          }
        );
      }
    };

    uploadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  return (
    <div className="max-w-lg w-full mx-auto p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="w-32 h-32 rounded shadow-md self-center cursor-pointer overflow-hidden ">
          <TextInput
            type="file"
            accept="image/*"
            onChange={handleFile}
            ref={filePickRef}
            className="hidden"
          />
          <img
            src={imgUrl || currentUser.photo || currentUser.data.photo}
            className="w-full h-full object-cover rounded-full border-[lightgray] border-8"
            alt="Profile Image"
            onClick={() => filePickRef.current.click()}
          />
        </div>
        {ImageUploadProgressError && <Alert>{ImageUploadProgressError}</Alert>}
        <TextInput
          id="username"
          type="text"
          value={formData.username}
          placeholder="Username"
          onChange={handleOnChange}
        />
        <TextInput
          id="email"
          type="email"
          value={formData.email}
          placeholder="Email"
          onChange={handleOnChange}
        />
        <TextInput id="password" type="password" placeholder="********" />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Update
        </Button>
        <div className="flex justify-between text-red-500 mt-5">
          <span className="cursor-pointer">Delete</span>
          <span className="cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}

export default DashProfile;
