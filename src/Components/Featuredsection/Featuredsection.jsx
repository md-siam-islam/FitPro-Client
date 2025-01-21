import React from "react";

const Featuredsection = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold underline text-center mb-5">Featured section</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 bg-gray-100">
        <div class="bg-white rounded-lg shadow hover:shadow-lg p-6">
          <div class="flex justify-center items-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">User-Friendly Interface</h3>
          <p class="text-gray-600">
            Easily navigate through our platform with a clean and intuitive
            interface.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow hover:shadow-lg p-6">
          <div class="flex justify-center items-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8h18M9 20v-4a3 3 0 016 0v4"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Seamless Navigation</h3>
          <p class="text-gray-600">
            Enjoy seamless navigation with easy-to-access features across
            devices.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow hover:shadow-lg p-6">
          <div class="flex justify-center items-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8h18M9 20v-4a3 3 0 016 0v4"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Secure Environment</h3>
          <p class="text-gray-600">
            Protect your data with our state-of-the-art security features.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow hover:shadow-lg p-6">
          <div class="flex justify-center items-center w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full mb-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 6v6m6-12h6m-6 0h-6"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Customizable Settings</h3>
          <p class="text-gray-600">
            Adjust settings to your preferences with our easy-to-use
            customization options.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow hover:shadow-lg p-6">
          <div class="flex justify-center items-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"
              />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Multi-Platform Support</h3>
          <p class="text-gray-600">
            Our application works seamlessly across different devices and
            platforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Featuredsection;
