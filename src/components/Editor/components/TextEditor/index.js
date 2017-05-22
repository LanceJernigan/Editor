import React from 'react';

import styles from './style.css'

const TextEditor = ({ actions, height, id, value, focus, index }) => (
    <textarea
        rows={1}
        ref={el => {
            el && el.scrollHeight !== height
                ? (actions.update({
                    id,
                    index,
                    height: el.scrollHeight,
                }))
                : el

            if (focus && el) {
                el.focus()
                actions.update({
                    index,
                    focus: false
                })
            }
        }}
        onChange={e =>
            actions.update({
                    index,
                    value: e.currentTarget.value,
                    height: 0
                })
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
        style={{
            height: `${height}px`,
            borderLeft: value.length ? 'none' : 'solid 3px rgba(0, 0, 0, .2)'
        }}
        value={value}
    ></textarea>
)

export default TextEditor