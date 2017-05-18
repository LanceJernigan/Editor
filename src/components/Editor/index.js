import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addModule, updateModule, deleteModule } from './actions.js';

import TextEditor from './components/TextEditor/';

const styles = {
    editor: {
        width: '98%',
        maxWidth: '750px',
        margin: 'auto',
        padding: '15px'
    }
};

const Editor = ({ modules, actions }) => (
    <div style={styles.editor}>
        {modules.map((module, key) => (
            <TextEditor actions={actions.module} {...module} index={key} key={key} />
        ))}
        <p
            onClick={() => actions.module.add({
                value: '',
                focus: true
            })}
        >Add Text Module</p>
    </div>
)

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