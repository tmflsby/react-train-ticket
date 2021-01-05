import { useState, useRef, useEffect, memo } from 'react'
import * as actions from './actions';
import reducer from "./reducer";
import './index.css';

const bindActionCreators = (actionCreators, dispatch) => {
  const ret = {};

  for (let key in actionCreators) {
    ret[key] = (...args) => {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action);
    };
  }

  return ret;
};

const Control = memo((props) => {
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    const newText = inputRef.current.value.trim();

    if (newText.length === 0) return;

    addTodo(newText);

    inputRef.current.value = '';
  };

  return (
    <div className="control">
      <h1>todos</h1>
      <form action="" onSubmit={onSubmit}>
        <input type="text" ref={inputRef} className="new-todo" placeholder="What needs to be done?"/>
      </form>
    </div>
  );
});

const TodoItem = memo((props) => {
  const { todo: { id, text, complete }, removeTodo, toggleTodo } = props;

  const onChange = () => {
    toggleTodo(id);
  };

  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete}/>
      <label className={complete ? 'complete' : ''}>{ text }</label>
      <button onClick={onRemove}>&#xd7;</button>
    </li>
  );
});

const Todos = memo((props) => {
  const { todos, removeTodo, toggleTodo } = props;

  return (
    <ul>
      {
        todos.map(todo => {
          return (
            <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} toggleTodo={toggleTodo}/>
          );
        })
      }
    </ul>
  );
});

const LS_KEY = '_$-todos_';

let store = {
  todos: [],
  incrementCount: 0
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  useEffect(() => {
    Object.assign(store, {
      todos,
      incrementCount
    });
  }, [todos, incrementCount]);

  const dispatch = (action) => {
    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    };
    const newState = reducer(store, action);

    if ('function' === typeof action) {
      action(dispatch, () => store);
      return;
    }

    for (let key in newState) {
      setters[key](newState[key]);
    }
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    dispatch(actions.createSet(todos));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control
        {
          ...bindActionCreators({
            addTodo: actions.createAdd
          }, dispatch)
        }
      />
      <Todos
        todos={todos}
        {
          ...bindActionCreators({
            removeTodo: actions.createRemove,
            toggleTodo: actions.createToggle
          }, dispatch)
        }
      />
    </div>
  )
};

export default TodoList;
