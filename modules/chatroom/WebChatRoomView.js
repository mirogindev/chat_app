import React, { useState, useRef, useEffect } from "react";

import ChatRoomLeftItem from "./WebChatRoomLeftItem";
import ChatRoomRightItem from "./WebChatRoomRightItem";
import { webConstants } from "../../utils/webConstants";
import ChatTextInput from "./WebChatTextInput";

import {
  getUserTypeChatRoom,
} from "../../utils/webHelperFunctions";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import WhatsapBG from "../../assets/images/WhatsappBG.png";



const ChatRoomView = ({ chatItem, isNewChat }) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [userId, setUserId] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [height, setHeight] = useState(80);
  const [message, setMessage] = useState("");
  const flatList = useRef();
  const inputRef = useRef();

  const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 80,
  });


  useEffect(() => {
    if (chatItem.roomId === "1") {
        setChatRoomList([{chatMessage:"dsdsdsddsdsddssd34334434334dssds",chatTime: new Date(),userId:"1"}]);
    }  else {
        setChatRoomList([{chatMessage: "dsdsxxzxzxvvvvddssds", chatTime: new Date(),userId:"2"}]);
    }
  }, [chatItem]);






  const onSendMessage = (text) => {
    setChatRoomList([...chatRoomList,{chatMessage: text, chatTime: new Date(),userId:"2"}])
  };

  function modifyRowHeight(event) {
    if (event.target.value != "") {
      setHeight(inputRef.current.clientHeight);
      if (chatRoomList.length > 0) {
        setTimeout(() => {
          flatList.current.measureAllRows();
        }, 1500);
        flatList.current.scrollToRow(chatRoomList.length);
      }
    } else {
      setTimeout(() => {
        setHeight(inputRef.current.clientHeight);
        flatList.current.measureAllRows();
        flatList.current.scrollToRow(chatRoomList.length);
      }, 200);
    }
  }

  const rowRenderer = ({ index, parent, key, style, isScrolling }) => {
    var item = chatRoomList[index];
    let userType = webConstants.OWNER
    if (item.userId == "2") {
        userType = webConstants.FRIEND
    }
    if (userType === webConstants.OWNER) {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ChatRoomRightItem item={item} styleList={style} />
        </CellMeasurer>
      );
    } else {
      return (
        <CellMeasurer
          key={key}
          cache={cache}
          parent={parent}
          columnIndex={0}
          rowIndex={index}
        >
          <ChatRoomLeftItem item={item} styleList={style} />
        </CellMeasurer>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        background: "url(" + WhatsapBG + ")",
        height: "92%",
      }}
    >
      <div
        style={{
          backgroundColor: "#E4DDD6",
          height: "100%",
          zIndex: "100",
          opacity: "0.95",
        }}
      />

      <div
        style={{
          position: "absolute",
          zIndex: "1000",
          height: "92%",
          width: "70%",
        }}
      >
        <List
          ref={flatList}
          style={{
            height: "100%",
            width: "100%",
            outline: "none",
            paddingBottom: height === "" ? 80 : height,
            paddingTop: 10,
          }}
          rowCount={chatRoomList.length}
          height={window.innerHeight - 120}
          width={window.innerWidth - window.innerWidth / 3.2}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={rowRenderer}
          scrollToAlignment={"end"}
          data={refresh}
        />
      </div>

      <div
        ref={inputRef}
        style={{
          position: "fixed",
          zIndex: "2000",
          width: "70%",
          marginBottom: 0,
          resize: "vertical",
          bottom: 0,
          maxHeight: 160,
          minHeight: 60,
          overflow: "hidden",
        }}
      >
        <ChatTextInput
          onSendMessage={(text) => onSendMessage(text)}
          onTyping={(event) => {
            modifyRowHeight(event);
          }}
        />
      </div>
    </div>
  );

  function renderRow(item) {
    let userType = getUserTypeChatRoom(item, userId);
    if (userType === webConstants.OWNER) {
      return <ChatRoomRightItem item={item} />;
    } else {
      return <ChatRoomLeftItem item={item} />;
    }
  }
};

export default ChatRoomView;
