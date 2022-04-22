
const Notification = ({ notification }) => {
  if (notification === undefined || notification === null) {
    return null;
  }

  return (
    <div className={notification.type===undefined? 'error': 'success'}>
      {notification.message}
    </div>
  );
};

export default Notification;