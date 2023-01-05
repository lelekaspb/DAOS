import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useStore } from "../Hooks/useStore";
import { useNavigate } from "react-router-dom";



const Google = () => {

    let navigate = useNavigate();
    const redirectToProfile = () => {
      navigate("/profile");
    };
    const setAuthData = useStore((state) => state.setAuthData);
  return (
    <GoogleOAuthProvider clientId='102813787652-o551ule1i3vdqfkrk4slpcf4rgd8330n.apps.googleusercontent.com'>
          <GoogleLogin
            useOneTap
            onSuccess={async (credentialResponse) => {
              console.log("google login clicked");
              console.log(credentialResponse);
              const googleResponse = await axios.post('http://localhost:8080/googlelogin',{
                token: credentialResponse.credential
              });
              const data = googleResponse.data;
  
              localStorage.setItem("authData", JSON.stringify(data));
              setAuthData(data);
  
              console.log(data);
            //redirectToProfile();
            }}
            onError={() => {
              console.log('Login Failed');
            }}

          />
      </GoogleOAuthProvider>
  )
}

export default Google