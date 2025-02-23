import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";

function Contact() {
  return (
    <div className="mb-2 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Contact Us
        </h2>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <MdEmail size={24} className="text-blue-600 dark:text-blue-400" />
            <label className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Email:
            </label>
            <a
              href="mailto:shamil.shamiyevx@gmail.com"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              shamil.shamiyevx@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <MdPhone size={24} className="text-blue-600 dark:text-blue-400" />
            <label className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              Phone:
            </label>
            <a
              href="tel:+994773264450"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              +994 77 326 44 50
            </a>
          </div>

          <div className="mt-8">
            <p className="leading-relaxed text-gray-700 dark:text-gray-400">
              Feel free to reach out to us with any questions or inquiries.
              We&apos;re here to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
