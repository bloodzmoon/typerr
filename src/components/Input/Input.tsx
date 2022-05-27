import { Component, createSignal } from 'solid-js'

import styles from './Input.module.scss'

const Input: Component<IProps> = (props) => {
  const [value, setValue] = createSignal('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log(props.targetWord, value())

        if (value() === props.targetWord) {
          setValue('')
          props.onCorrect()
        }
      }}
    >
      <input
        class={styles.input}
        autocomplete="off"
        autocapitalize="off"
        spellcheck={false}
        type="text"
        value={value()}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
    </form>
  )
}

export default Input

interface IProps {
  targetWord?: string
  onCorrect: () => void
}
