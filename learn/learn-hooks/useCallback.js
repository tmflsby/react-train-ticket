import { useState, useMemo, memo, useCallback } from "react";

const Counter = memo(function Counter(props) {
  console.log('Counter render');
  return (
    <h1 onClick={props.onClick}>{props.count}</h1>
  );
});

const App = () => {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const double = useMemo(() =>{
    return count * 2;
  }, [count === 3]);

  const half = useMemo(() =>{
    return double / 4;
  }, [double]);

  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('click');
  //     setClickCount(clickCount + 1);
  //   };
  // }, []);

  // useMemo(() => fn) ====== useCallback(fn)
  const onClick = useCallback(() => {
    console.log('click');
    setClickCount(clickCount => clickCount + 1);
  }, []);

  return (
    <div>
      <button onClick={() => {setCount(count + 1)}}>
        Click ({count})
        Double ({double})
        Half ({half})
        setClickCount ({clickCount})
      </button>
      <Counter count={double} onClick={onClick}/>
    </div>
  );
};

export default App;
