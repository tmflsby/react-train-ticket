export const createSet = (payload) => ({
  type: 'set',
  payload
});

let idSeq = Date.now();

export const createAdd = (text) => ((dispatch, getState) => {
  // 添加异步操作
  setTimeout(() => {
    const { todos } = getState();

    if (!todos.find(todo => todo.text === text)) {
      dispatch({
        type: 'add',
        payload: {
          id: ++idSeq,
          text,
          complete: false
        }
      });
    }
  }, 3000);
});

export const createRemove = (payload) => ({
  type: 'remove',
  payload
});

export const createToggle = (payload) => ({
  type: 'toggle',
  payload
});
