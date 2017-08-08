//VERBS
const TEST = 'TEST';

const INIT = {
  test: '',
};

export default (state=INIT,action) => {
  let newState = Object.assign({},state);

  switch(action.type) {
    case TEST:
      break;
    default:
      return state;
  }
  return newState;
}

