import React, { useState, FormEvent } from 'react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Basic form validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-secondary/10 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Get In Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
              required
            />
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Send Message
            </button>
          </form>
          {submitted && (
            <p className="text-green-600 mt-4 text-center">
              Thank you for your message. We'll get back to you soon!
            </p>
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Location</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.8763989834!2d37.5753!3d0.4983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMCIyOSczMC42IkEgMzfCsDM0JzMzLjAiRQ!5e0!3m2!1sen!2ske!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;