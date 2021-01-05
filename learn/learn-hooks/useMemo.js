import { useState, useMemo } from "react";

const Counter = (props) => {
  return (
    <h1>{props.count}</h1>
  );
};

const App = () => {
  const [count, setCount] = useState(0);

  const double = useMemo(() =>{
    return count * 2;
  }, [count === 3]);

  const half = useMemo(() =>{
    return double / 4;
  }, [double]);

  return (
    <div>
      <button onClick={() => {setCount(count + 1)}}>
        Click ({count})
        Double ({double})
        Half ({half})
      </button>
      <Counter count={count}/>
    </div>
  );
};

export default App;
