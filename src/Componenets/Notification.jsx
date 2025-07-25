import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaBellSlash } from "react-icons/fa";
import '../css/Notification.css';

const Notification = ({ show, setShow }) => {
  const totalNotification = 50;
  const notifications = [
    {
      id: 1,
      title: "Assignment Due",
      message: "Your Calculus assignment is due tomorrow!",
      time: "2 hours ago",
      isFavorite: true,
    },
    {
      id: 2,
      title: "New Course Added",
      message: "Data Structures has been added to your schedule.",
      time: "Yesterday",
      isFavorite: false,
    },
    {
      id: 3,
      title: "Weekly Progress",
      message: "You completed 80% of your JavaScript course this week!",
      time: "3 days ago",
      isFavorite: true,
    },
  ];

  return (
    <div className={`notification-panel${show ? " open" : ""}`}>
      <div className="notification-header">
        <div className="top-header">
          <div className="notification-h2">
            <h2>Notification</h2>
          </div>
          <div className="notification-cancel-icon" onClick={() => setShow(false)}>
            <FaTimes className="cancel-icon" />
          </div>
        </div>
        <div className="middle">
          <h3>{totalNotification} Notification</h3>
          <div className="notification-search">
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="lower-header">
          <div className="notification-links">
            <Link to="#">
              All <span>{10}</span>
            </Link>
            <Link to="#">
              Archive <span>{6}</span>
            </Link>
            <Link to="#">
              Favourite <span>{2}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="notification-body">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <FaBellSlash size={40} color="#bbb" />
            <p>No notifications to display</p>
          </div>
        ) : (
          notifications.map((note) => (
            <div className="notification-item" key={note.id}>
              <div className="notification-item-header">
                <h4>{note.title}</h4>
                {note.isFavorite && <span className="favorite-badge">★</span>}
              </div>
              <p>{note.message}</p>
              <span className="notification-time">{note.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
