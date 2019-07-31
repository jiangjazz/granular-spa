import {
  createStore
} from 'redux';

const initialState = {
  count: 0,
  name: '我是全局store'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      state.count ++
      console.log(state)
      return state
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

export const storeInstance = createStore(reducer)