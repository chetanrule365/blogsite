import { Button, IconButton } from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import {
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
} from "../../services/Auth";
import firebase from "firebase";
import Link from "next/link";
import SimpleHeader from "../../components/Header/SimpleHeader";

function Login() {
    const [loginType, setLoginType] = useState("login");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                window.location.replace("/");
            }
        });
    }, []);
    return (
        <>
            <SimpleHeader />
            <Link href='/'>
                <IconButton className='icon_butt' slot='start'>
                    <ArrowBackRounded />
                </IconButton>
            </Link>

            <div className='login_con'>
                <div className='login'>
                    <p className='title'>Join FEW.com</p>
                    <Button
                        className='butts'
                        onClick={() =>
                            signInWithGoogle((e) => {
                                setError(e);
                                setShowAlert(true);
                                setLoading(false);
                            })
                        }>
                        <img src={"/assets/googleIcon.svg"} alt='google' />
                        {loginType === "login"
                            ? "Sign in with Google"
                            : "Sign Up with Google"}
                    </Button>
                    <p style={{ fontSize: "28px" }}>OR</p>
                    <form action=''>
                        {loginType === "signup" && (
                            <input
                                type='text'
                                placeholder='username'
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                        )}
                        <input
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <input
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                        />
                        {loginType === "signup" && (
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                value={cPassword}
                                onChange={(e) => setcPassword(e.target.value)}
                            />
                        )}
                        <Button
                            className='button'
                            onClick={() => {
                                setLoading(true);
                                if (loginType === "login") {
                                    signInWithEmail(
                                        email,
                                        password,
                                        (e: any) => {
                                            setError(e);
                                            setShowAlert(true);
                                            setLoading(false);
                                        },
                                    );
                                } else if (loginType === "signup") {
                                    if (name.trim().length >= 3) {
                                        if (password === cPassword) {
                                            signUpWithEmail(
                                                name.trim(),
                                                email.trim(),
                                                password,
                                                (e) => {
                                                    setError(e);
                                                    setShowAlert(true);
                                                    setLoading(false);
                                                },
                                            );
                                        } else {
                                            setError(
                                                "Passwords do not match. Try again... ",
                                            );
                                            setShowAlert(true);
                                        }
                                    } else {
                                        setError(
                                            "Username should contain atleast 3 chars.",
                                        );
                                        setShowAlert(true);
                                    }
                                }
                                setLoading(false);
                            }}>
                            {loginType === "login" ? "Sign In" : "Sign Up"}
                        </Button>
                    </form>

                    {loginType === "login" ? (
                        <div className='toggle_sec'>
                            <p>Don't have an account? </p>
                            <Button
                                className='button'
                                onClick={() => setLoginType("signup")}>
                                Sign Up
                            </Button>
                        </div>
                    ) : (
                        <div className='toggle_sec'>
                            <p>Already had an account? </p>
                            <Button
                                className='button'
                                onClick={() => setLoginType("login")}>
                                Sign In
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;
