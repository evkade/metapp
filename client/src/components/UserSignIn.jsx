import React from 'react'; 

const UserSignIn = () => {
    return <>
    <div className="signInForm">
        <h1>Login</h1>
        <form id="form-login" className="signInForm__form">
        </form>
        <div className="signInForm__errElement">
            <div id="passwordError" className="signInForm__errElement--pwd">
                The password is incorrect.
            </div>
            <div id="usernameError" className="signInForm__errElement--usr">
                The username is incorrect.
            </div>
        </div>
    </div>
    </>
};

export default UserSignIn;