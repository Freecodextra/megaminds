// ProfileIcon.jsx
import { useAppContext } from "../contexts/AppContext";
import { FaRegUser  } from "react-icons/fa";
import "./ProfileIcon.css"; 

function ProfileIcon() {
  const { user, navigate } = useAppContext();

  return (
    <div className="profile-icon-wrapper">
      <FaRegUser 
        size={25}
        color={user ? "#1976d2" : "#888"} // Blue if logged in, gray otherwise
        className="profile-icon cursor-pointer"
        onClick={() => {navigate("/profile")}}
      />
      {user && (
        <span className="profile-tooltip">{user.username}</span>
      )}
    </div>
  );
}

export default ProfileIcon;