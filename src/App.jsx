import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Dashboard from "../components/Pages/Dashboard";
import Landingpage from "../components/Pages/Landingpage";
import Profile from "../components/Pages/Profile";
import Layout from "../components/Layout";
import Forgetpassword from "../components/auth/Forgetpassowrd";
import PrivateRoute from "./PrivateRoute";
import SavedPosts from "../components/Pages/SavedPosts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          < Route path="/" element={<Layout />}>
            <Route index element={<Landingpage />} />
            <Route path="dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" 
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>

            } />
            <Route path="forget-password" element={<Forgetpassword />} />

            
            <Route path="saved-posts" element={
              <PrivateRoute>
              <SavedPosts/>
              </PrivateRoute>
              }/>

          </Route>

        </Routes>
      </Router>
    </>
  )

}

export default App
