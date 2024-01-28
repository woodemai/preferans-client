import { Toaster } from "@/shared/components/ui/toaster"
import { PageProvider } from "./providers/PageProvider"
import StoreProvider from "./providers/StoreProvider/StoreProvider"
import { ThemeProvider } from "./providers/ThemeProvider/ThemeProvider"

function App() {
  return (
    <StoreProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster/>
        <PageProvider />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
