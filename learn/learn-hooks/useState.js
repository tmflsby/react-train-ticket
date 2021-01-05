import React, { Component, useState } from "react";

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    const { count } = this.state;
    return (
      <button onClick={() => {this.setState({count: count + 1})}}>
        Click ({count})
      </button>
    );
  }
}

const App = (props) => {
  const [count, setCount] = useState(() => {
    return props.defaultCount || 0;
  });
  const [name] = useState('ShuaiYang');

  return (
    <button onClick={() => {setCount(count + 1)}}>
      Click ({count}), Name ({name})
    </button>
  );
};

export default App;
