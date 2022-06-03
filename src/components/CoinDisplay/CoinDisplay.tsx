import { Component } from 'solid-js'

import { useCoin } from 'contexts/CoinContext'

import styles from './CoinDisplay.module.scss'

const CoinDisplay: Component = () => {
  const [coin] = useCoin()

  return (
    <div class={styles.container}>
      <span class={styles.coin}>
        BTC: {Intl.NumberFormat('en-IN').format(coin())}
      </span>
      <span class={styles.description}>(Better Typing Coin)</span>
    </div>
  )
}

export default CoinDisplay
