import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/common/PrivateRoute";
import ErrorModal from "./components/common/ErrorModal";

function App() {
  const error = useSelector((state: RootState) => state.data.error);
  const [errorOpen, setErrorOpen] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorOpen(true);
    }
  }, [error]);

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ErrorModal
        open={errorOpen}
        error={error || ""}
        onClose={handleCloseError}
      />
    </div>
  );
}

export default App;
