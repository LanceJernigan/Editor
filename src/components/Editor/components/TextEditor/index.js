import React from 'react';

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
        padding: '1.5rem',
        fontSize: '1.5rem'
    },
    text: {
        width: '100%',
        outline: 'none'
    }
};

const TextEditor = ({ actions, height, id, value, focus, index }) => (
    <textarea
        rows={1}
        ref={el => {
            el && el.scrollHeight !== height ?
                (actions.update({
                    id,
                    index,
                    height: el.scrollHeight,
                })) :
                el

            focus && el
                ? el.focus()
                : null
        }}
        onChange={e =>
            e.currentTarget.value ?
                actions.update({
                    index,
                    value: e.currentTarget.value,
                    height: 0
                }) :
                actions.delete({ index })
        }
        onKeyDown={e => {
            if (e.which === 8) {
                if (!e.currentTarget.value) {
                    actions.delete({ index })
                    e.preventDefault()
                }
            }
        }}
        onFocus={ e => e.currentTarget.selectionStart = e.currentTarget.selectionEnd = e.currentTarget.value.length}
        style={{ ...styles.textarea, height: `${height}px` }}
        value={value}
    ></textarea>
)

export default TextEditor