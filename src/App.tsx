import { Component } from 'solid-js'

import GamePanel from 'components/GamePanel'
import ShopPanel from 'components/ShopPanel'

import styles from './App.module.scss'

const App: Component = () => {
  return (
    <div class={styles.container}>
      <main>
        <GamePanel />
      </main>
      <aside>
        <ShopPanel />
      </aside>
    </div>
  )
}

export default App
