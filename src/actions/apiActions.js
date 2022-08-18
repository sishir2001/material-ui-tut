export const fetchList = () => {
    return async (dispatch, getState) => {
        try {
            const res = await fetch("http://localhost:3001/notes");
            const res_json = await res.json();
            dispatch({
                type: "fetch",
                payload: res_json,
            });
        } catch (e) {
            dispatch({
                type: "fetch",
                payload: {},
            });
        }
    };
};
