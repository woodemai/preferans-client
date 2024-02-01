import { Toaster } from "@/shared/components/ui/toaster"
import { PageProvider } from "./providers/PageProvider"
import StoreProvider from "./providers/StoreProvider/StoreProvider"
import { ThemeProvider } from "./providers/ThemeProvider/ThemeProvider"
import { Suspense } from "react"
import Spinner from "@/shared/components/ui/spinner"

function App() {
  return (
    <StoreProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster />
        <Suspense fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Spinner size={40} />
          </div>
        }>
          <PageProvider />
        </Suspense>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
