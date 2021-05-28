import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

const getTimeAgoFromObject = (time) => {
  const newDate = Date.parse(time);
  return timeAgo.format(newDate);
};

export default getTimeAgoFromObject;
