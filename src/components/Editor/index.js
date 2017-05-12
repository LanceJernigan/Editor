import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addModule, updateModule, deleteModule } from './actions.js';

const styles = {
    editor: {
        width: '98%',
        maxWidth: '750px',
        margin: 'auto',
        padding: '15px'
    },
    textarea: {
        width: '100%',
        maxWidth: '100%',
        fontWeight: '300',
        lineHeight: '2rem',
        border: 'none',
        outline: 'none',
        resize: 'none',
        background: '#f4f5f7',
        padding: '1.5rem',
        fontSize: '1.5rem'
    },
    text: {
        width: '100%',
        outline: 'none'
    }
};

const Editor = ({ modules, actions }) => {
    return (
        <div style={styles.editor}>
            {modules.map((module, key) => (
                <textarea
                    rows={1}
                    ref={el => 
                        el && el.scrollHeight !== module.height ?
                            actions.module.update({
                                id: module.id,
                                height: el.scrollHeight,
                            }) :
                            el
                    }
                    onChange={e =>
                        e.currentTarget.value ?
                            actions.module.update({
                                id: module.id,
                                value: e.currentTarget.value,
                                height: 0
                            }) :
                            actions.module.delete(module)
                    }
                    onKeyDown={e => {
                        if (e.which === 8) {
                            if (!e.currentTarget.value) {
                                actions.module.update(Object.assign(modules[key - 1], {focus: true}))
                                actions.module.delete(module)
                            }
                        }
                    }}
                    style={{ ...styles.textarea, height: `${module.height}px` }}
                    value={module.value}
                    autoFocus={module.focus ? 'true' : 'false'}
                    key={key}
                ></textarea>
            ))}
            <p
                onClick={() => actions.module.add({
                    value: '',
                    focus: true
                })}
            >Add Text Module</p>
        </div>
    )
};

Editor.propTypes = {
    modules: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.string,
        focus: PropTypes.bool,
    })),
    actions: PropTypes.shape({
        module: PropTypes.shape({
            focus: PropTypes.func,
            update: PropTypes.func
        })
    })
}

const mapStateToProps = state => ({
    modules: state.editor.modules
})

const mapDispatchToProps = dispatch => ({
    actions: {
        module: {
            add: payload => dispatch(addModule(payload)),
            delete: payload => dispatch(deleteModule(payload)),
            update: payload => dispatch(updateModule(payload))
        }
    }
})

const connectedEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)

export default connectedEditor