import { useSelector } from "react-redux"; //Implemented UserSelector To spread the UserState 
import { TextInput, Button, Alert } from "flowbite-react";  //Component from FlowBite
import { useEffect, useRef, useState } from "react"; //UseEffect to render based on the change of the profile image and UseRef to access the userImage file input without showing the real div
import {
  getStorage,//Initialises a firebase Storage instance from the firebase.js we had
  ref,//it Takes a special place in the database for tasks such as upload and delete etcc 
  uploadBytesResumable,//The bytes uploaded during the upload process
  getDownloadURL,//Creates a downloadable link for the file wich returns as a link
} from "firebase/storage";//The firebase storage instance
import { app } from "../firebase";//The firebase app instance


function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);//We get The current user payload from the userSlice from the name user
  const [image, setImage] = useState(null);//image File
  const [imgUrl, setImageUrl] = useState(null);//Image Link created as a Link from file
  const [ImageUploadProgress, setImageUploadProgress] = useState(0);
  const [ImageUploadProgressError, setImageUploadProgressError] = useState(null);
  console.log(ImageUploadProgress)
  const filePickRef = useRef(null);//The Variable wich initiates the function that will refer the input to the imageProfile when clicked

  const handleFile = (e) => { //Function to handle onChange input
    const file = e.target.files[0];//Stores the first Image of the array
    if (file) {//if file exists
      setImage(file);//save
      setImageUrl(URL.createObjectURL(file));//Create the Object and pass it to file
    }
  };

  useEffect(() => {//Render the image when the image is uploaded
    const uploadImage = async () => {
      setImageUploadProgressError(null);
      if (image) {
        const storage = getStorage(app);//we get the storage instance
        const imageName = new Date().getTime() + image.name;//We mix the name of image with the time and generate a new image name
        const storageRef = ref(storage, imageName);//Saves a Reference to the Firebase
        const uploadTask = uploadBytesResumable(storageRef, image);//Bytes Uploaded to the Reference on the Database

        uploadTask.on(//Listen For Changes Of State
          "state_changed",
          (snapshot) => {//Promise Saved to snapshot
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;//Progress is bytesTransferred / totalBytes *100 ?
            setImageUploadProgress(progress.toFixed(0));//ToFixed Rounds it to 0
          },
          (error) => {//The Error Passed
            setImageUploadProgressError(//Set The Image Upload Progress Error
              "Could Not upload image(file must be less than 2 MB)",
              error
            );
            setImage(null);//Restate the image to null
            setImageUploadProgress(null);
            setImageUrl(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {//From THe Download get the URL and pass it to Image Url
              setImageUrl(downloadURL);
            });
          }
        );
      }
    };

    uploadImage();
  }, [image]);//Every change in image will trigger the useEffect rendering

  return (
    <div className="max-w-lg w-full mx-auto p-3">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 rounded shadow-md self-center cursor-pointer overflow-hidden ">
          <TextInput
            type="file"
            accept="image/*"
            onChange={handleFile}
            ref={filePickRef}//Reference to the Input file
            className="hidden"
          />
          <img
            src={imgUrl || currentUser.data.photo}
            className="w-full h-full object-cover rounded-full border-[lightgray] border-8"
            alt="Profile Image"
            onClick={() => filePickRef.current.click()}//Reference to the Input file on the onclick
          />
        </div>
        {ImageUploadProgressError && <Alert>{ImageUploadProgressError}</Alert>}
        <TextInput
          id="username"
          type="text"
          defaultValue={currentUser.data.username}
          placeholder="Username"
        />
        <TextInput
          id="email"
          type="email"
          defaultValue={currentUser.data.email}
          placeholder="Email"
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
