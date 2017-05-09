const focusModule = id => ({
    type: 'FOCUS_MODULE',
    payload: id
})

const addModule = payload => ({
    type: 'ADD_MODULE',
    payload: payload,
})

const updateModule = payload => ({
    type: 'UPDATE_MODULE',
    payload: payload
})

const actions = {
    focusModule,
    updateModule,
    addModule
}

export default actions