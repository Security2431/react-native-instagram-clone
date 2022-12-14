import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Divider from "../Divider";
import { firebase, db } from "../../firebase";

const POST_FOOTER_ICONS = [
  {
    name: "Like",
    imageurl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like.png",
    likedImageUrl: "https://img.icons8.com/ios-glyphs/90/fa314a/like.png",
  },
  {
    name: "Comment",
    imageurl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/speech-bubble.png",
  },
  {
    name: "Share",
    imageurl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/sent.png",
  },
  {
    name: "Save",
    imageurl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark.png",
  },
];

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => console.log("Document successfully updated!"))
      .catch((error) => console.error("Error updating document ", error));
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={{ uri: post.profilePicture }} style={styles.story} />
        <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
          {post.user}
        </Text>
      </View>
      <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ width: "100%", height: 450 }}>
      <Image
        source={{ uri: post.imageUrl }}
        style={{ height: "100%", resizeMode: "cover" }}
      />
    </View>
  );
};

const PostFooter = ({ handleLike, post }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.leftFooterIconsContainer}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={{
              uri: post.likes_by_users.includes(
                firebase.auth().currentUser.email
              )
                ? POST_FOOTER_ICONS[0].likedImageUrl
                : POST_FOOTER_ICONS[0].imageurl,
            }}
          />
        </TouchableOpacity>
        <Icon
          imgStyle={styles.footerIcon}
          imgUrl={POST_FOOTER_ICONS[1].imageurl}
        />
        <Icon
          imgStyle={[styles.footerIcon, styles.shareIcon]}
          imgUrl={POST_FOOTER_ICONS[2].imageurl}
        />
      </View>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <Icon
          imgStyle={[styles.footerIcon]}
          imgUrl={POST_FOOTER_ICONS[3].imageurl}
        />
      </View>
    </View>
  );
};

const Icon = ({ imgStyle, imgUrl }) => {
  return (
    <TouchableOpacity>
      <Image style={imgStyle} source={{ uri: imgUrl }} />
    </TouchableOpacity>
  );
};

const Likes = ({ post }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 4 }}>
      <Text style={{ color: "white", fontWeight: "600" }}>
        {post.likes_by_users.length.toLocaleString("en")} likes
      </Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: "white" }}>
        <Text style={{ fontWeight: "600" }}>{post.user}</Text>{" "}
        <Text>{post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentsSection = ({ post }) => {
  if (post.comments.length === 0) {
    return null;
  }

  return (
    <View style={{ marginTop: 5 }}>
      <Text style={{ color: "gray" }}>
        View
        {post.comments.length > 1 ? " all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    </View>
  );
};

const Comments = ({ post }) => {
  return (
    <>
      {post.comments.map((comment) => {
        return (
          <View key={comment.id} style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ color: "white" }}>
              <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
              {comment.comment}
            </Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#FF8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  shareIcon: {
    transform: [
      {
        rotate: "320deg",
      },
    ],
    marginTop: -3,
  },
  leftFooterIconsContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },
});

export default Post;
