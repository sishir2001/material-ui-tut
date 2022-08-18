const INITIAL_STATE = {
    itemList: [],
};
export const apiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "fetch":
            return {
                ...state,
                itemList: action.payload,
            };
        case "post":
            return {
                ...state,
            };
        default:
            return state;
    }
};
