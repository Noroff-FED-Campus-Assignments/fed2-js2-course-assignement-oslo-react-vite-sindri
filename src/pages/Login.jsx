/**
 * Contains form for logging a registered user profile.
 * @see https://docs.noroff.dev/social-endpoints/authentication
 */
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const navigateToHome = () => {
    setTimeout(() => {
      navigate({ to: "/" });
    }, 2000);
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    };

    try {
      const res = await fetch(
        "https://api.noroff.dev/api/v1/social/auth/login",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = await res.json();

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("user_email", data.email);
      setData(data);
      setIsSuccess(res.ok);
      navigateToHome();
    } catch (error) {
      console.warn("An error occurred", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>An error occurred: {error?.message}</div>;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 align-middle">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            LOGIN
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-8"
            action="/profile"
            method="#"
            onSubmit={handleOnSubmit}
          >
            <div>
              <div className="flex items-start">
                <label
                  htmlFor="email"
                  className="block text-l font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue="firnoroff.nost.last@stud.noroff.no"
                  className="block w-full rounded-md border-2 border-gray-300 py-2.5 text-start text-gray-900 shadow-sm ring-2 ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-l font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="PASSWORD"
                  autoComplete="current-password"
                  required
                  defaultValue="UzI1NiIsInR5cCI"
                  className="block w-full rounded-md border-2 border-gray-300 py-2.5 text-gray-900 shadow-sm ring-2 ring-gray-300 placeholder:text-gray-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex justify-center w-full w-86">
              <button
                type="submit"
                className="flex w-full justify-center w-86 rounded-md bg-blue-300 px-3 py-4 text-lg font-bold leading-6 text-white shadow-sm hover:from-green-800 hover:to-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
              >
                Login
              </button>
            </div>

            <div className="flex justify-center w-full w-86 mt-4">
              <Link
                to="/register"
                className="flex w-full justify-center w-86 rounded-md bg-green-400 px-3 py-4 text-lg font-bold leading-6 text-white shadow-sm hover:from-green-800 hover:to-green-700 focus-visible:outline focus-visible:outline-2 text-center focus-visible:outline-offset-2 focus-visible:outline-blue-200"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
