import { useState, useEffect } from "react";

const OfficialExample = () => {
  // 声明一个新的叫做"count"的state变量
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate
  useEffect(() => {
    // 使用浏览器的API更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>you click { count } times</p>
      <button onClick={() => setCount(count + 1)}>
        click me
      </button>
    </div>
  );
};

const ExampleWithManyStates = () => {
  // 声明多个state变量
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
};

const FriendStatus = (props) => {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }

  return isOnline ? 'Online' : 'Offline';
};

const FriendStatusWithCounter = (props) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      // eslint-disable-next-line no-undef
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
};

const useFriendStatus = (friendID) => {
  const [isOnline, setIsOnline] = useState(null);
  const handleStatusChange = (status) => {
    setIsOnline(status.isOnline);
  };
  useEffect(() => {
    // eslint-disable-next-line no-undef
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      // eslint-disable-next-line no-undef
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return isOnline;
};

const FriendListItem = (props) => {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      { props.friend.name }
    </li>
  );
};

export default OfficialExample;
