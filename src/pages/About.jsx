export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About GibiInfo</h1>
          <p className="text-xl max-w-3xl mx-auto">Empowering students to achieve academic excellence through innovative learning solutions.</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At GibiInfo, we believe that every student deserves access to high-quality educational resources. Our mission is to make learning more engaging, effective, and accessible through our comprehensive practice platform.
              </p>
              <p className="text-gray-600">
                We strive to help students master their subjects by providing detailed explanations, personalized feedback, and a vast collection of practice questions.
              </p>
            </div>
            <div>
              <img 
                src="https://img.freepik.com/free-vector/team-goals-concept-illustration_114360-5176.jpg" 
                alt="Our Mission"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img 
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" 
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img 
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" 
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
              <p className="text-gray-600">Head of Education</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <img 
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg" 
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Mike Johnson</h3>
              <p className="text-gray-600">Technical Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">Constantly improving our platform</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">Excellence in education</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Supporting student growth</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trust</h3>
              <p className="text-gray-600">Building reliable solutions</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}