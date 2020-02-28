const REQUEST = '@request';
const REQUEST_SUCCESS = '@request_success';
const REQUEST_ERROR = '@request_error';

export default model => {
  const { namespace, state, subscriptions, effects, reducers, enhance } = {
    ...model
  };

  if (!enhance) {
    return { namespace, state, subscriptions, effects, reducers };
  }
  return {
    namespace,
    state,
    subscriptions,
    effects: {
      // get old effect
      ...effects
    },

    reducers: {
      ...reducers,
    }
  };
};


