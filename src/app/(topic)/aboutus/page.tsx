import React from "react";

function AboutUs() {
  return (
    <div className="mb-2 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            About ISHTAP
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Connecting employers with the perfect talent, and employees with
            their dream jobs.
          </p>
        </div>

        <div className="mt-10">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-300">
              Our Mission
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-400">
              At ISHTAP, our mission is to simplify and enhance the hiring
              process for both employers and job seekers. We believe that
              finding the right match shouldn't be a tedious task.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-400">
              We strive to create a platform that fosters seamless connections,
              allowing employers to discover top-tier talent efficiently and
              enabling employees to find fulfilling career opportunities.
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-300">
              Our Vision
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-400">
              We envision a future where ISHTAP is the go-to platform for talent
              acquisition and career advancement. We aim to build a community
              where employers and employees can connect effortlessly, leading to
              mutual growth and success.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-400">
              We are committed to innovation, continuously improving our
              platform to meet the evolving needs of the job market.
            </p>
          </div>

          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-300">
              Why Choose ISHTAP?
            </h3>
            <ul className="list-inside list-disc text-gray-700 dark:text-gray-400">
              <li className="mb-2">
                <strong>Efficient Matching:</strong> Our advanced algorithms
                ensure accurate and relevant matches.
              </li>
              <li className="mb-2">
                <strong>User-Friendly Interface:</strong> Easy navigation for
                both employers and employees.
              </li>
              <li className="mb-2">
                <strong>Dedicated Support:</strong> We're here to assist you
                every step of the way.
              </li>
              <li>
                <strong>Community Focus:</strong> Building a platform that
                fosters valuable connections.
              </li>
            </ul>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Join ISHTAP today and experience the future of hiring!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
