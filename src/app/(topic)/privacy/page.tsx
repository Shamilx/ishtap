import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen mb-2 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">Privacy Policy</h1>

          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            This Privacy Policy describes how ISHTAP collects, uses, and shares your information when you use our platform to connect employers and employees.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6">
            <li className="mb-2">
              <strong>Personal Information:</strong> We collect information you provide directly, such as your name, email address, phone number, professional experience, and resume.
            </li>
            <li className="mb-2">
              <strong>Usage Data:</strong> We gather information about how you interact with ISHTAP, including your search queries, profile views, and communication with other users.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about the device you use to access ISHTAP, such as your IP address, browser type, and operating system.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6">
            <li className="mb-2">To provide and improve ISHTAP&apos;s services, including matching employers and employees.</li>
            <li className="mb-2">To communicate with you about your account, job opportunities, and platform updates.</li>
            <li className="mb-2">To personalize your experience on ISHTAP.</li>
            <li className="mb-2">To analyze usage trends and improve our platform&apos;s functionality.</li>
            <li>To ensure the security and integrity of ISHTAP.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Sharing Your Information</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6">
            <li className="mb-2">Employers or employees when you apply for a job or connect with them on ISHTAP.</li>
            <li className="mb-2">Service providers who assist us with platform operations, such as hosting, analytics, and customer support.</li>
            <li className="mb-2">Legal authorities when required by law or to protect our rights.</li>
            <li>Business partners in connection with potential mergers, acquisitions, or sales.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Your Rights</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6">
            <li className="mb-2">Access and update your personal information.</li>
            <li className="mb-2">Delete your account and associated data.</li>
            <li className="mb-2">Object to certain data processing activities.</li>
            <li>Opt out of receiving marketing communications.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Data Security</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any material changes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Contact Us</h2>
          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at [Your Contact Email].
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;