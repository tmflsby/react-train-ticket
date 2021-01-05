import React, { PureComponent, useState, useMemo, useCallback, useRef, useEffect } from "react";

// const Counter = memo(function Counter(props) {
//   console.log('Counter render');
//   return (
//     <h1 onClick={props.onClick}>{props.count}</h1>
//   );
// });

class Counter extends PureComponent {
  speak() {
    console.log(`now counter is: ${this.props.count}`);
  }

  render() {
    const { props } = this;
    return (
      <h1 onClick={props.onClick}>{props.count}</h1>
    );
  }
}

const App = () => {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const counterRef = useRef();
  let it = useRef();

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
    console.log(counterRef.current);
    counterRef.current.speak();
  }, [counterRef]);

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  });

  return (
    <div>
      <button onClick={() => {setCount(count + 1)}}>
        Click ({count})
        Double ({double})
        Half ({half})
        setClickCount ({clickCount})
      </button>
      <Counter ref={counterRef} count={double} onClick={onClick}/>
    </div>
  );
};

export default App;
