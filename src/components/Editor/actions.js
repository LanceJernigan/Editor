const focusModule = id => ({
    type: 'FOCUS_MODULE',
    payload: id
})

const updateModule = payload => (console.log(payload) || {
    type: 'UPDATE_MODULE',
    payload: payload
})

const actions = {
    focusModule,
    updateModule
}

export default actions