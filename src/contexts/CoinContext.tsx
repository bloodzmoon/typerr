import {
  Accessor,
  Component,
  createContext,
  createSignal,
  JSX,
  useContext,
} from 'solid-js'

type ICoinContext = [
  Accessor<number>,
  {
    addCoin: (amount: number) => void
    removeCoin: (amount: number) => void
    removeCoinPercent: (percent: number) => void
  },
]

const initialValue: ICoinContext = [
  () => 0,
  {
    addCoin: () => {},
    removeCoin: () => {},
    removeCoinPercent: () => {},
  },
]

const CoinContext = createContext<ICoinContext>(initialValue)

interface IProps {
  children: JSX.Element
}

export const CoinProvider: Component<IProps> = (props) => {
  const [coin, setCoin] = createSignal<number>(0)

  return (
    <CoinContext.Provider
      value={[
        coin,
        {
          addCoin(amount) {
            setCoin((prev) => prev + amount)
          },
          removeCoin(amount) {
            setCoin((prev) => prev - amount)
          },
          removeCoinPercent(percent) {
            setCoin((prev) => prev - Math.ceil((prev * percent) / 100))
          },
        },
      ]}
    >
      {props.children}
    </CoinContext.Provider>
  )
}

export const useCoin = () => useContext(CoinContext)
