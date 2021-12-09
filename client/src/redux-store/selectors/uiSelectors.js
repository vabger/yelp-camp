export const checkIfLoading = (...actionsToCheck) => {
  return (state) => {
    return state.ui.loader.actions.some((action) =>
      actionsToCheck.includes(action.type)
    );
  };
};
