export const createErrorMessageSelector = (actions) => (state) => {
    const errorMessage = actions.map(action => state.errorMessage[action]);
    if (errorMessage && errorMessage[0]) {
        return errorMessage[0];
    }
    return {};
};