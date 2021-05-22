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
    email: string,
    password: string,
    setError: (e: string) => void,
) => {
    await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((e) => setError(e));
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
