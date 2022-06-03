import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from 'solid-js'
import { useCoin } from './CoinContext'

type IWordStackContext = [
  Accessor<string[]>,
  {
    addWord: (word: string) => void
    burnWord: () => void
    getTargetWord: () => string
    getStackSize: () => number
    addStackSize: (amount: number) => void
    getWordValue: () => number
    addWordValue: (amount: number) => void
    getWordDelay: () => number
    addWordDelay: (amount: number) => void
    reduceWordDelay: (amount: number) => void
  },
]

const initialValue: IWordStackContext = [
  () => [],
  {
    addWord: () => {},
    burnWord: () => {},
    getTargetWord: () => '',
    getStackSize: () => 0,
    addStackSize: () => {},
    getWordValue: () => 0,
    addWordValue: () => {},
    getWordDelay: () => 0,
    addWordDelay: () => {},
    reduceWordDelay: () => {},
  },
]

const WordStackContext = createContext<IWordStackContext>(initialValue)

interface IProps {
  children: JSX.Element
}

export const WordStackProvider: Component<IProps> = (props) => {
  const [wordStack, setWordStack] = createSignal<string[]>([])
  const [stackSize, setStackSize] = createSignal<number>(3)
  const [wordValue, setWordValue] = createSignal<number>(1)
  const [wordDelay, setWordDelay] = createSignal<number>(5000)

  const [, { removeCoinPercent }] = useCoin()

  return (
    <WordStackContext.Provider
      value={[
        wordStack,
        {
          addWord(word) {
            if (wordStack().length + 1 > stackSize()) {
              alert('Word overflow! You lost some BTC.')
              removeCoinPercent(10)
              setWordStack([])
              return
            }
            setWordStack((prev) => [...prev, word])
          },
          burnWord() {
            if (wordStack().length <= 0) {
              return
            }
            setWordStack((prev) => prev.slice(1))
          },
          getTargetWord() {
            return wordStack().at(0) || ''
          },
          getStackSize() {
            return stackSize()
          },
          addStackSize(amount = 1) {
            setStackSize((prev) => prev + amount)
          },
          getWordValue() {
            return wordValue()
          },
          addWordValue(amount = 1) {
            setWordValue((prev) => prev + amount)
          },
          getWordDelay() {
            return wordDelay()
          },
          addWordDelay(amount) {
            return setWordDelay((prev) => prev + amount)
          },
          reduceWordDelay(amount) {
            return setWordDelay((prev) => prev - amount)
          },
        },
      ]}
    >
      {props.children}
    </WordStackContext.Provider>
  )
}

export const useWordStack = () => useContext(WordStackContext)
