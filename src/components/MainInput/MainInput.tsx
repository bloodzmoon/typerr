import {
  Component,
  createEffect,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from 'solid-js'

import { useWordStack } from 'contexts/WordStackContext'
import { useCoin } from 'contexts/CoinContext'

import styles from './MainInput.module.scss'

const MainInput: Component = () => {
  const FONT_WIDTH = 32
  const MAIN_INPUT_ID = 'typerr-main-input'
  const ALPHABET_REGEX = new RegExp(/^[A-Z]$/, 'i')
  const BACK_SPACE = 'Backspace'
  const ENTER = 'Enter'

  const [, { getTargetWord, burnWord, getWordValue }] = useWordStack()
  const [, { addCoin }] = useCoin()

  const [value, setValue] = createSignal('')
  const [isCursorBlink, setIsCursorBlink] = createSignal(true)

  let cursorBlinkTimeout = -1

  const stopCursorBlink = () => {
    setIsCursorBlink(false)
    clearTimeout(cursorBlinkTimeout)
    cursorBlinkTimeout = setTimeout(() => {
      setIsCursorBlink(true)
    }, 1000)
  }

  const completeTargetWord = () => {
    setValue('')
    burnWord()
    addCoin(getWordValue())
  }

  const keypressHandler = (e: KeyboardEvent) => {
    // Type 'A-Z'
    if (ALPHABET_REGEX.test(e.key)) {
      stopCursorBlink()
      if (value().length >= getTargetWord().length) {
        return
      }
      setValue((v) => v.concat(e.key.toLowerCase()))
    }
    // Type 'Backspace'
    else if (e.key === BACK_SPACE) {
      stopCursorBlink()
      if (value().length <= 0) {
        return
      }
      setValue((v) => v.slice(0, v.length - 1))
    }
    // Type 'Enter'
    else if (e.key === ENTER) {
      stopCursorBlink()
      if (value() !== getTargetWord()) {
        const mainInput = document.getElementById(MAIN_INPUT_ID)
        if (!mainInput?.classList.contains(styles.errorSubmit)) {
          mainInput?.classList.add(styles.errorSubmit)
          setTimeout(() => {
            mainInput?.classList.remove(styles.errorSubmit)
          }, 300)
        }
        return
      }
      completeTargetWord()
    }
  }

  createEffect(() => {
    if (!getTargetWord()) {
      setValue('')
    }
  })

  onMount(() => {
    document.body.addEventListener('keypress', keypressHandler)
  })

  onCleanup(() => {
    document.body.removeEventListener('keypress', keypressHandler)
  })

  return (
    <section id={MAIN_INPUT_ID} class={styles.container}>
      <For each={Array.from(getTargetWord())}>
        {(char, index) => (
          <>
            <Show when={index() === 0}>
              <span
                classList={{
                  [styles.cursor]: true,
                  [styles.cursorBlinking]: isCursorBlink(),
                }}
                style={{
                  transform: `translateX(${FONT_WIDTH * value().length}px)`,
                }}
              />
            </Show>
            <span
              classList={{
                [styles.char]: true,
                [styles.correct]:
                  value().charAt(index()) === char && index() < value().length,
                [styles.incorrect]:
                  value().charAt(index()) !== char && index() < value().length,
              }}
            >
              {char}
            </span>
          </>
        )}
      </For>
    </section>
  )
}

export default MainInput
