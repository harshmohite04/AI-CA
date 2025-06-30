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
import MainPage from './Pages/MainPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import OTPVerification from './Pages/OTPVerification';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/form/PersonalDetails" element={<PersonalDetails />} />
        <Route path="/form/BankDetails" element={<BankDetails />} />
        <Route path="/form/ITRFilling" element={<ITRFilling />} />
        <Route path="/form/GSTfiling" element={<GSTfiling />} />
        <Route path="/form/TDSfiling" element={<TDSfiling />} />
        <Route path="/form/PayrollProcessing" element={<PayrollProcessing />} />
        <Route path="/form/BusinessDetails" element={<BusinessDetails />} />
        <Route path="/form/DocumentUploads" element={<DocumentUploads />} />
        <Route path="/home" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
