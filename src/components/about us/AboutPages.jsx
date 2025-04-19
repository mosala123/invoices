import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageabout from "../../images/istockphoto-1347264285-612x612.webp"
import mosalah from "../../images/mosalah.jpg"
import kalil from "../../images/photo_2025-04-19_13-30-23.jpg"
import { Link } from 'react-router-dom';
import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const AboutPages = () => {
  return (
    <div className='bg-light'>
      <div className="container ">
        <h1 className="text-center pt-5 mb-1  " style={{ color: "#2C3E50" }}>Automatic Invoice Generation System </h1>






        <section className="container-fluid py-5 bg-light shadow-sm">
          <div className="container">
            <div className="row d-flex align-items-center">

              <div className="col-lg-6">
                <h3 className="text-primary fw-bold"> Project Introduction</h3>
                <p className="lead">
                  In today’s rapidly evolving digital landscape, freelancers and small business owners face
                  significant challenges in managing their financial operations and invoicing. To address this,
                  <strong> the Automated Invoice Generation System </strong> was developed as an innovative
                  solution that simplifies the process of creating invoices, managing payments, and improving
                  financial efficiency.
                </p>
                <p>
                  This system is designed to be <strong> user-friendly, accurate, and reliable </strong>, allowing
                  users to generate invoices with a single click, send them directly to clients, and track
                  payments through an intuitive and seamless interface.
                </p>
                <p className="text-muted">
                  We believe that technology can be a powerful tool for empowering individuals and startups.
                  Our team is committed to continuously enhancing the system with new features to make
                  invoicing more efficient, secure, and hassle-free.
                </p>
              </div>

              <div className="col-lg-6 d-none d-lg-block text-center">
                <img
                  src={imageabout}
                  alt="Invoice System Illustration"
                  className="img-fluid w-75"
                />
              </div>

            </div>



            {/* Ready to Get Started Section */}
            <div className="mt-4 text-center">
              <h3 className="fw-bold text-primary"> Ready to Get Started?</h3>
              <p>
                Take control of your finances today! With just a few clicks, you can create invoices,
                track payments, and manage your business effortlessly. Whether you're a freelancer or a business owner,
                our platform adapts to your needs and makes invoicing stress-free.
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Link to="/registerclient" className="btn btn-primary fw-bold px-4 py-2">
                  Register as a User
                </Link>
                <Link to="/registerfreelancer" className="btn btn-outline-primary fw-bold px-4 py-2">
                  Register as a Freelancer
                </Link>
              </div>
            </div>

          </div>
        </section>






        {/* Project Idea */}
        <section className="row mb-5 p-4 bg-light rounded shadow-sm">
          <div className="col-md-12">
            <h2 className="text-primary fw-bold">Project Idea</h2>

            <p className="lead">
              The idea for the <strong>Automated Invoice Generation System</strong> was born out of the
              growing challenges faced by freelancers, small business owners, and independent contractors
              when managing invoices and tracking payments. As businesses shift towards digital solutions,
              traditional invoicing methods remain outdated, inefficient, and time-consuming.
            </p>

            <p>
              Many professionals struggle with creating professional invoices, keeping track of pending
              payments, and ensuring timely transactions. The process often involves manually generating
              invoices using spreadsheets or generic templates, which increases the risk of errors, delays,
              and financial mismanagement.
            </p>

            <p>
              Our system is designed to <strong>eliminate these inefficiencies</strong> by providing
              an intelligent, automated invoicing solution that is both simple and powerful. With just
              a few clicks, users can generate invoices, send them to clients, and track their financial
              transactions seamlessly.
            </p>

            <p>
              One of the major problems our system addresses is <strong>late payments</strong>. Many freelancers
              face challenges in ensuring that their clients pay on time, leading to cash flow issues. Our platform
              integrates automated payment reminders, status tracking, and real-time notifications to ensure users
              stay updated on their pending invoices.
            </p>

            <p>
              Additionally, organizing and managing invoices can be overwhelming for professionals handling multiple
              projects. Our system provides a centralized dashboard that categorizes invoices, tracks due dates, and
              even generates reports for better financial planning.
            </p>

            <p>
              Another key issue is compliance and taxation. Many professionals struggle with tax calculations and
              record-keeping, which can lead to compliance risks. Our system incorporates tax calculations and
              expense tracking features, making financial management effortless and stress-free.
            </p>

            <p>
              Ultimately, our goal is to create a <strong>user-friendly, intelligent, and automated invoicing
                solution</strong> that not only simplifies the invoicing process but also empowers users to
              take control of their finances and business growth.
            </p>

            <p className="text-muted">
              By addressing these pain points, we aim to revolutionize the way freelancers and businesses
              handle their invoicing, ensuring accuracy, transparency, and efficiency at every step.
            </p>
          </div>
        </section>



        {/* Vision & Mission */}
        <section className="row mb-5 p-4 bg-light rounded shadow-sm">
          <div className="col-md-12">
            <h2 className="text-primary fw-bold">Vision & Mission</h2>

            {/* Vision */}
            <h3 className="fw-semibold mt-4">Our Vision</h3>
            <p className="lead">
              We envision a future where freelancers, independent contractors, and small business owners
              can manage their finances effortlessly without the stress of manual invoicing. Our goal is
              to become the <strong>leading automated invoicing solution</strong> for professionals worldwide,
              helping them streamline their financial operations with ease and confidence.
            </p>

            <p>
              In the next few years, we aim to revolutionize the invoicing industry by integrating
              <strong>cutting-edge technologies</strong> such as AI-driven analytics, smart invoicing,
              and seamless financial automation. By doing so, we aspire to empower users with a
              <strong>comprehensive, intelligent, and user-friendly platform</strong> that enhances
              their productivity and ensures financial stability.
            </p>

            <p>
              Our ultimate vision is to build a world where financial management is no longer a
              burden but a seamless, automated experience that allows individuals to focus on their
              passion, creativity, and business growth without worrying about late payments or
              complex invoicing tasks.
            </p>

            {/* Mission */}
            <h3 className="fw-semibold mt-4">Our Mission</h3>
            <p className="lead">
              Our mission is to deliver <strong>an innovative, secure, and efficient invoicing
                solution</strong> that simplifies financial processes for professionals across various
              industries. We are committed to providing a platform that ensures <strong>accuracy,
                transparency, and automation</strong> in every step of the invoicing cycle.
            </p>

            <p>
              We strive to eliminate the common challenges freelancers and businesses face, such as
              <strong>delayed payments, lost invoices, and complex financial tracking</strong>.
              By leveraging technology, we offer a system that not only generates invoices but also
              tracks payments, sends automated reminders, and provides financial insights.
            </p>

            <p>
              Our platform is designed with <strong>user experience in mind</strong>. We aim to make
              invoicing as easy as possible with an intuitive interface, customizable templates,
              and seamless integrations with various payment gateways.
            </p>

            <p>
              Beyond just invoicing, we believe in <strong>financial empowerment</strong>. Our mission
              extends to educating users on financial literacy, providing analytics to help them make
              informed decisions, and ensuring compliance with tax regulations effortlessly.
            </p>

            <p>
              We are constantly innovating to add new features, such as AI-powered invoice predictions,
              expense tracking, and multi-currency support, ensuring that our users stay ahead in
              managing their financial transactions with efficiency and confidence.
            </p>

            <p className="text-muted">
              Our commitment is to continuously evolve, adapt to the latest financial trends, and
              provide a future-ready invoicing system that caters to the diverse needs of professionals
              in a rapidly changing digital landscape.
            </p>
          </div>
        </section>


        {/* Team Section */}
        <section className="container my-5">
          <h2 className="text-center text-primary fw-bold mb-4">Meet Our Team</h2>
          <div className="row g-4">

            {/* mo Salah */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <img src={mosalah} className="card-img-top" alt="Mohamed Ibrahim Salah" style={{ height: "269px " }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Mohamed Ibrahim Salah</h5>
                  <p className="text-muted">Front-end Developer</p>
                  <p className="card-text">
                    A passionate front-end developer with expertise in modern frameworks,
                    creating dynamic and user-friendly web applications.
                  </p>
                  <div className="d-flex justify-content-center gap-4 mt-1">
                    {/* Email */}
                    <a href="mailto:elmosalah74@gmail.com" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaEnvelope />
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/mosala123" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                      <FaGithub />
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/mohamed-ibrahim-1a6a9131b/" target="_blank" rel="noopener noreferrer" className="text-info fs-4">
                      <FaLinkedin />
                    </a>

                    {/* Facebook */}
                    <a href="https://www.facebook.com/your-facebook-username" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaFacebook />
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/your-instagram-username" target="_blank" rel="noopener noreferrer" className="text-danger fs-4">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* mo rashed  */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <img src={kalil} className="card-img-top" alt="Back-end Developer" style={{ height: "269px " }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Mo Ahmed </h5>
                  <p className="text-muted">Back-end Developer</p>
                  <p className="card-text">
                    A skilled back-end developer specializing in API development,
                    database optimization, and server-side logic.
                  </p>
                  <div className="d-flex justify-content-center gap-4 mt-1">
                    {/* Email */}
                    <a href="mailto:elmosalah74@gmail.com" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaEnvelope />
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                      <FaGithub />
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer" className="text-info fs-4">
                      <FaLinkedin />
                    </a>

                    {/* Facebook */}
                    <a href="https://www.facebook.com/your-facebook-username" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaFacebook />
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/your-instagram-username" target="_blank" rel="noopener noreferrer" className="text-danger fs-4">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Khalil Gamal  */}
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <img src={kalil} className="card-img-top" alt="Frontend Developer" style={{ height: "269px" }} />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Khalil Gamal</h5>
                  <p className="text-muted">Frontend Developer</p>
                  <p className="card-text">
                    Skilled in building modern and responsive user interfaces using HTML, CSS, and Bootstrap,
                    ensuring a smooth and attractive web experience.
                  </p>
                  <div className="d-flex justify-content-center gap-4 mt-1">
                    {/* Email */}
                    <a href="mailto:elmosalah74@gmail.com" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaEnvelope />
                    </a>
                    {/* Facebook */}
                    <a href="https://www.facebook.com/your-facebook-username" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaFacebook />
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/your-instagram-username" target="_blank" rel="noopener noreferrer" className="text-danger fs-4">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>


            {/* mo ..*/}
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <img src={imageabout} className="card-img-top" alt="Full-stack Developer" />
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">Messssssi </h5>
                  <p className="text-muted">Full-stack Developer</p>
                  <p className="card-text">
                    A highly skilled full-stack developer with expertise in both front-end
                    and back-end technologies, building scalable applications.
                  </p>
                  <div className="d-flex justify-content-center gap-4 mt-1">
                    {/* Email */}
                    <a href="mailto:elmosalah74@gmail.com" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaEnvelope />
                    </a>

                    {/* GitHub */}
                    <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="text-dark fs-4">
                      <FaGithub />
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer" className="text-info fs-4">
                      <FaLinkedin />
                    </a>

                    {/* Facebook */}
                    <a href="https://www.facebook.com/your-facebook-username" target="_blank" rel="noopener noreferrer" className="text-primary fs-4">
                      <FaFacebook />
                    </a>

                    {/* Instagram */}
                    <a href="https://www.instagram.com/your-instagram-username" target="_blank" rel="noopener noreferrer" className="text-danger fs-4">
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>




        <section className="container-fluid py-5 bg-light shadow-sm">
          <div className="container">
            <h2 className="fw-bold mb-4 text-center text-primary">Our Values & Principles</h2>
            <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
              Our project is built on strong foundations that ensure efficiency, transparency, and reliability.
              We are committed to providing a seamless experience for freelancers by simplifying financial management and optimizing invoicing processes.
            </p>

            <div className="row mt-4">
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🔹 Simplicity</h4>
                  <p>We believe in making financial tracking and invoicing as simple as possible. Our platform is designed to be intuitive and user-friendly, eliminating the complexity of accounting.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🔹 Accuracy</h4>
                  <p>Every transaction is precise and well-documented. Our system ensures correct tax calculations, real-time updates, and error-free invoice generation, reducing financial discrepancies.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🔹 Transparency</h4>
                  <p>We ensure clarity in financial operations. With real-time invoice tracking and clear payment terms, freelancers have full control over their financial data without hidden fees.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🔹 Innovation</h4>
                  <p>We continuously enhance our platform by integrating the latest financial technologies to improve automation, security, and ease of use.</p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🔹 Customer Commitment</h4>
                  <p>Our users are at the heart of everything we do. We actively listen to their needs, improve features based on feedback, and provide dedicated support to ensure a smooth experience.</p>
                </div>
              </div>
            </div>
          </div>
        </section>




        <section className="container-fluid py-5 bg-light shadow-sm">
          <div className="container">
            <h2 className="fw-bold mb-4 text-center text-primary">Technologies Used</h2>
            <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
              Our system is built using cutting-edge technologies to ensure <strong>efficiency, scalability, and security</strong>.
              We carefully selected the best tools and frameworks to provide a <strong>seamless user experience</strong> for freelancers managing their invoices.
            </p>

            <div className="row mt-4">
              {/* Frontend Technologies */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🖥️ Frontend Development</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>React.js:</strong> Dynamic & interactive UI.</li>
                    <li className="list-group-item"><strong>Bootstrap:</strong> Responsive & modern design.</li>
                    <li className="list-group-item"><strong>Axios:</strong> Efficient API requests.</li>
                    <li className="list-group-item"><strong>React Router:</strong> Smooth page navigation.</li>
                  </ul>
                </div>
              </div>

              {/* Backend Technologies */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🛠️ Backend Development</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Node.js:</strong> Fast & scalable runtime.</li>
                    <li className="list-group-item"><strong>Express.js:</strong> Lightweight API framework.</li>
                    <li className="list-group-item"><strong>Prisma:</strong> Modern ORM with TypeScript.</li>
                    <li className="list-group-item"><strong>JWT:</strong> Secure authentication.</li>
                  </ul>
                </div>
              </div>

              {/* Database Technologies */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">💾 Database</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>PostgreSQL:</strong> Powerful relational database.</li>
                    <li className="list-group-item"><strong>MongoDB:</strong> Flexible NoSQL database.</li>
                  </ul>
                </div>
              </div>

              {/* Additional Tools */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold text-primary">🔧 Additional Tools & Services</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Git & GitHub:</strong> Version control & collaboration.</li>
                    <li className="list-group-item"><strong>Vercel / Netlify:</strong> Fast frontend deployment.</li>
                    <li className="list-group-item"><strong>Docker:</strong> Easy containerization.</li>
                    <li className="list-group-item"><strong>CI/CD (GitHub Actions):</strong> Automated testing & deployment.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>



        <section className="container-fluid py-5 bg-light shadow-sm">
          <div className="container">
            <h2 className="fw-bold mb-4 text-center">Future Vision</h2>
            <p className="text-center mx-auto" style={{ maxWidth: "800px" }}>
              Our goal is to continuously enhance and expand our invoicing system to meet the evolving needs of freelancers
              and small businesses. We envision a future where invoice management is fully automated, highly intuitive, and seamlessly integrated
              with financial tools.
            </p>

            <div className="row mt-4">
              {/* Short-Term Plans */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold">📌 Short-Term Plans</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>🔗 Payment Gateway Integration:</strong> Support for PayPal, Stripe, etc.</li>
                    <li className="list-group-item"><strong>📊 Advanced Reports:</strong> Financial summaries & insights.</li>
                    <li className="list-group-item"><strong>📱 Mobile App:</strong> User-friendly mobile experience.</li>
                    <li className="list-group-item"><strong>🌐 Multi-Language Support:</strong> Expanding global accessibility.</li>
                  </ul>
                </div>
              </div>

              {/* Mid-Term Plans */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold">🚀 Mid-Term Plans</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>🤖 AI Automation:</strong> Smart invoice generation & reminders.</li>
                    <li className="list-group-item"><strong>📌 Project & Task Management:</strong> Adding organizational features.</li>
                    <li className="list-group-item"><strong>📎 Accounting Integration:</strong> Syncing with QuickBooks, Xero.</li>
                    <li className="list-group-item"><strong>💳 Subscription Plans:</strong> Premium features for businesses.</li>
                  </ul>
                </div>
              </div>

              {/* Long-Term Plans */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold">🌍 Long-Term Plans</h4>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>🏦 AI Financial Advisory:</strong> Smart insights & planning.</li>
                    <li className="list-group-item"><strong>🔒 Blockchain Security:</strong> Enhancing security & transparency.</li>
                    <li className="list-group-item"><strong>🛒 Freelancer Marketplace:</strong> Connecting clients & freelancers.</li>
                    <li className="list-group-item"><strong>🌎 Global Expansion:</strong> Adapting to international markets.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>




        <section className="container-fluid py-5 bg-light shadow-sm">
          <div className="container text-center">
            <h2 className="fw-bold mb-4">📝 Language & Style</h2>

            <div className="row justify-content-center">
              {/* Simplicity vs. Technicality */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold">🎯 Simplicity vs. Technicality</h4>
                  <p>
                    Our platform is designed to be <strong>accessible to freelancers and business owners</strong>,
                    regardless of their technical expertise. We use <strong>simple, clear language</strong>
                    while incorporating <strong>technical terminology</strong> where necessary for professionals.
                  </p>
                </div>
              </div>

              {/* Friendly Yet Professional */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold">🤝 Friendly Yet Professional</h4>
                  <p>
                    We strive to create a <strong>welcoming and supportive experience</strong> while maintaining
                    a <strong>high level of professionalism</strong>. Our tone is friendly, encouraging, and always respectful.
                  </p>
                </div>
              </div>

              {/* Adaptability */}
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h4 className="fw-bold">🛠️ Adaptability</h4>
                  <p>
                    We understand that different users have different needs. Whether you’re a <strong>freelancer
                      looking for easy invoicing</strong> or a <strong>business owner seeking advanced financial tracking</strong>,
                    our system adapts to your requirements with clear, well-structured communication.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>








        <section className="container-fluid py-5 bg-light shadow-sm">
          <div className="container text-center">
            <h2 className="fw-bold mb-3">📞 Contact Our Team</h2>
            <p className="mx-auto" style={{ maxWidth: "700px" }}>
              Have any questions or feedback? We’d love to hear from you!
              Reach out to us through email or connect with us on social media.
            </p>

            {/* Contact Details */}
            <div className="row mt-4 justify-content-center">
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h5 className="fw-bold">📧 Email</h5>
                  <p>
                    <a href="mailto:elmosalah74@gamil.com" className="text-primary fw-bold">
                      elmosalah74@gamil.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="col-md-6 col-lg-4 mb-4">
                <div className="p-4 bg-white rounded shadow-sm h-100">
                  <h5 className="fw-bold">🌍 Social Media</h5>
                  <div className="d-flex justify-content-center gap-3 fs-4">
                    <Link to="https://linkedin.com/company/invoicepro" target="_blank" className="text-primary fw-bold">
                      <FaLinkedin />
                    </Link>
                    <Link to="https://twitter.com/invoicepro" target="_blank" className="text-primary fw-bold">
                      <FaTwitter />
                    </Link>
                    <Link to="https://facebook.com/invoicepro" target="_blank" className="text-primary fw-bold">
                      <FaFacebookSquare />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Team Info */}
            <div className="mt-5">
              <h4 className="fw-bold">💼 Need Support?</h4>
              <p className="mx-auto" style={{ maxWidth: "700px" }}>
                Our team is available 24/7 to assist you. Join our support community or
                chat with us for any inquiries.
              </p>
              <Link to="https://discord.com/invite/invoicepro" target="_blank" className="btn btn-primary fw-bold">
                Join Our Discord Community
              </Link>
            </div>
          </div>
        </section>








      </div>
    </div>
  );
};

export default AboutPages;