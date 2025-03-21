import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
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
          <Route path="/department/:id" element={<DepartmentDetails />} />
          <Route
            path="/generate-exam/:department"
            element={
              <>
                <ExamGenerator />
                <Footer />
              </>
            }
          />
          <Route path="/exam/:department" element={<ExamInterface />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
