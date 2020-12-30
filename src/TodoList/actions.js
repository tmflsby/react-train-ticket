export const createSet = (payload) => ({
  type: 'set',
  payload
});

export const createAdd = (payload) => ({
  type: 'add',
  payload
});

export const createRemove = (payload) => ({
  type: 'remove',
  payload
});

export const createToggle = (payload) => ({
  type: 'toggle',
  payload
});