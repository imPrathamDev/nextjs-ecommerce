import React from "react";
import Link from "next/link";
import bgImage from "../../public/bg.jpg";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { signIn, getSession, useSession } from "next-auth/react";
import Layouts from "../../components/layouts/Layouts";
import logo from "../../public/logo/logo-transparent-white.png";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
}

function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  const handlerChange = (e) => {
    if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (email.length > 0) {
      if (password.length > 0) {
        try {
          const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });
          console.log("Result => ", result);
          if (result.error) {
            toast.error(
              result.error.response &&
                result.error.response.data &&
                result.error.response.data.message
                ? result.error.response.data.message
                : result.error.message,
              {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          } else {
            toast.success("Login Successfully", {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } catch (error) {
          toast.error(
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : error.message,
            {
              position: "bottom-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } else {
        toast.error("Password can't empty!", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error("Email can't empty!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <Layouts>
      <div className="">
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/3 relative">
            <video
              src={
                "https://firebasestorage.googleapis.com/v0/b/replay-chat-dd920.appspot.com/o/bg-video.mp4?alt=media&token=d209c7b9-7afa-4f40-a115-c9cf76465325"
              }
              autoPlay={true}
              loop={true}
              muted={true}
              poster={bgImage}
              className="absolute inset-0 object-[75%] sm:object-[25%] object-cover w-full h-full opacity-25 sm:opacity-100"
            />
            <div className="relative max-w-screen-xl flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
              <div>
                <img
                  src="/logo/logo-transparent-white.png"
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

                <p className="mt-3 text-gray-500">
                  Sign in to access your account
                </p>
              </div>

              <div className="mt-8">
                <form method="POST">
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
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 border-primary-black focus:border-primary-semi-light dark:focus:border-primary-semi-light focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between mb-2">
                      <label
                        htmlFor="password"
                        className="text-sm font-Cinzel font-medium text-gray-600"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-sm text-gray-400 focus:text-primary hover:text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      onChange={handlerChange}
                      value={password}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border-2 border-primary-black focus:border-primary-semi-light  focus:ring-primary-semi-light focus:outline-none focus:ring focus:ring-opacity-40"
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
                        Signin Now
                      </span>
                    </div>
                  </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-400">
                  Don&#x27;t have an account yet?{" "}
                  <Link href={"/register"}>
                    <span className="text-primary focus:outline-none focus:underline hover:underline cursor-pointer">
                      Sign up
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

export default Login;
