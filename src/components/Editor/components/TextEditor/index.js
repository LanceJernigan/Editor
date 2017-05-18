import React from 'react';

import styles from './style.css'

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
        className={styles.textModule}
        style={{height: `${height}px`}}
        value={value}
    ></textarea>
)

export default TextEditor