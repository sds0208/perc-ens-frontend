import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ListPage from "./pages/ListPage";
import EnsemblePage, { ensembleLoader } from "./pages/EnsemblePage";
import PublishersPage from "./pages/PublishersPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<ListPage />} />
      <Route path="/publishers" element={<PublishersPage />} />
      <Route
        path="/ensemble/:id"
        element={<EnsemblePage />}
        loader={ensembleLoader}
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
