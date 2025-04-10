import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import FeaturesSection from "./components/FeaturesSection";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import ExitExamHome from "./components/ExitExam/pages/ExitExamHome";
import DepartmentList from "./components/ExitExam/pages/DepartmentList";
import ExamGenerator from "./components/ExitExam/pages/ExamGenerator";
import ExamInterface from "./components/ExitExam/pages/ExamInterface";
import DepartmentDetails from "./components/ExitExam/pages/DepartmentDetails";
import OldExamInterface from "./components/ExitExam/pages/OldExamInterface";
import BankInformation from "./components/ExitExam/pages/BankInformation";
import MyExams from "./components/ExitExam/pages/MyExams";
import Profile from "./components/ExitExam/pages/Profile";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="font-sans">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <AboutSection />
                <FeaturesSection />
                <Testimonials />
                <Footer />
              </>
            }
          />
          <Route
            path="/exit-exam"
            element={
              <>
                <ExitExamHome />
                <Footer />
              </>
            }
          />
          <Route
            path="/departments"
            element={
              <>
                <DepartmentList />
                <Footer />
              </>
            }
          />
          <Route
            path="/department/:id"
            element={
              <>
                <DepartmentDetails />
              </>
            }
          />
          <Route
            path="/generate-exam/:id"
            element={
              <>
                <ExamGenerator />
              </>
            }
          />
          <Route
            path="/exam/:id"
            element={
              <>
                <ExamInterface />
              </>
            }
          />
          <Route
            path="/bank-information"
            element={
              <>
                <BankInformation />
              </>
            }
          />
          <Route
            path="/my-exams"
            element={
              <>
                <MyExams />
                <Footer/>
              </>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <>
                <Profile />
                <Footer/>
              </>
            }
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
