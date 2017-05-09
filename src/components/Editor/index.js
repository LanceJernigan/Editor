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
    },
    text: {
        width: '100%',
    }
};

const Editor = ({ modules, actions }) => (
    <div style={ styles.editor }>
        {/*{ modules.map(( module, key ) => module.focus ?
            <textarea style={ styles.textarea } key>{ module.value }</textarea> :
            <p onClick={() => actions.module.focus(module.id)} style={ styles.text } key>{ module.value }</p>
        )}*/}
        {modules.map(( module, key ) => <p onClick={() => actions.module.focus(module.id)} onKeyDown={e => actions.module.update({id: module.id, value: e.currentTarget.innerHTML})} contentEditable style={ styles.text } key>{ module.value }</p> )}
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
    modules: state.editor
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