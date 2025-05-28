import React from 'react';
import { Link } from 'react-router-dom';

// Import assets 
import whiteMana from '../assets/images/white-mana.png';
import blueMana from '../assets/images/blue-mana.png';
import blackMana from '../assets/images/black-mana.png';
import redMana from '../assets/images/red-mana.png';
import greenMana from '../assets/images/green-mana.png';
import heroImage from '../assets/images/commander-playmat.jpeg';

// Reusable components 
function VerticalText() {
  return <div className="vertical-text">Commander's Quiver</div>;
}

function VerticalMana() {
  return (
    <div className="vertical-mana">
      <img src={whiteMana} className="mana-symbol" alt="White mana" />
      <img src={blueMana} className="mana-symbol" alt="Blue mana" />
      <img src={blackMana} className="mana-symbol" alt="Black mana" />
      <img src={redMana} className="mana-symbol" alt="Red mana" />
      <img src={greenMana} className="mana-symbol" alt="Green mana" />
    </div>
  );
}

function Feature({ title, description }) {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Testimonial({ quote, author }) {
  return (
    <div className="testimonial">
      <p>"{quote}" - {author}</p>
    </div>
  );
}

function FaqItem({ question, answer }) {
  return (
    <div className="faq-item">
      <h3>{question}</h3>
      <p>{answer}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/privacy">Privacy Policy</Link>
    </footer>
  );
}


// Main Landing Page Component
function LandingPage() {
  return (
    <div className="page">
      <VerticalText />
      <VerticalMana />

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Commander's Quiver</h1>
          <p>Organize your MTG Commander decks like a pro</p>
          <div className="cta-buttons">
             {/* Using Link and styling buttons via CSS */}
            <Link to="/signup"><button className="cta-primary">Get Started</button></Link>
            <Link to="/login"><button className="cta-secondary">Login</button></Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Magic: The Gathering Commander deck display" loading="lazy" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <Feature title="Organize Your Collection" description="Keep track of all your cards in one place." />
        <Feature title="Build Decks Faster" description="Create and optimize your Commander decks with ease." />
        <Feature title="Sync Across Devices" description="Access your collection and decks from anywhere." />
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Users Are Saying</h2>
        <div className="testimonial-grid">
          <Testimonial quote="Commander's Quiver has completely transformed how I manage my decks. It's a must-have for any Commander player!" author="Alex R." />
          <Testimonial quote="The deck-building tools are incredible. I’ve never built decks this fast before!" author="Jamie L." />
        </div>
      </div>

      {/* CTA Banner */}
      <div className="cta-banner">
        <p>Ready to take your Commander game to the next level? <Link to="/signup">Sign up now for free!</Link></p>
      </div>

      {/* FAQ Section */}
      <div className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <FaqItem question="Is Commander's Quiver free?" answer="Yes, you can start using Commander's Quiver for free with optional premium features." />
          <FaqItem question="Can I use it on my phone?" answer="Absolutely! Commander's Quiver is fully responsive and works on all devices." />
        </div>
      </div>

      {/* Community Section */}
      <div className="community">
        <h2>Join a Thriving Community</h2>
        <p>Share your decks, get feedback, and compete with other Commander players!</p>
        <Link to="/signup"><button className="cta-primary">Join the Community</button></Link>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LandingPage;