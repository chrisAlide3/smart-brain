import React from 'react';

const Navigation = ( {clearUser, onRouteChange, isSignedIn} ) => {
        if (isSignedIn) {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                   <p onClick={()=> onRouteChange('profile')} className='f5 link dim black underline pa3 pointer'>Profile</p>

                   <p onClick={() => clearUser()} className='f5 link dim black underline pa3 pointer'>Sign out</p>
                </nav>
            );
        } else {
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={()=> onRouteChange('signin')} className='f5 link dim black underline pa3 pointer'>Sign In</p>
                    <p onClick={()=> onRouteChange('register')} className='f5 link dim black underline pa3 pointer'>Register</p>
                </nav>
            );
        }
}

export default Navigation;