export const createErrorMessageSelector = (actions) => (state) => {
    const errorMessage = actions.map(action => state.errorMessage[action]);
    if (errorMessage && errorMessage[0]) {
        console.log(errorMessage);
        return errorMessage[0];
    }
    return {};
};