import { useSelector } from 'react-redux';



const Notification = () => {

  const notification = useSelector(({ notification }) => notification);
  console.log(notification);

  if (notification.notificationText === undefined || notification.notificationText === null) {
    return <span></span>;
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return (
    <div style={style}>
      {notification.notificationText}
    </div>
  );
};

export default Notification;
