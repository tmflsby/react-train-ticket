import { useState, useRef, useEffect, useCallback } from "react";

const useCounter = (count) => {
  const size = useSize();

  return (
    <h1>{count},{size.width}x{size.height}</h1>
  );
};

const useCount = (defaultCount) => {
  const [count, setCount] = useState(defaultCount);
  let it = useRef();

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

  return [count, setCount];
};

const useSize = () => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  return size;
};

const App = () => {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();

  return (
    <div>
      <button onClick={() => {setCount(count + 1)}}>
        Click ({count})  Size:{size.width}x{size.height}
      </button>
      { Counter }
    </div>
  );
};

export default App;
