import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PersonalDetails from './Pages/PersonalDetails';
import BankDetails from './Pages/BankDetails';
import Home from './Pages/Home';
import ITRFilling from './Pages/ITRfilling';
import GSTfiling from './Pages/GSTfiling';
import TDSfiling from './Pages/TDSfiling';
import PayrollProcessing from './Pages/PayrollProcessing';
import BusinessDetails from './Pages/BusinessDetails';
import DocumentUploads from './Pages/DocumentUploads';
function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/form/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/form/BankDetails" element={<BankDetails />} />
        <Route path="/form/ITRFilling" element={<ITRFilling />} />
        <Route path="/form/GSTfiling" element={<GSTfiling />} />
        <Route path="/form/TDSfiling" element={<TDSfiling />} />
        <Route path="/form/PayrollProcessing" element={<PayrollProcessing />} />
        <Route path="/form/BusinessDetails" element={<BusinessDetails />} />
        <Route path="/form/DocumentUploads" element={<DocumentUploads />} />
        <Route path="/Home" element={<Home />} />
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h1>Multi-Step Form Example</h1>
            <Link to="/form/PersonalDetails">
              <button>Start Form</button>
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
