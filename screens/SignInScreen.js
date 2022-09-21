import { View, StyleSheet, Image } from "react-native";
import React from "react";
import SignInForm from "../components/signInScreen/SignInForm";

const INSTAGRAM_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png";

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
      </View>
      <SignInForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    backgroundTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default SignInScreen;

// TODO: tutorial video
// https://youtu.be/UbixZZDjrdU?t=11729
// https://www.youtube.com/c/CleverProgrammer/search?query=blockchain
// https://www.youtube.com/watch?v=GPv_SbfumJw
