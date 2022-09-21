import { View, Image, TextInput, Text, Button } from "react-native";
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import Divider from "../Divider";
import validUrl from "valid-url";

import { db, firebase } from "../../firebase";

const PLACEHOLDER_IMG =
  "https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-picture-icon-png-image_695350.jpg";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("Url is required"),
  caption: Yup.string().max(2200, "Caption is reached a character limits"),
});

const FormikPostUploader = ({ navigation }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedUserIn, setCurrentLoggedUserIn] = useState(null);

  const getUsername = () => {
    const user = firebase.auth().currentUser;
    // FIXME: overkill approach to get username
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          setCurrentLoggedUserIn({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        })
      );

    return unsubscribe;
  };

  useEffect(() => {
    getUsername();
  }, []);

  const uploadPostToFirebase = (imageUrl, caption) => {
    const unsubscribe = db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageUrl,
        user: currentLoggedUserIn.username, // TODO: rename field to username
        profilePicture: currentLoggedUserIn.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(() => {
        navigation.goBack();
      });

    return unsubscribe;
  };

  return (
    <View>
      <Formik
        initialValues={{ caption: "", imageUrl: "" }}
        validationSchema={uploadPostSchema}
        onSubmit={(values) => {
          uploadPostToFirebase(values.imageUrl, values.caption);
        }}
        validateOnMount={true}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => {
          return (
            <>
              <View
                style={{
                  margin: 20,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Image
                  source={{
                    uri: validUrl.isUri(thumbnailUrl)
                      ? thumbnailUrl
                      : PLACEHOLDER_IMG,
                  }}
                  style={{ width: 100, height: 100 }}
                />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <TextInput
                    style={{ color: "white", fontSize: 20 }}
                    placeholder="Write a caption..."
                    placeholderTextColor="gray"
                    multiline={true}
                    onChangeText={handleChange("caption")}
                    onBlur={handleBlur("caption")}
                    value={values.caption}
                  />
                </View>
              </View>
              <Divider />
              <TextInput
                onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                style={{ color: "white", fontSize: 18 }}
                placeholder="Enter Image Url"
                placeholderTextColor="gray"
                onChangeText={handleChange("imageUrl")}
                onBlur={handleBlur("imageUrl")}
                value={values.imageUrl}
              />
              {errors.imageUrl && (
                <Text style={{ fontSize: 10, color: "red" }}>
                  {errors.imageUrl}
                </Text>
              )}
              <Button
                onPress={handleSubmit}
                title="Share"
                disabled={!isValid}
              />
            </>
          );
        }}
      </Formik>
    </View>
  );
};

export default FormikPostUploader;
