import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApartmentForm from './pages/ApartmentForm';
import InventoryReview from './pages/InventoryReview';
import InventoryEdit from './pages/InventoryEdit';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apartment/add" element={<ApartmentForm />} />
        <Route path="/apartment/edit/:id" element={<ApartmentForm />} />
        <Route path="/apartment/:id/inventory/new" element={<InventoryEdit />} />
        <Route path="/apartment/:id/inventory/:roomId/edit" element={<InventoryEdit />} />
        <Route path="/apartment/:id/inventory" element={<InventoryReview />} />
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;
