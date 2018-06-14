import React from 'react';

class SignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            signinEmail: '',
            signinPassword: '',
            errorMsg: '',
        }
    }

    onSigninEmailChange = (event) => {
        this.setState({signinEmail: event.target.value});
    }


    onSigninPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value});
    }

    onSigninSubmit = () => {
     
        fetch('https://guarded-ridge-12145.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail, 
                password: this.state.signinPassword
                })
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
            this.setState({errorMsg: 'There was a problem, try again later'});
        })
    }

    render () {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure-wide">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" forhtml="email-address">Email</label>
                                <input  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="email" 
                                        name="email-address"  
                                        id="email-address"
                                        onChange={this.onSigninEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        type="password" 
                                        name="password"  
                                        id="password"
                                        onChange={this.onSigninPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                        <input  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                // onClick={() => props.onRouteChange('home')}
                                onClick={this.onSigninSubmit}
                                value="Sign in"/>
                        </div>

                       
                        <div className="lh-copy mt3">
                            <p style={{color: 'red'}}>{this.state.errorMsg}</p>
                        </div>
                    
                        <div className="lh-copy mt3">
                        <a href="#0" onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</a>
                        </div>
                    </div>
                </main>
            </article>

        );
    }
}

export default SignIn;