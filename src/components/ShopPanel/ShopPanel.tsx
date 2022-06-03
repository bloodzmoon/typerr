import { Component, For } from 'solid-js'

import { useCoin } from 'contexts/CoinContext'
import { useWordStack } from 'contexts/WordStackContext'

import styles from './ShopPanel.module.scss'

const ShopPanel: Component = () => {
  const [coin, { removeCoin }] = useCoin()
  const [, { addStackSize, reduceWordDelay, addWordValue }] = useWordStack()

  const ITEMS = [
    {
      name: 'Memory upgrade',
      description: `Buy new RAM and insert into this game.
<Increase word stack size by 1>`,
      action: () => {
        if (coin() >= 10) {
          removeCoin(10)
          addStackSize(1)
        }
      },
    },
    {
      name: 'Speed upgrade',
      description: `Overclock your CPU. But why?
<Decrease word generator delay by 0.1s>`,
      action: () => {
        if (coin() >= 10) {
          removeCoin(10)
          reduceWordDelay(100)
        }
      },
    },
    {
      name: 'Word upgrade',
      description: `Cast random spell into your word.
<Increase BTC per word by 1>`,
      action: () => {
        if (coin() >= 10) {
          removeCoin(10)
          addWordValue(1)
        }
      },
    },
  ]

  return (
    <div class={styles.panel}>
      <div>Shop</div>
      <hr />
      <div class={styles.itemContainer}>
        <For each={ITEMS}>
          {(item) => (
            <div
              class={styles.item}
              data-name={item.name}
              data-description={item.description}
              onClick={() => {
                item.action()
              }}
            />
          )}
        </For>
      </div>
    </div>
  )
}

export default ShopPanel
