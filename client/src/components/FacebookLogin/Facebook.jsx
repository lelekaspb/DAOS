import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: "",
  };
 
  responseFacebook = (response) => {
    // console.log(response);
    this.setState({
      isLoggedIn: true,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      password: response.userID,
      picture: response.picture.data.url
      
    })
    console.log(this.setState);

  };

  componentClicked = () => console.log("clicked");
  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <h2>Welcome {this.state.firstName}</h2>
      )
    } else {
      fbContent = (
        <FacebookLogin
          appId="5630063513698013"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}
