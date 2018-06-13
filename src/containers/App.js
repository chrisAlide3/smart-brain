import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from '../components/SignIn/SignIn.js';
import Register from '../components/Register/Register.js';
import Navigation from '../components/Navigation/Navigation.js';
import Logo from '../components/Logo/Logo.js';
import Rank from '../components/Rank/Rank.js';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.js';
import Profile from '../components/Profile/Profile.js';

// For background
const particleOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      }
    }
  }
}

//For Clarifai Image recognition API
const app = new Clarifai.App({
  apiKey: 'd29dae2355cc4458aa9ad3ba9c0db2e3'
 });


class App extends Component {
  // Defining state
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      isSignedIn: false,
      // defining Route state to diplay Signin form or rest of App
      route: 'signin',
      user: {
        userId: 0, 
        userName: '', 
        userEmail: '',
        userEntries: 0, 
        userJoined: '',
      }
    }
  }

  setUser = (user) => {
    this.setState({user: {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userEntries: user.entries,
      userJoined: user.joined,
      }
    });
    this.setState({isSignedIn: true});
  }

  clearUser = () => {
    this.setState({user: {
      userId: 0,
      userName: '',
      userEmail: '',
      userEntries: 0,
      userJoined: '',
      }
    });
    this.setState({isSignedIn: false});
    this.setState({imageUrl: ''});
    this.setState({box: []});
    this.onRouteChange('signin');
  }

  onRouteChange = (route) => {
  //   if (route === 'home' || route === 'profile') {
  //     this.setState({isSignedIn: true});
  //   }else {
  //     this.setState({isSignedIn: false});
  //   }
    this.setState({route: route});
  }
  
  onInputChange = (event) => {
    // On enter key do like Detect button
    if (event.key === 'Enter') {
      this.setState({input: event.target.value});
      this.onButtonDetect();
    } else {
      this.setState({input: event.target.value});
      }
  }

  inputSelectAll = (event) => {
    event.target.select();
  }
 
  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
       
    // Calculate coordinates for each face detected by Clarifai
    const faceboxes = data.outputs[0].data.regions.map((faces, idx) => {
      const clarifaiFace = faces.region_info.bounding_box;
    
      const left = clarifaiFace.left_col * width;
      const top = clarifaiFace.top_row * height;
      const right= width - (clarifaiFace.right_col * width);
      const bottom = height - (clarifaiFace.bottom_row * height);

      return(
        {left: left, right: right, top: top, bottom: bottom}
      );
    });
    this.setState({box: faceboxes});
  }


  onButtonDetect = () => {
    this.setState({imageUrl: this.state.input});
    // Clarify API
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.userId
          })
        })
        .then(response => response.json())
        .then(count => {
        // !!!! If we just want to udate one field  of an object with setState we need to use Object.assign function
        this.setState(Object.assign(this.state.user, {userEntries: count})) 
          // this.setState({user: {
          //   userEntries: count
          // }})
        })
        .catch(err => {
          console.log('Undefined user');
          
        })
      }
      this.calculateFaceLocation(response)
    })
    .catch(err => console.log(err));
  }

  onButtonClear = () => {
    document.getElementById('input').value = '';
    this.setState({input: ''});
    this.setState({imageUrl: ''});
  }

  render() {
    return (
      <div className="App">
        {/* For background */}
        <Particles className="particles"
              params={particleOptions}
        />
        <Navigation clearUser={this.clearUser} onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {/* We need to wrap the HTML in {} to be able to use ternary statment of route 
            We also need to wrap all in one <div> */}
        { this.state.route === 'signin'
          ? <SignIn setUser={this.setUser} onRouteChange={this.onRouteChange}/>
          : this.state.route === 'register'
          ? <Register setUser={this.setUser} onRouteChange={this.onRouteChange}/>
          : this.state.route === 'profile'
          ? <Profile setUser={this.setUser} clearUser={this.clearUser} onRouteChange={this.onRouteChange} id={this.state.user.userId} />
          :
            <div>
            <Logo />
            <Rank id={this.state.user.userId} name={this.state.user.userName} entries={this.state.user.userEntries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonDetect={this.onButtonDetect} onButtonClear={this.onButtonClear} inputSelectAll={this.inputSelectAll}/>
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
          </div>
        }
      </div>
    );
  }
}

export default App;
