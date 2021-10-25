import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG } from './types'

// Get logs from server with the tryCatch
export const getLogs = () => async dispatch => {
    try {
      setLoading();
  
      const res = await fetch('/logs');
      const data = await res.json();
  
      dispatch({
        type: GET_LOGS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.data
      });
    }
  };

// Get logs from server without the tryCatch
// export const getLogs = () => {
//     return async (dispatch) => {
//         setLoading(); // call the setLoading() function below
        
//         const res = await fetch('/logs');
//         const data = res.json();

//         dispatch({
//             type: GET_LOGS,
//             payload: data
//         })
//     }
// }

// Add a new log
export const addLog = log => async dispatch => {
    try {
        setLoading();

        const res = await fetch('logs', {
            method: 'POST',
            body: JSON.stringify(log),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json()

        dispatch({
            type: ADD_LOG,
            payload: data
        });
    } catch(err) {
        dispatch({
            type: LOGS_ERROR,
            payload: err.response.data
        });
    }
};

// set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}