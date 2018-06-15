import React from 'react';

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            profileId: 0,
            profileName: '',
            profileEmail: '',
        };
    }

    componentDidMount = () => {
        const { id } = this.props;
        fetch('https://guarded-ridge-12145.herokuapp.com/profile/'+id, {
            method: 'get',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(user => {
                document.getElementById('profileName').value = user.name;
                document.getElementById('profileEmail').value = user.email;
                this.setState({profileId: id});
                this.setState({profileName: user.name});
                this.setState({profileEmail: user.email});
            })
            .catch(err => {
                console.log('Database error');
            })
    }

    onProfileNameChange = (event) => {
        this.setState({profileName: event.target.value});
    }

    onProfileEmailChange = (event) => {
        this.setState({profileEmail: event.target.value});
    }

    onSaveProfile = () => {
        fetch('https://guarded-ridge-12145.herokuapp.com/profile', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.state.profileId,
                name: this.state.profileName,
                email: this.state.profileEmail
            })
        })
            .then(response => response.json())
            .then(user => {
                this.props.setUser(user[0]);
                this.props.onRouteChange('home');
            })
            .catch(err => {
                console.log('Database error');
            })
    }

    onDeleteProfile = () => {
        fetch('https://guarded-ridge-12145.herokuapp.com/profile/'+this.props.id, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
        })
            .then(response => response.json())
            .then(status => {
                if (status === 'deleted') {
                    this.props.onRouteChange('logout');
                    // this.props.clearUser();
                } else {
                    console.log('Error: user not deleted');
                }
            })
            .catch(err => {
                console.log('Database error');
            })
    }


    render() {
        const {onRouteChange} = this.props;
        return(
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure-wide">
                            <fieldset id="register" className="ba b--transparent ph0 mh0">
                                <legend className="f3 fw6 ph0 mh0">Profile</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" forhtml="profileName">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="text" 
                                            name="profileName"  
                                            id="profileName"
                                            // value={this.state.profileName}
                                            onChange={this.onProfileNameChange}
                                    />
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" forhtml="profileEmail">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="email" 
                                            name="profileEmail"  
                                            id="profileEmail"
                                            // value={this.state.profileEmail}
                                            onChange={this.onProfileEmailChange}
                                    />
                                </div>
                                {/* <div className="mv3">
                                    <label className="db fw6 lh-copy f6" forhtml="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                            type="password" 
                                            name="password"  
                                            id="password"
                                            // onChange={this.onRegisterPasswordChange}
                                    />
                                </div> */}
                            </fieldset>
                            <div className="mt3">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
                                    onClick={this.onSaveProfile} 
                                    value="Save"
                            />

                             <input className="b ph3 ml2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
                                    onClick={this.onDeleteProfile} 
                                    value="Delete"
                            />

                            <button className="b ph3 ml2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    onClick={() => onRouteChange('home')} 
                            >Cancel</button>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        );
    }
}

export default Profile;