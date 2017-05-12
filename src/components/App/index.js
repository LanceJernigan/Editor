import React from 'react';
import Editor from '../Editor/'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'

const store = createStore(reducers);

const App = props => (
    <Provider store={store}>
        <Editor />
    </Provider>
)

export default App