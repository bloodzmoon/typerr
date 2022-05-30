import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from 'solid-js'

type IWordStackContext = [
  Accessor<string[]>,
  {
    addWord: (word: string) => void
    burnWord: () => void
  },
]

const initialValue: IWordStackContext = [
  () => [],
  { addWord: () => {}, burnWord: () => {} },
]

const WordStackContext = createContext<IWordStackContext>(initialValue)

interface IProps {
  children: JSX.Element
}

export const WordStackProvider: Component<IProps> = (props) => {
  const [wordStack, setWordStack] = createSignal<string[]>([])

  return (
    <WordStackContext.Provider
      value={[
        wordStack,
        {
          addWord(word: string) {
            setWordStack((stack) => [...stack, word])
          },
          burnWord() {
            setWordStack((stack) => stack.slice(1))
          },
        },
      ]}
    >
      {props.children}
    </WordStackContext.Provider>
  )
}

export const useWordStack = () => useContext(WordStackContext)
