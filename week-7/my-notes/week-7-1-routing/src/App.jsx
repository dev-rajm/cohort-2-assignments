import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";

/*
Enable the lazy loading concept to prevent the situation that sends you the whole javascript bundle when you hit the app.
Lazy loading enables sending bundle in parts that you requested by components.
*/
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));

/*
Step 1: Wrap everything under BrowserRouter Component
Step 2: Wrap your routes under Routes Component
Step 3: Define all your routes with path(= endpoint) and element(= component)
Step 4: To navigate between pages we have to use something called useNavigate hook comes from React. This hook and its all logic must be placed inside the BrowserRouter Component, otherwise it give error.
Tip 1: Defining your component outsize the Routes Component helps you to show them on every page you have.
Tip 2: To prevent hard reload during navigate through the app use useNavigate hook.
Tip 3: Wrap the lazily loading components inside the Suspense Component with a fallback props that should appear during component loads.
*/
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"loading..."}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"loading..."}>
                <Landing />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
