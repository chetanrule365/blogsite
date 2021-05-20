import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Add, ArrowBackRounded } from "@material-ui/icons";
import firebase from "firebase";
import InitializefirebaseApp from "../../services/InitializefirebaseApp";
import Link from "next/link";
import SimpleHeader from "../../components/Header/SimpleHeader";
import AlertBox from "../../components/AlertBox/AlertBox";
import Loader from "../../components/Loader/Loader";
InitializefirebaseApp();
function Publish(props: any) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [inDetail, setIndetail] = useState("");
    const [reactCode, setReactCode] = useState("");
    const [scssCode, setScssCode] = useState("");
    const [jsCode, setJsCode] = useState("");
    const [thumbnail, setThumbnail] = useState<any>("");
    const [isReact, setIsReact] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showPublishAlert, setshowPublishAlert] = useState(false);
    const [error, setError] = useState("Please Fill Out Required Fields.");
    const [loading, setLoading] = useState(false);
    const [fromPropsThumbnail, setFromPropsThumbnail] = useState("");
    const [likes, setLikes] = useState(0);
    const publish = async () => {
        if (!title) {
            setError("Blog Title is missing");
            setShowAlert(true);
        } else if (!desc) {
            setError("Blog Description is missing");
            setShowAlert(true);
        } else if (!thumbnail) {
            setError("Blog Thumbnail is missing");
            setShowAlert(true);
        } else {
            if (thumbnail.size >= 5000000) {
                setError("Thumbnail size should be <= 5MB. Try again");
                setShowAlert(true);
            } else {
                setLoading(true);
                let thumbnail_ref = firebase
                    .storage()
                    .ref("thumbnails")
                    .child(`${thumbnail.name}${Date.now()}`);
                await thumbnail_ref
                    .put(thumbnail)
                    .then(async () => {
                        const url = await thumbnail_ref.getDownloadURL();
                        let newDoc = firebase
                            .firestore()
                            .collection("frontEndBlogs")
                            .doc();

                        await newDoc.set({
                            id: newDoc.id,
                            title: title,
                            desc: desc,
                            inDetail: inDetail,
                            isReact: isReact,
                            reactCode: reactCode,
                            scssCode: scssCode,
                            jsCode: isReact ? "no code" : jsCode,
                            thumbnail: url,
                            timestamp: Date.now(),
                            createdBy: firebase.auth().currentUser?.displayName,
                            likes: likes,
                        });
                        setError("Hurray!!! Your blog Published.");
                        setshowPublishAlert(true);
                    })
                    .catch((e) => {
                        setError(e);
                        setShowAlert(true);
                    })
                    .finally(() => setLoading(false));
            }
        }
    };
    useEffect(() => {
        if (props.location && props.location.state) {
            let docId = props.location.state.id;
            firebase
                .firestore()
                .collection("frontEndBlogs")
                .doc(docId)
                .get()
                .then((doc) => {
                    let data = doc.data();
                    if (data) {
                        setTitle(data.title);
                        setDesc(data.desc);
                        setIndetail(data.inDetail);
                        setIsReact(data.isReact);
                        setReactCode(data.reactCode);
                        setScssCode(data.scssCode);
                        setJsCode(data.jsCode);
                        setThumbnail(data.thumbnail);
                        setFromPropsThumbnail(data.thumbnail);
                        setLikes(data.likes);
                    }
                });
        }
    }, []);
    return (
        <div className='admin'>
            <SimpleHeader />
            <Link href='/'>
                <IconButton style={{ marginLeft: "-16px" }}>
                    <ArrowBackRounded />
                </IconButton>
            </Link>
            {showPublishAlert && (
                <AlertBox
                    message={error}
                    onClose={() => {
                        setshowPublishAlert(false);
                        window.location.replace("/myblogs");
                    }}
                />
            )}
            {showAlert && (
                <AlertBox message={error} onClose={() => setShowAlert(false)} />
            )}
            {loading && <Loader />}
            <div>
                <div className='form'>
                    <p>Publish your favourite blog.</p>
                    <input
                        type='text'
                        placeholder='Blog Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        cols={30}
                        rows={5}
                        placeholder='Blog short Description'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}></textarea>
                    <textarea
                        cols={30}
                        rows={10}
                        placeholder='Blog Indetailed Description(optional)'
                        value={inDetail}
                        onChange={(e) =>
                            setIndetail(e.target.value)
                        }></textarea>
                    <input
                        type='file'
                        id='thumbnail'
                        style={{ display: "none" }}
                        onChange={(e) => {
                            if (e.target.files) setThumbnail(e.target.files[0]);
                        }}
                    />
                    <div className='preview'>
                        {thumbnail && (
                            <img
                                src={
                                    typeof thumbnail === "string"
                                        ? thumbnail
                                        : URL.createObjectURL(thumbnail)
                                }
                                alt='preview'
                            />
                        )}
                    </div>
                    <label htmlFor='thumbnail' className='upload_butt'>
                        <Add />
                        Upload Thumbnail
                    </label>
                    {/* <IonItem className='category'>
                        <IonLabel>Category: </IonLabel>
                        <IonSelect
                            value={category}
                            placeholder='Category'
                            onIonChange={(e) => setCategory(e.detail.value)}>
                            <IonSelectOption
                                value='frontend'
                                className='select'>
                                Frontend
                            </IonSelectOption>
                            <IonSelectOption value='backend' className='select'>
                                Backend
                            </IonSelectOption>
                        </IonSelect>
                    </IonItem> */}
                    <FormControlLabel
                        className='switch'
                        control={
                            <Checkbox
                                value={isReact}
                                onChange={(e) => setIsReact(e.target.checked)}
                                style={{ color: "#44a3f1" }}
                            />
                        }
                        label='Are you publishing ReactJs Code?'
                        labelPlacement='start'
                    />
                    <p className='note'>
                        * Make sure that you format the code(tabs and new lines)
                        for good looking code.
                    </p>
                    <textarea
                        cols={30}
                        rows={10}
                        placeholder={
                            isReact
                                ? "React code goes here."
                                : "HTML code goes here."
                        }
                        value={reactCode}
                        onChange={(e) =>
                            setReactCode(e.target.value)
                        }></textarea>
                    <textarea
                        cols={30}
                        rows={10}
                        placeholder='SCSS/CSS code goes here.(optional)'
                        value={scssCode}
                        onChange={(e) =>
                            setScssCode(e.target.value)
                        }></textarea>
                    {!isReact && (
                        <textarea
                            cols={30}
                            rows={10}
                            placeholder='JS code goes here.(optional)'
                            value={jsCode}
                            onChange={(e) =>
                                setJsCode(e.target.value)
                            }></textarea>
                    )}
                </div>
            </div>

            <div className='footer'>
                <Button
                    color='primary'
                    className='publish'
                    onClick={(e) => {
                        e.preventDefault();
                        publish();
                    }}>
                    Publish
                </Button>
            </div>
        </div>
    );
}

export default Publish;
