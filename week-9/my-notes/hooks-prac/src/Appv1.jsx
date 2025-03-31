import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function useTodos(n) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const value = setInterval(() => {
      fetch('https://sum-server.100xdevs.com/todos').then(resolve => {
        const json = resolve.json();
        setTodos(json.todos);
        setLoading(false);
      });
    }, n * 1000);

    fetch('https://sum-server.100xdevs.com/todos').then(resolve => {
      const json = resolve.json();
      setTodos(json.todos);
      setLoading(false);
    });

    return () => {
      clearInterval(value);
    };
  }, [n]);

  return { todos, loading };
}

function App() {
  const { todos, loading } = useTodos(5);

  return (
    <>{loading ? 'Loading...' : todos.map(todo => <Track todo={todo} />)}</>
  );
}

function Track({ todo }) {
  return (
    <div>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}

export default App;
