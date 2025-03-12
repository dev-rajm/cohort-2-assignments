import card from '../assets/card.png';

function Navbar() {
  return (
    <div className="navbar">
      <img src={card} alt="card logo" />
      <h1>eCard Maker</h1>
    </div>
  );
}

export default Navbar;
