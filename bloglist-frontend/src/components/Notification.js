import { useSelector } from 'react-redux';

const style = {
  border: 'solid',
  padding: 10,
  borderWidth: 1,
};

const Notification = () => {
  const notification = useSelector(({ notification }) => notification);
  if (
    notification.notificationText === undefined ||
    notification.notificationText === null
  ) {
    return <span></span>;
  }
  return <div style={style}>{notification.notificationText}</div>;
};

export default Notification;
