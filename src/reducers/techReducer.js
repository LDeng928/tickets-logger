import { GET_TECHS, ADD_TECH, DELETE_TECH, TECHS_ERROR, SET_LOADING } from '../actions/types';

const initialState = {
    techs: null,
    loading: false,
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch(action.type) {
        case GET_TECHS:
            return {
                ...state,
                loading: false,
                techs: action.payload
            }
        case ADD_TECH:
            return {
                ...state,
                loading: false,
                techs: [...state.techs, action.payload] // copy the current techs from the state and then add the new one from action.payload
            }
        case DELETE_TECH: 
            return {
                ...state, 
                techs: state.techs.filter(tech => tech.id !== action.payload),
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case TECHS_ERROR: 
            console.log(action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false              
            }
        default:
            return state;
    }
}