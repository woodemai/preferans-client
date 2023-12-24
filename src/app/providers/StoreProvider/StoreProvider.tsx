import { store } from "@/shared/store/store"
import { ReactNode } from "react"
import { Provider } from "react-redux"

export default function StoreProvider(
    { children }:
        Readonly<{ children: ReactNode }>
) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}