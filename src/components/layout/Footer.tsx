import React, { useState } from "react";
import { FaPaperPlane, FaRegCopyright } from "react-icons/fa";

const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple email validation
    if (!newsletterEmail || !newsletterEmail.includes("@") || !newsletterEmail.includes(".")) {
      setSubscriptionMessage("Please enter a valid email address.");
      setTimeout(() => setSubscriptionMessage(null), 3000);
      return;
    }

    // Simulate successful subscription
    console.log(`Subscribed with: ${newsletterEmail}`);
    setSubscriptionMessage(`Thank you for subscribing, ${newsletterEmail}! You'll receive our news soon.`);
    setNewsletterEmail("");
    setTimeout(() => setSubscriptionMessage(null), 5000);
  };

  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6 mt-12 shadow-inner">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="mb-8 border-b border-gray-700 pb-8">
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <FaPaperPlane className="text-emerald-400 mr-3" />
            Stay Updated
          </h3>
          <p className="text-gray-400 mb-4 max-w-lg">
            Subscribe to our newsletter for product updates, industry insights, and exclusive tips on ticket management.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full sm:flex-1 p-3 rounded-lg text-gray-800 border-2 border-transparent focus:border-emerald-500 focus:outline-none transition-colors shadow-inner"
              required
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-emerald-600 transition-colors transform hover:scale-[1.02] active:scale-100"
            >
              Subscribe
            </button>
          </form>

          {/* Subscription Message Feedback */}
          {subscriptionMessage && (
            <p className={`mt-3 text-sm font-medium p-2 rounded-lg ${
                subscriptionMessage.startsWith("Thank you")
                  ? "bg-emerald-700 text-emerald-100"
                  : "bg-red-700 text-red-100"
              }`}
            >
              {subscriptionMessage}
            </p>
          )}
        </div>

        {/* Copyright and Links Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
          <p className="text-gray-400 flex items-center">
            <FaRegCopyright className="mr-1" /> {new Date().getFullYear()} <strong>Ticket Management App</strong>. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
