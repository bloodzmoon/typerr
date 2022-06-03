import { Component } from 'solid-js'

import { WordStackProvider } from 'contexts/WordStackContext'
import { CoinProvider } from 'contexts/CoinContext'
import GamePanel from 'components/GamePanel'
import ShopPanel from 'components/ShopPanel'

import styles from './App.module.scss'

const App: Component = () => {
  return (
    <CoinProvider>
      <WordStackProvider>
        <div class={styles.container}>
          <main>
            <GamePanel />
          </main>
          <aside>
            <ShopPanel />
          </aside>
        </div>
      </WordStackProvider>
    </CoinProvider>
  )
}

export default App
