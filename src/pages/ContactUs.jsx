import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Label, Switch } from "@headlessui/react";
import { contact } from "../services/contact";
import { toast } from "react-toastify";

export default function ContactUs() {
  const navigate = useNavigate();
  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleContact = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await contact({
        fristName,
        lastName,
        email,
        message,
        agreed,
      });

      toast.success("Your message has been sent successfully.", {
        className:
          "bg-gradient-to-r from-brandPrimary to-brandSecondary text-white custom-toast-success",
        position: "bottom-right",
      });
      setFristName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setAgreed(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="isolate bg-brandBackground-default px-6 py-16 sm:py-20 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="text-sm text-brandPrimary hover:text-brandSecondary mb-6 flex items-center self-start"
      >
        <svg
          className="h-4 w-4 mr-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Home
      </button>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-brandPrimary text-4xl font-semibold tracking-tight sm:text-5xl">
          Contact Us
        </h2>
        <p className="mt-2 text-lg text-brandSecondary">
          We're here to help you plan your perfect trip. Reach out to our team
          for personalized support and travel advice.
        </p>
      </div>
      {/* Form */}
      <form
        onSubmit={handleContact}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm/6 font-semibold text-brandPrimary"
            >
              First name *
            </label>
            <div className="mt-2.5">
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                value={fristName}
                onChange={(e) => setFristName(e.target.value)}
                autoComplete="given-name"
                className={`lock w-full rounded-md bg-white px-3.5 py-2 text-base 
                text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
                placeholder:text-gray-400 focus:outline focus:outline-2 
                focus:-outline-offset-2 focus:outline-brandPrimary
                ${
                  errors.fristName
                    ? "border-2 border-rose-500"
                    : "border-gray-300"
                }
                `}
              />
              <small className="text-rose-500">{errors.fristName}</small>
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm/6 font-semibold text-brandPrimary"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                id="last-name"
                name="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
                placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-brandPrimary
                ${
                  errors.lastName
                    ? "border-2 border-rose-500"
                    : "border-gray-300"
                }
                `}
              />
              <small className="text-rose-500">{errors.lastName}</small>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm/6 font-semibold text-brandPrimary"
            >
              Email *
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={`block w-full rounded-md bg-white px-3.5 py-2 text-base 
                
                text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
                
                placeholder:text-gray-400 focus:outline focus:outline-2 
                focus:-outline-offset-2 focus:outline-brandPrimary
                ${errors.email ? "border-2 border-rose-500" : "border-gray-300"}
                `}
              />
              <small className="text-rose-500">{errors.email}</small>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm/6 font-semibold text-brandPrimary"
            >
              Message *
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline 
                focus:outline-2 focus:-outline-offset-2 focus:outline-brandPrimary
                ${
                  errors.message
                    ? "border-2 border-rose-500"
                    : "border-gray-300"
                }
                `}
                defaultValue={""}
              />
              <small className="text-rose-500">{errors.message}</small>
            </div>
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandPrimary data-[checked]:bg-brandPrimary"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm/6 text-gray-600">
              By selecting this, you agree to our{" "}
              <a href="#" className="font-semibold text-brandPrimary">
                privacy&nbsp;policy
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            disabled={isLoading}
            type="submit"
            className={`block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
            bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary
            ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isLoading ? "Let's talk..." : "Let's talk"}
          </button>
          {errors.general && (
            <p className="mt-2 text-center text-sm text-rose-500">
              {errors.general}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
