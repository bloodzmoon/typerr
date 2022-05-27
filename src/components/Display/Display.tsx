import { Component, For } from 'solid-js'

import styles from './Display.module.scss'

const Display: Component<IProps> = (props) => {
  return (
    <div class={styles.display}>
      <For each={props.wordList}>
        {(word) => <span class={styles.word}>{word}</span>}
      </For>
    </div>
  )
}

export default Display

interface IProps {
  wordList?: string[]
}
