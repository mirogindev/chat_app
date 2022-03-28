import { webConstants } from "./webConstants";
import moment from "moment"; 
import io from "socket.io-client"; 

export const getTimeInFormat = time => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.TIME_FORMAT);
  return newTime;
};

export const getDateTimeInFormat = time => {
  if (time === "") {
    return "";
  }
  const newTime = moment(time).format(webConstants.DATE_TIME_FORMAT);
  return newTime;
};

export const getUserTypeChatRoom = (item, userId) => {
  console.log("roomItem",item)
  if (item.roomId === "1") {
    return webConstants.OWNER;
  } else if (item.roomId === "2") {
    return webConstants.FRIEND;
  }
}; 

export const getDateTimeStatusFormat = time => {
  if (time === '') {
    return '';
  }
  return `Last update ${getDateTimeInFormat(time)}`;
};
