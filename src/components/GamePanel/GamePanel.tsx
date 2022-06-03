import { Component } from 'solid-js'

import CoinDisplay from 'components/CoinDisplay'
import WordGenerator from 'components/WordGenerator'
import MainInput from 'components/MainInput'

import styles from './GamePanel.module.scss'

const GamePanel: Component = () => {
  return (
    <div class={styles.panel}>
      <CoinDisplay />
      <WordGenerator />
      <MainInput />
    </div>
  )
}

export default GamePanel
