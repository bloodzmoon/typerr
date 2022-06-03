import { Component, createSignal, For, onCleanup, onMount } from 'solid-js'
import { FiClock, FiDatabase } from 'solid-icons/fi'

import { useWordStack } from 'contexts/WordStackContext'

import styles from './WordGenerator.module.scss'

const WordGenerator: Component = () => {
  const [wordStack, { addWord, getWordDelay, getStackSize }] = useWordStack()
  const [timer, setTimer] = createSignal(0)

  const wordDelay = () => ((getWordDelay() - timer()) / 1000).toFixed(1)

  const keywords = ['abandon', 'careful', 'divide', 'growth', 'incident']
  let timerInterval = 0

  onMount(() => {
    timerInterval = setInterval(() => {
      setTimer((prev) => prev + 100)
      if (timer() >= getWordDelay()) {
        setTimer(0)
        const idx = Math.floor(Math.random() * keywords.length)
        addWord(keywords[idx])
      }
    }, 100)
  })

  onCleanup(() => {
    clearInterval(timerInterval)
  })

  return (
    <div class={styles.container}>
      <div class={styles.display}>
        <For each={wordStack()}>
          {(word, index) => (
            <span
              classList={{
                [styles.word]: true,
                [styles.targetWord]: index() === 0,
              }}
            >
              {word}
            </span>
          )}
        </For>
      </div>

      <div class={styles.sidebar}>
        <span>
          <FiClock /> {wordDelay()}
        </span>
        <span
          classList={{
            [styles.alert]: wordStack().length === getStackSize(),
          }}
        >
          <FiDatabase /> {wordStack().length} / {getStackSize()}
        </span>
      </div>
    </div>
  )
}

export default WordGenerator
