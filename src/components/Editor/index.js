import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addModule, updateModule, deleteModule } from './actions.js';

import TextEditor from './components/TextEditor/';

import styles from './style.css'

const Editor = ({ modules, actions }) => (
    <div className={styles.editor}>
        {modules.map((module, key) => (
            <TextEditor actions={actions.module} {...module} index={key} key={key} />
        ))}
        <div
            className={styles.addModule}
            onClick={() => actions.module.add({
                value: '',
                focus: true
            })}
        >
            <p>Add Content</p>
        </div>
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