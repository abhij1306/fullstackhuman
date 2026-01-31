import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import HomePage from "./pages/HomePage"
import StagePage from "./pages/StagePage"
import InventoryPage from "./pages/InventoryPage"
import WorkflowsPage from "./pages/WorkflowsPage"
import WorkflowDetailPage from "./pages/WorkflowDetailPage"
import BrowsePage from "./pages/BrowsePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="stage/:stageId" element={<StagePage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="workflows" element={<WorkflowsPage />} />
        <Route path="workflows/:workflowId" element={<WorkflowDetailPage />} />
        <Route path="browse/:category" element={<BrowsePage />} />
        <Route path="*" element={<div className="p-8 text-center text-muted-foreground">404: Page not found</div>} />
      </Route>
    </Routes>
  )
}

export default App
