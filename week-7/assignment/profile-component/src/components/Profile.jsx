import bg from "../assets/bg.svg";

function Profile() {
  return (
    <div className="profile-container">
      <div className="banner">
        <img src={bg} alt="" />
      </div>
      <div className="profile">
        <div className="profile-image">
          <img src="" alt="" />
        </div>
        <div className="profile-info">
          <div className="profile-flex">
            <h2 className="name">Raj Manna</h2>
            <span className="age">21</span>
          </div>
          <p className="location">Kolkata</p>
        </div>
        <hr />
        <div className="profile-data">
          <div className="followers">
            <h4>80K</h4>
            <p>Followers</p>
          </div>
          <div className="likes">
            <h4>804K</h4>
            <p>Likes</p>
          </div>
          <div className="photos">
            <h4>1.4K</h4>
            <p>Photos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
