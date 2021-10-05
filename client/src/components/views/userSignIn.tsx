import React from 'react'; 
import { useState } from 'react';
import '../components.css';

const UserSignIn = () => {

    const [userAuth, setUserAuth] = useState(false);
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const checkAuth = (username, password) => {
        if(username=="username" && password=="password") {
            handleErrDisplay(false,"signInForm__successElement")
            setUserAuth(true);
        }
        else if(username!="username" || password!="password") {
            handleErrDisplay(true, "usr-pwdError")
        }
    }

    const handleErrDisplay = (display, element) => {
        if(display) {
            document.getElementById(`${element}`)!.classList.add("signInForm__errElement--display");
        }
        else {
            console.log(document.getElementById(`${element}`))
            document.getElementById("usr-pwdError")!.classList.remove("signInForm__errElement--display")
        }
    }

    return <>
    <div className="signInForm">
        {!userAuth ?
        <>
            <div id="form-login" className="signInForm__form">
                <h1>Login</h1>
                <input type="text" id="signInUsr" name="username" className="signInForm__form__input" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} ></input>
                <input type="password" id="signInPwd" name="password" className="signInForm__form__input" placeholder="Password" value={pwd} onChange={(event) => setPwd(event.target.value)} ></input>
                <button className="signInForm__form__submit"
                    onClick={() => {
                        checkAuth(username, pwd)}
                    }>
                    Submit</button>
            </div>
            <div className="signInForm__errElements">
                <div id="usr-pwdError" className="signInForm__errElement">
                    There is no user with these credentials.
                </div>
            </div>
        </>
        :
        <div className="signInForm--success">
            <div id="signInForm__successElement" className="signInForm__successElement">
                    You're successfully logged in!
            </div>
        </div>}
    </div>
    </>
};

export default UserSignIn;