import card from '../assets/card.png';

function Navbar() {
  return (
    <div className="navbar">
      <img src={card} alt="card logo" />
      <h1>eCards Showcase</h1>
    </div>
  );
}

export default Navbar;
