const defaultEditorState = {
    modules: [
        {
            id: 1,
            type: 'text',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et orci at odio luctus laoreet eget ac ante. Integer laoreet turpis suscipit luctus tincidunt. Quisque enim augue, consectetur a arcu vel, elementum convallis justo. Phasellus aliquam turpis eu justo luctus, egestas lacinia odio ultrices. Nunc et quam in eros consectetur fringilla. Integer pulvinar, tortor et scelerisque ultricies, ipsum nisl accumsan urna, eu iaculis massa enim vel mauris. Nunc sit amet mauris tincidunt, consectetur urna a, imperdiet ipsum. Donec ut massa vitae orci mattis maximus at at enim. Donec ultricies elit nec hendrerit finibus. In posuere, mauris eget ultricies rhoncus, justo justo tristique ipsum, a ornare diam libero non eros. Mauris consequat maximus massa. Aenean id elit eu nisl accumsan laoreet.',
        },
        {
            id: 2,
            type: 'text',
            value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et orci at odio luctus laoreet eget ac ante. Integer laoreet turpis suscipit luctus tincidunt. Quisque enim augue, consectetur a arcu vel, elementum convallis justo. Phasellus aliquam turpis eu justo luctus, egestas lacinia odio ultrices. Nunc et quam in eros consectetur fringilla. Integer pulvinar, tortor et scelerisque ultricies, ipsum nisl accumsan urna, eu iaculis massa enim vel mauris. Nunc sit amet mauris tincidunt, consectetur urna a, imperdiet ipsum. Donec ut massa vitae orci mattis maximus at at enim. Donec ultricies elit nec hendrerit finibus. In posuere, mauris eget ultricies rhoncus, justo justo tristique ipsum, a ornare diam libero non eros. Mauris consequat maximus massa. Aenean id elit eu nisl accumsan laoreet.',
        }
    ]
};

const module = (state = {}, action) => {
    switch (action.type) {
        case 'FOCUS_MODULE':
            return {
                ...state,
                focus: state.id === action.payload
            }
        case 'UPDATE_MODULE':
            return {
                ...state,
                ...action.payload,
            }
        case 'DELETE_MODULE':
            return !(parseInt(state.id, 10) === parseInt(action.payload.id, 10))
    }
}

const editor = (state = defaultEditorState, action) => {
    const {
        index
    } = action.payload || { index: null }

    switch (action.type) {
        case 'FOCUS_MODULE':
            return state.modules.map((m, i) => (
                Object.assign(m, {
                        focus: index === i
                    })
            ))
        case 'UPDATE_MODULE':
            return {
                ...state,
                modules: state.modules.reduce((mods, m, i) => {
                    mods.push(index === i ?
                        module(m, action) :
                        m
                    )
                    return mods
                }, [])
            }
        case 'ADD_MODULE':
            return {
                ...state,
                modules: [
                    ...state.modules,
                    {
                        ...action.payload,
                        id: (state.modules.length + 1),
                    }
                ]
            }
        case 'DELETE_MODULE':
            let modules = [...state.modules]
            modules.splice(index, 1)
            modules[index - 1] = {
                ...modules[index - 1],
                focus: true
            }
            return {
                ...state,
                modules
            }
        default:
            return state
    }
}

export default editor