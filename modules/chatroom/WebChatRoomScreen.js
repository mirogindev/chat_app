import React from "react";
import ChatRoomView from "./WebChatRoomView";



import WebChatRoomHeaderView from "./WebChatRoomHeaderView";



const WebChatRoomScreen = ({ route }) => {

  return (
    <div style={styles.parentView}>
      <WebChatRoomHeaderView item={route} isNewChat={false} />
      <ChatRoomView chatItem={route} isNewChat={false} />
    </div>
  );
};

export default WebChatRoomScreen;

const styles = {
  parentView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4DDD6"
  }
};
