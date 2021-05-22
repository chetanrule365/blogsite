import { Avatar, Button, IconButton } from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import * as EmailValidator from "email-validator";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
import Link from "next/link";
import SimpleHeader from "../../components/Header/SimpleHeader";
import AlertBox from "../../components/AlertBox/AlertBox";
import Loader from "../../components/Loader/Loader";
InitializefirebaseApp();
function Settings() {
    const [user, setUser] = useState<firebase.UserInfo>();
    const [username, setUsername] = useState("");
    const [unameInput, setUnameInput] = useState("");
    const [editName, setEditName] = useState(false);
    const [email, setEmail] = useState<any>("");
    const [editEmail, setEditEmail] = useState(false);
    const [photoUrl, setPhotoUrl] = useState("");
    const [error, setError] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const blogs_ref = firebase.firestore().collection("frontEndBlogs");
    const usersColl_ref = firebase.firestore().collection("users");
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                if (user.displayName) {
                    setUsername(user.displayName);
                    setUnameInput(user.displayName);
                }
                setEmail(user.email);
                if (user.photoURL) setPhotoUrl(user.photoURL);
            } else window.location.replace("/");
        });
    }, []);
    return (
        <>
            <SimpleHeader />
            <div className='profile-page'>
                {showAlert && (
                    <AlertBox
                        message={error}
                        onClose={() => setShowAlert(false)}
                    />
                )}
                {/*
            <IonAlert
                header='Confirm'
                message={error}
                isOpen={showPrompt}
                onDidDismiss={() => setShowPrompt(false)}
                buttons={[
                    {
                        text: "Cancel",
                        role: "cancel",
                    },
                    {
                        text: "Delete Account",
                        handler: async () => {
                            setShowLoading(true);
                            await firebaseApp
                                .auth()
                                .currentUser.delete()
                                .then(async () => {
                                    await blogs_ref
                                        .where(
                                            "createdBy",
                                            "==",
                                            `${user.displayName}`,
                                        )
                                        .get()
                                        .then((data) => {
                                            data.docs.map(async (doc) => {
                                                await firebaseApp
                                                    .storage()
                                                    .refFromURL(
                                                        doc.data().thumbnail,
                                                    )
                                                    .delete();
                                                await blogs_ref
                                                    .doc(doc.id)
                                                    .delete();
                                            });
                                        });
                                    await firebaseApp
                                        .firestore()
                                        .collection("users")
                                        .doc(`${user.uid}`)
                                        .delete();
                                    let favBlogs_ref = firebaseApp
                                        .firestore()
                                        .collection("users")
                                        .doc(`${user.uid}`)
                                        .collection("MyFavBlogs");
                                    await favBlogs_ref.get().then((data) => {
                                        data.docs.map((doc) =>
                                            favBlogs_ref.doc(doc.id).delete(),
                                        );
                                    });
                                    await firebaseApp
                                        .storage()
                                        .refFromURL(photoUrl)
                                        .delete();
                                })
                                .catch((e) => {
                                    setError(e);
                                    setShowAlert(true);
                                });
                            setShowLoading(false);
                        },
                    },
                ]}
            /> */}
                {showLoading && <Loader />}
                <header>
                    <Link href='/'>
                        <IconButton
                            className='icon_butt'
                            style={{ marginLeft: "-16px" }}>
                            <ArrowBackRounded />
                        </IconButton>
                    </Link>
                    <p>About You</p>
                </header>
                <div className='content'>
                    <div className='name'>
                        <div>
                            <p>Username</p>
                            <input
                                id='name'
                                type='text'
                                placeholder='Username'
                                value={
                                    editName
                                        ? unameInput
                                        : username
                                        ? username
                                        : "New User"
                                }
                                readOnly={!editName}
                                onChange={(e) => {
                                    setUnameInput(e.target.value.toUpperCase());
                                }}
                            />
                        </div>
                        <div className='butts'>
                            {editName && (
                                <Button
                                    className='edit_butt'
                                    onClick={async () => {
                                        let uname = unameInput.trim();
                                        if (uname.length > 3) {
                                            setShowLoading(true);
                                            await usersColl_ref
                                                .where("username", "==", uname)
                                                .get()
                                                .then((data) => {
                                                    if (
                                                        data.docs.length === 0
                                                    ) {
                                                        blogs_ref
                                                            .where(
                                                                "createdBy",
                                                                "==",
                                                                username,
                                                            )
                                                            .get()
                                                            .then((data) => {
                                                                firebase
                                                                    .auth()
                                                                    .currentUser?.updateProfile(
                                                                        {
                                                                            displayName:
                                                                                uname,
                                                                        },
                                                                    );
                                                                data.docs.map(
                                                                    (doc) =>
                                                                        blogs_ref
                                                                            .doc(
                                                                                `${doc.id}`,
                                                                            )
                                                                            .update(
                                                                                {
                                                                                    createdBy:
                                                                                        uname,
                                                                                },
                                                                            ),
                                                                );
                                                                firebase
                                                                    .firestore()
                                                                    .collection(
                                                                        "users",
                                                                    )
                                                                    .doc(
                                                                        `${user?.uid}`,
                                                                    )
                                                                    .update({
                                                                        username:
                                                                            uname,
                                                                    });

                                                                setError(
                                                                    "Username Updated.",
                                                                );
                                                                setUsername(
                                                                    uname,
                                                                );
                                                                setShowAlert(
                                                                    true,
                                                                );
                                                            })
                                                            .catch((e) => {
                                                                setError(e);
                                                                setShowAlert(
                                                                    true,
                                                                );
                                                            });
                                                        setEditName(false);
                                                    } else {
                                                        setError(
                                                            "Username already exists",
                                                        );
                                                        setUnameInput(username);
                                                        setShowAlert(true);
                                                    }
                                                })
                                                .finally(() =>
                                                    setShowLoading(false),
                                                );
                                        } else {
                                            setError(
                                                "Username should be atleast 3 chars.",
                                            );
                                            setUnameInput(username);
                                            setShowAlert(true);
                                        }
                                    }}>
                                    Save
                                </Button>
                            )}
                            <label
                                htmlFor='name'
                                onClick={() => {
                                    if (editName) setUnameInput(username);
                                    setEditName(!editName);
                                }}>
                                <Button
                                    className='edit_butt'
                                    style={{ pointerEvents: "none" }}>
                                    {editName ? "Cancel" : "Edit"}
                                </Button>
                            </label>
                        </div>
                    </div>
                    <div className='photo'>
                        <div>
                            <p>Photo</p>
                            <div>
                                <p>
                                    Recommended size: Square, at least 1000
                                    pixels per side. File type: JPG, PNG or GIF.
                                </p>
                                <Avatar
                                    className='avatar'
                                    src={photoUrl}></Avatar>
                            </div>
                        </div>
                        <div className='butts'>
                            <Button
                                className='edit_butt'
                                onClick={async () => {
                                    setShowLoading(true);
                                    await firebase
                                        .auth()
                                        .currentUser?.updateProfile({
                                            photoURL: "",
                                        })
                                        .then(() => {
                                            firebase
                                                .storage()
                                                .refFromURL(photoUrl)
                                                .delete()
                                                .then(() => {
                                                    setError(
                                                        "Profile photo deleted.",
                                                    );
                                                    setPhotoUrl("");
                                                    setShowAlert(true);
                                                })
                                                .catch((e) => {
                                                    setError(e);
                                                    setShowAlert(true);
                                                });
                                        })
                                        .catch((e) => {
                                            setError(e);
                                            setShowAlert(true);
                                        })
                                        .finally(() => setShowLoading(false));
                                }}>
                                Delete
                            </Button>
                            <label htmlFor='avatar'>
                                <Button
                                    className='edit_butt'
                                    style={{ pointerEvents: "none" }}>
                                    Upload
                                </Button>
                            </label>
                            <input
                                style={{ display: "none" }}
                                type='file'
                                id='avatar'
                                onChange={async (e) => {
                                    if (e.target.files) {
                                        let file = e.target.files[0];
                                        if (
                                            file.type === "image/jpeg" ||
                                            file.type === "image/png"
                                        ) {
                                            setShowLoading(true);
                                            await firebase
                                                .storage()
                                                .ref("users")
                                                .child(`${user?.uid}`)
                                                .put(file)
                                                .then(async () => {
                                                    let url = await firebase
                                                        .storage()
                                                        .ref("users")
                                                        .child(`${user?.uid}`)
                                                        .getDownloadURL();
                                                    await firebase
                                                        .auth()
                                                        .currentUser?.updateProfile(
                                                            {
                                                                photoURL: url,
                                                            },
                                                        )
                                                        .then(() => {
                                                            setPhotoUrl(url);
                                                            setError(
                                                                "profile photo updated",
                                                            );
                                                            setShowAlert(true);
                                                        });
                                                })
                                                .catch((e) => {
                                                    setError(
                                                        "Fail to update. Try again...",
                                                    );
                                                    setShowAlert(true);
                                                })
                                                .finally(() =>
                                                    setShowLoading(false),
                                                );
                                            setShowLoading(false);
                                        } else {
                                            setError("Unsupported format.");
                                            setShowAlert(true);
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className='email'>
                        <div>
                            <p>Your Email</p>
                            <input
                                id='email'
                                type='email'
                                placeholder='Email'
                                value={email}
                                readOnly={!editEmail}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className='butts'>
                            {editEmail && (
                                <Button
                                    className='edit_butt'
                                    onClick={async () => {
                                        if (EmailValidator.validate(email)) {
                                            setShowLoading(true);
                                            await firebase
                                                .auth()
                                                .currentUser?.updateEmail(email)
                                                .then(() => {
                                                    setError("Email Updated.");
                                                    setShowAlert(true);
                                                })
                                                .catch((e) => {
                                                    setError(e);
                                                    setShowAlert(true);
                                                    setEmail(user?.email);
                                                })
                                                .finally(() =>
                                                    setShowLoading(false),
                                                );
                                        } else {
                                            setError(
                                                "Invalid Email. Try again...",
                                            );
                                            setShowAlert(true);
                                            setEmail(user?.email);
                                        }
                                        setEditEmail(false);
                                    }}>
                                    Save
                                </Button>
                            )}
                            <label
                                htmlFor='email'
                                onClick={() => {
                                    if (editEmail) setEmail(user?.email);
                                    setEditEmail(!editEmail);
                                }}>
                                <Button
                                    className='edit_butt'
                                    style={{ pointerEvents: "none" }}>
                                    {editEmail ? "Cancel" : "Edit"}
                                </Button>
                            </label>
                        </div>
                    </div>
                    <div className='resetPass'>
                        <p>Reset Password</p>
                        <Button
                            className='butt'
                            onClick={async () => {
                                setShowLoading(true);
                                await firebase
                                    .auth()
                                    .sendPasswordResetEmail(
                                        `${firebase.auth().currentUser?.email}`,
                                    )
                                    .then(() => {
                                        setError(
                                            "A mail has been sent to your Email Adddress to Reset Password.",
                                        );
                                        setShowAlert(true);
                                    })
                                    .catch((error) => {
                                        setError(error);
                                        setShowAlert(true);
                                    })
                                    .finally(() => setShowLoading(false));
                            }}>
                            Reset Password
                        </Button>
                    </div>
                    <div className='deleteAccount'>
                        <p>Delete My Account</p>
                        <Button
                            className='butt'
                            onClick={() => {
                                // setError(
                                //     "This action will delete all the data (including the blogs) regarding to you. Are you sure you want to do this.",
                                // );
                                // setShowPrompt(true);
                            }}>
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;
