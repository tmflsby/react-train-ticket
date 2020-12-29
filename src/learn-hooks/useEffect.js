import React, { Component, useState, useEffect } from "react";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    };
  }

  componentDidMount() {
    document.title = this.state.count;
    window.addEventListener('resize', this.onResize, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.count;
  }

  onResize = () => {
    this.setState({
      size: {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    });
  }

  // @bind()
  // onResize() {}

  render() {
    const { count, size } = this.state;
    return (
      <button onClick={() => {this.setState({count: count + 1})}}>
        Click ({count})
        Size: {size.width}x{size.height}
      </button>
    );
  }
}

const App = (props) => {
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  };

  useEffect(() => {
    document.title = count;
  });

  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, []);

  useEffect(() => {
    console.log('count:', count);
  }, [count]);

  const onClick = () => {
    console.log('click')
  };

  useEffect(() => {
    document.querySelector('.size').addEventListener('click', onClick, false);
    return () => {
      document.querySelector('.size').removeEventListener('click', onClick, false);
    };
  });

  return (
    <div>
      <button onClick={() => {setCount(count + 1)}}>
        Click ({count})
      </button>
      {
        count % 2
          ? <button className="size">
              Size: {size.width}x{size.height}
            </button>
          : <p className="size">
              Size: {size.width}x{size.height}
            </p>
      }
    </div>
  );
};

export default App;
