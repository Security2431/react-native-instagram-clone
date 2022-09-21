import { View, StyleSheet } from "react-native";
import React from "react";

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.8,
    borderColor: "white",
    opacity: 0.15,
  },
});

export default Divider;
