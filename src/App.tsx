import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./app/router/pages/sign-in";
import SignUpPage from "./app/router/pages/sign-up";
import ForgotPasswordPage from "./app/router/pages/forgot-password";
import {Toaster} from "sonner" 

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-center" richColors /> 
      <Routes>
        <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;