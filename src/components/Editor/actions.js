export const focusModule = id => ({
    type: 'FOCUS_MODULE',
    payload: id
})

export const addModule = payload => ({
    type: 'ADD_MODULE',
    payload: payload,
})

export const updateModule = payload => ({
    type: 'UPDATE_MODULE',
    payload: payload
})

export const actions = {
    focusModule,
    updateModule,
    addModule
}