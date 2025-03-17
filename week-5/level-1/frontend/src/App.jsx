import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';

const cards = [
  {
    id: 1,
    name: 'Raj Manna',
    bio: 'I love coding',
    interests: ['Coding', 'Drawing', 'Cricket'],
    twitter: 'https://x.com/dev-rajm',
    linkedIn: 'https://linkedin.com/dev-rajm',
  },
  {
    id: 2,
    name: 'Raj Manna',
    bio: 'I love coding',
    interests: ['Coding', 'Drawing', 'Cricket'],
    twitter: 'https://x.com/dev-rajm',
    linkedIn: 'https://linkedin.com/dev-rajm',
  },
  {
    id: 3,
    name: 'Raj Manna',
    bio: 'I love coding',
    interests: ['Coding', 'Drawing', 'Cricket'],
    twitter: 'https://x.com/dev-rajm',
    linkedIn: 'https://linkedin.com/dev-rajm',
  },
];

function App() {
  return (
    <>
      <Navbar />
      <div className="grid">
        {cards.map(card => (
          <Card
            key={card.id}
            name={card.name}
            bio={card.bio}
            interests={card.interests}
            twitter={card.twitter}
            linkedIn={card.linkedIn}
          />
        ))}
      </div>
    </>
  );
}

export default App;
