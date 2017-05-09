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

            action.payload.value = action.payload.value ? action.payload.value.replace('\n', '\n') : state.value

            return {
                ...state,
                ...action.payload,
            }
    }
}

const editor = (state = defaultEditorState, action) => {
    switch (action.type) {
        case 'FOCUS_MODULE':
            return state.modules.map(m =>
                module(m, action)
            )
        case 'UPDATE_MODULE':
            return {
                ...state,
                modules: state.modules.map(m =>
                    action.payload.hasOwnProperty('id') && m.id === action.payload.id ?
                        module(m, action) :
                        m
                )
            }
        default:
            return state
    }
}

export default editor