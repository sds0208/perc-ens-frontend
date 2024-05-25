import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import List from "./components/List";
import EnsemblePage, { ensembleLoader } from "./components/EnsemblePage";
import PublishersPage from "./components/PublishersPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<List />} />
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
