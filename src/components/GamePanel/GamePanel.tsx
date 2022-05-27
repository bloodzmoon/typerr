import { Component, createSignal } from 'solid-js'

import Display from 'components/Display'
import Input from 'components/Input'

import styles from './GamePanel.module.scss'

const GamePanel: Component = () => {
  const keywords = ['abandon', 'careful', 'divide', 'growth', 'incident']

  const [wordList, setWordList] = createSignal(keywords.slice(0, 1))

  setInterval(() => {
    const idx = Math.floor(Math.random() * keywords.length)
    setWordList((prev) => [...prev, keywords[idx]])
  }, 5000)

  return (
    <div class={styles.panel}>
      <Display wordList={wordList()} />
      <Input
        targetWord={wordList()[0]}
        onCorrect={() => {
          setWordList((prev) => prev.slice(1))
          console.log('eiei')
        }}
      />
    </div>
  )
}

export default GamePanel
