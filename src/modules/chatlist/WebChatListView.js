import React, { useEffect, useReducer } from "react";
import WebChatListItem from "./WebChatListItem";
import { webConstants } from "../../utils/webConstants";
import EmptyComponent from "../../components/WebEmptyComponent";
import { WHITE } from "../../utils/webColors";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import {
  initialChatListState,
  chatListReducer,
  CHAT_LIST,
  CHAT_ITEM,
  REFRESH,
} from "./WebChatListReducer";


const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 60,
});

const WebChatListView = ({ onItemClick, userChatList }) => {
  var [state, dispatch] = useReducer(chatListReducer, initialChatListState);

  var { chatList, chatItem, refresh, userId } = state;


  useEffect(() => {
    if (chatItem != "") {
      renderChats();
    }
  }, [chatItem]);

  async function renderChats() {
    let chatArray = chatList;
    console.log("Message CHAT Received => ", JSON.stringify(chatItem));

    var isMatch = false;
    if (chatArray.length > 0) {
      for (let i = 0; i < chatArray.length; i++) {
        const element = chatArray[i];
        if (chatItem && element.roomId === chatItem.roomId) {
          // Increment unread count
          chatItem = element

          // Since chat item received is an object to convert it to array and they re initialise
          // if (chatItem.chat.length <= 0) {
          chatItem.chat = [chatItem.chat];
          // }
          console.log("Selected Chat Received => ", JSON.stringify(chatItem));
          chatArray[i] = chatItem;
          isMatch = true;
          break;
        }
      }

      console.log("Message CHAT AFTER Received => ", JSON.stringify(chatItem));

      dispatch({ type: CHAT_LIST, payload: chatArray });
      console.log(
        `FINAL CHAT ARRAY ${refresh} => `,
        "JSON.stringify(chatArray)"
      );
    } else {
      // For new chat
      if (chatItem.chatUnreadCount.type === "add") {
        dispatch({ type: REFRESH, payload: true });
      }
    }
  }


  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 0,
        backgroundColor: WHITE,
      }}
    >
      {chatList.length === 0 && (
        <EmptyComponent message={"No chats, contacts or messages found"} />
      )}

      <List
        style={{
          height: "100%",
          width: "100%",
          outline: "none",
        }}
        rowCount={chatList.length}
        height={window.innerHeight}
        width={window.innerWidth - window.innerWidth / 3.2}
        rowHeight={cache.rowHeight}
        rowRenderer={({ index, parent, key, style }) => (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <WebChatListItem
              item={chatList[index]}
              position={index}
              onItemClick={onItemClick}
            />
          </CellMeasurer>
        )}
        overscanRowCount={0}
        data={refresh}
      />

      {/* {chatList.map(function(item, i) {
        return (
          <WebChatListItem item={item} position={i} onItemClick={onItemClick} />
        );
      })} */}
      {/* <Button className={classes.btnView}>
        <img src={CHAT} className={classes.thumbView} />
      </Button> */}
    </div>
  );
};

export default WebChatListView;

// const useStyles = makeStyles({
//   btnView: {
//     marginTop: 15,
//     marginRight: -5,
//     width: 65,
//     height: 65,
//     justifyContent: "center",
//     alignSelf: "center",
//     backgroundColor: LIGHT_GREEN,
//     position: "absolute",
//     bottom: 20,
//     right: 20
//   },
//   thumbView: {
//     width: 30,
//     height: 30,
//     justifyContent: "center",
//     tintColor: WHITE
//   }
// });
