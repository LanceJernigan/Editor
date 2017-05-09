import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from './actions.js';

const styles = {
    editor: {
        width: '98%',
        maxWidth: '500px',
        margin: 'auto',
        padding: '15px'
    },
    textarea: {
        width: '100%',
        maxWidth: '100%',
        minHeight: '100px',
        border: 'none',
        height: 'auto',
        outline: 'none',
        resize: 'none',
    },
    text: {
        width: '100%',
        outline: 'none'
    }
};

const Editor = ({ modules, actions }) => (
    <div style={styles.editor}>
        {modules.map((module, key) => (
            <textarea
                onChange={e => actions.module.update({
                    id: module.id,
                    value: e.currentTarget.value,
                    height: e.currentTarget.scrollHeight
                })}
                style={{...styles.textarea, height: `${module.height}px`}}
                value={module.value}
                key
            >
            </textarea>
        ))}
    </div>
);

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
            focus: id => dispatch(actions.focusModule(id)),
            update: payload => dispatch(actions.updateModule(payload))
        }
    }
})

const connectedEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)

export default connectedEditor