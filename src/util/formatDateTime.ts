export const formatDateTime = (dateTime, format) => {
  var d = dateTime.getDate();
  var m = dateTime.getMonth() + 1;
  var h = dateTime.getHours();
  var i = dateTime.getMinutes();
  format = format.replace(/d/g, d > 9 ? d : `0${d}`);
  format = format.replace(/m/g, m > 9 ? m : `0${m}`);
  format = format.replace(/Y/g, dateTime.getFullYear());
  format = format.replace(/H/g, h > 9 ? h : `0${h}`);
  format = format.replace(/i/g, i > 9 ? i : `0${i}`);

  return format;
};

export const mySQLDateToJsDate = (mySQLDate) => {
  var dateTime = mySQLDate.includes("T") ? mySQLDate.split("T") : mySQLDate.split(" ");
  var dateParts = dateTime[0].split("-");
  var timeParts = dateTime[1].split(":");
  return new Date(parseInt(dateParts[0]), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2], 10), parseInt(timeParts[0], 10), parseInt(timeParts[1], 10), parseInt(timeParts[2], 10), 0);
};

export const toMySQLDateTime = (dateTime) => {
  var dateTimeParts = dateTime.split(" ");
  var dateParts = dateTimeParts[0].split("/");
  var timeParts = dateTimeParts[1].split(":");
  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:00`;
}