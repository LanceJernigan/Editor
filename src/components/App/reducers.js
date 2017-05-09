import { combineReducers } from 'redux';
import editor from '../Editor/reducer.js'

const reducers = combineReducers({
    editor,
})

export default reducers