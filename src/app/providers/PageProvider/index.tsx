import { RouterProvider } from "react-router-dom";
import router from './router';

const PageProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}
export { PageProvider };