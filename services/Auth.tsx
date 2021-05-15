import firebase from "firebase";
import InitializefirebaseApp from "../services/InitializefirebaseApp";
InitializefirebaseApp();
const auth = firebase.auth();
const signInWithGoogle = (setError: (e: string) => void) => {
    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res: firebase.auth.UserCredential) => {
            if (res.credential)
                auth.signInWithCredential(res.credential).then(
                    async (result) => {
                        if (result.user)
                            await firebase
                                .firestore()
                                .collection("users")
                                .doc(`${result.user.uid}`)
                                .set({
                                    username:
                                        result.user.displayName &&
                                        result.user.displayName.toUpperCase(),
                                });
                    },
                );
        })
        .catch((e) => setError(e));
};
const signUpWithEmail = async (
    name: string,
    email: string,
    password: string,
    setError: (e: string) => void,
) => {
    let users_ref = firebase.firestore().collection("users");
    const uname = name.toUpperCase();
    users_ref
        .where("username", "==", uname)
        .get()
        .then(async (data) => {
            if (data.docs.length === 0) {
                await auth
                    .createUserWithEmailAndPassword(email, password)
                    .then(async (result) => {
                        if (result.user)
                            await users_ref
                                .doc(result.user.uid)
                                .set({
                                    username: uname,
                                })
                                .then(async () => {
                                    if (auth.currentUser)
                                        await auth.currentUser.updateProfile({
                                            displayName: uname,
                                        });
                                });
                    })
                    .catch((e) => {
                        setError(e);
                    });
            } else setError("Username already exists. Try another...");
        })
        .catch((e) => {
            setError(e);
        });
};
const signInWithEmail = async (
    email: string,
    password: string,
    setError: (e: string) => void,
) => {
    await auth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
            if (result.user) localStorage.setItem("uid", `${result.user.uid}`);
        })
        .catch((e) => {
            setError(e);
        });
};
export { signInWithGoogle, signUpWithEmail, signInWithEmail };
