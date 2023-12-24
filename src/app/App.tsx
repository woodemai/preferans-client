import { PageProvider } from "./providers/PageProvider"
import StoreProvider from "./providers/StoreProvider/StoreProvider"

function App() {
  return (
    <StoreProvider>
      <PageProvider />
    </StoreProvider>
  )
}

export default App
