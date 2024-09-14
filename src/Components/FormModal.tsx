import React from "react";

interface FormProps {
  onClose: () => void; 
}

export default function FormModal({ onClose }: FormProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="relative bg-white rounded-lg shadow px-16 flex flex-col">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="#c6c7c7"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close popup</span>
        </button>

        <div className="pt-5 pb-7">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center mb-4">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              User Registration
            </p>
            <p className="mt-2 text-sm leading-4 text-slate-600">
              Please fill out all the required forms to complete your
              registration.
            </p>
          </div>

          <form className="w-full">
            <label htmlFor="text" className="sr-only">
              Username
            </label>
            <input
              name="text"
              type="text"
              autoComplete="text"
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-black"
              placeholder="Username"
            />

            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-black"
              placeholder="Email Address"
            />

            <label htmlFor="number" className="sr-only">
              Number
            </label>
            <input
              name="number"
              type="number"
              autoComplete="number"
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-black"
              placeholder="Number"
            />

            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none disabled:bg-gray-400"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
