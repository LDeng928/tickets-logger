import { GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOG, DELETE_LOG, SET_CURRENT, CLEAR_CURRENT, UPDATE_LOG, SEARCH_LOGS } from './types'

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
        payload: err.response.statusText
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
            payload: err.response.statusText
        });
    }
};

// Delete log from server
// Get logs from server with the tryCatch
export const deleteLog = id => async dispatch => {
    try {
      setLoading();
  
      await fetch(`/logs/${id}`, {
          method: 'DELETE'
      });
      
  
      dispatch({
        type: DELETE_LOG,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.statusText
      });
    }
  };

// Update log on server
export const updateLog = log => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`/logs/${log.id}`, {
        method: 'PUT',
        body: JSON.stringify(log),
        headers: {
          'Content-Type': 'application/json'
        }
    });

    const data = await res.json()
    
    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

// Search logs
export const searchLogs = text => async dispatch => {
  try {
    setLoading();

    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGS_ERROR,
      payload: err.response.statusText
    });
  }
};

// set current log
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  }
}

// clear current 
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  }
}


// set loading to true
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}