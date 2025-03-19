import './App.css'
import NewItem from './components/NewItem'
import { ItemProvider } from './itemProvider'
import Board from './components/Board'


function App() {
  return (
    <>
      <h1>Stock Guardian</h1>
      <ItemProvider>
        <NewItem></NewItem>
        <Board></Board>
      </ItemProvider>
    </>
  )
}

export default App
