import {webConstants} from '../../utils/webConstants';

export const initialChatListState = {
  chatList: [{chatUnreadCount:1, roomId: "1",chat:[{userName:"Vasya",chatName:"VasyaChat"}]},{chatUnreadCount:2, roomId: "2",chat:[{userName:"Vasya",chatName:"VasyaChat"}]}],
  chatItem: '1',
  refresh: true,
  userId: '',
};

export const REFRESH = 'REFRESH',
  CHAT_LIST = 'CHAT_LIST',
  CHAT_ITEM = 'CHAT_ITEM';

export const chatListReducer = (state, action) => {
  console.log(action.type, action.payload);

  switch (action.type) {
    case CHAT_LIST:
      return {...state, chatList: action.payload}; 

    case CHAT_ITEM:
      return {...state, chatItem: action.payload}; 

    case REFRESH:
      return {...state, refresh: action.payload}; 

    case webConstants.USER_ID:
      return {...state, userId: action.payload};
      break;
  }
};
