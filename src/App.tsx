import './App.css'
import NewItem from './components/NewItem'
import { ItemProvider } from './itemProvider'
import ItemList from './components/ItemList'


function App() {
  return (
    <>
      <h1>Stock Guardian</h1>
      <ItemProvider>
        <NewItem></NewItem>
        <ItemList></ItemList>
      </ItemProvider>
    </>
  )
}

export default App
