import { useState } from "react";
import Link from "next/link";
import Layouts from "../../components/layouts/Layouts";
import Toast from "../../components/Toast/Toast";
import PageTitle from "../../components/PageTitle";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState({
    show: false,
    msg: "",
    error: false,
  });

  const handlerChange = (e) => {
    if (e.target.name == "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name == "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/SignUp`, {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let response = await res.json();
    if (response.success) {
      setShowToast({
        show: true,
        msg: "Account created",
        error: false,
      });
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
    } else {
      setShowToast({
        show: true,
        msg: response.error,
        error: true,
      });
    }
  };
  return (
    <Layouts>
      <div className="">
        <PageTitle title={"Register"} />
        <Toast showToast={showToast} setShowToast={setShowToast} />
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3 relative">
            <video
              src={
                "https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/signup-bg.mp4?alt=media&token=bb3f9e5d-df36-4161-9cd7-872539ff950f"
              }
              autoPlay={true}
              loop={true}
              muted={true}
              className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
            />
            <div className="relative max-w-screen-xl flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <img
                  src="/logo/logo-transparent-white.svg"
                  alt=""
                  className="h-20 -ml-8"
                />

                <p className="max-w-xl mt-3 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
            <div className="flex-1">
              <div className="text-center">
                <h2 className="text-5xl font-normal font-BrownSugar text-primary">
                  Reale
                </h2>
                <p className="uppercase font-thin -mt-2">gioielleria</p>

                <p className="mt-3 text-gray-500">Register to becom member</p>
              </div>

              <div className="mt-8">
                <form method="POST">
                  <div className="flex items-center justify-between gap-1 mb-4">
                    <div>
                      <label
                        htmlFor="firstname"
                        className="block font-Cinzel font-medium mb-2 text-sm text-gray-600"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstname"
                        placeholder="Pratham"
                        onChange={handlerChange}
                        value={firstName}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lstname"
                        className="block font-Cinzel font-medium mb-2 text-sm text-gray-600"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastname"
                        placeholder="Sharma"
                        onChange={handlerChange}
                        value={lastName}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-Cinzel font-medium mb-2 text-sm text-gray-600"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="example@example.com"
                      onChange={handlerChange}
                      value={email}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-Cinzel font-medium text-gray-600"
                      >
                        Password
                      </label>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      onChange={handlerChange}
                      value={password}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-primary-black focus:border-primary-semi-light  focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <button
                    onClick={handlerSubmit}
                    className="mt-6 w-full text-center"
                  >
                    <div
                      className="relative w-full inline-block group focus:outline-none focus:ring cursor-pointer"
                      href="/download"
                    >
                      <span className="absolute w-full inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-primary-semi-light group-hover:translate-y-0 group-hover:translate-x-0"></span>
                      <span className="relative w-full inline-block px-8 py-3 text-sm font-bold tracking-widest text-black uppercase border-2 border-current group-active:text-opacity-75">
                        Register Now
                      </span>
                    </div>
                  </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Already have an account?{" "}
                  <Link href={"/login"}>
                    <span className="text-primary focus:outline-none focus:underline hover:underline cursor-pointer">
                      Signin
                    </span>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layouts>
  );
}

export default Register;
