import React from 'react';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            registerName: '',
            registerEmail: '',
            errorMsg: '',
        }
    }

    onRegisterNameChange = (event) => {
        this.setState({registerName: event.target.value});
    }

    onregisterEmailChange = (event) => {
        this.setState({registerEmail: event.target.value});
    }

    onRegisterSubmit = () => {
        const password = document.getElementById('password').value;
        fetch('https://guarded-ridge-12145.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: password
            })
        })
        .then(response => {
            if (response.status === 400) {
                response.json()
                .then(errorMsg => {
                    this.setState({errorMsg: errorMsg}); 
                })
            } else {
                response.json()
                .then(userId => {
                    fetch('https://guarded-ridge-12145.herokuapp.com/profile/'+userId, {
                        method: 'get',
                        headers: {'Content-Type': 'application-json'},
                    })
                    .then(response => response.json())
                    .then(user => {
                        if (user.id) {
                            this.props.setUser(user);
                            this.props.onRouteChange('home');
                        } else {
                            this.setState({errorMsg: user}); 
                        }
                    })
                    .catch(err => {
                        this.setState({errorMsg: 'Invalid user'}); 
                    })
                })
                .catch(err => {
                    this.setState({errorMsg: 'internal server error'});
                })
            }
        })
        .catch(err => {
            this.setState({errorMsg: 'Database error'});
        })
    }

    render () {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure-wide">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" forhtml="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="text" 
                                        name="name"  
                                        id="name"
                                        onChange={this.onRegisterNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.onregisterEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
                                onClick={this.onRegisterSubmit} 
                                value="Register"/>
                        </div>

                        <div className="lh-copy mt3">
                            <p className='f7 red mb-1'>         {this.state.errorMsg}
                            </p>
                        </div>

                        <div className="lh-copy mt3">
                        <p className='f7 black mb-1'>Already registered?
                            <a href="#0" onClick={() => onRouteChange('signin')} className="f7 link dim black db">Sign In</a>
                        </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Register;