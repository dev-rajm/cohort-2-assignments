import { useEffect, useState } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeId);
  }, [value, delay]);

  return debouncedValue;
}

function App() {
  const [input, setInput] = useState('');
  const debouncedValue = useDebounce(input, 500);

  // use debouncedValue in your fetch query

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

export default App;
