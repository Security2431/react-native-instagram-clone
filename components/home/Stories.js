import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React from "react";
import { USERS } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((story) => (
          <View key={story.id} style={{ alignItems: "center" }}>
            <Image style={styles.story} source={{ uri: story.image }} />
            <Text style={{ color: "white" }}>
              {story.user.length > 7
                ? story.user.slice(0, 6).toLowerCase() + " ... "
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginLeft: 18,
    borderWidth: 3,
    borderColor: "#FF8501",
  },
});

export default Stories;
