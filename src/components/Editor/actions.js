export const focusModule = id => ({
    type: 'FOCUS_MODULE',
    payload: id
})

export const addModule = payload => ({
    type: 'ADD_MODULE',
    payload,
})

export const deleteModule = payload => ({
    type: 'DELETE_MODULE',
    payload,
})

export const updateModule = payload => ({
    type: 'UPDATE_MODULE',
    payload
})

export const actions = {
    focusModule,
    updateModule,
    addModule,
    deleteModule
}