import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession, getSession } from "next-auth/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginOrRegisterPage() {
  // const { data: session, status } = useSession();
  const [formToShow, setFormToShow] = useState("login");
  const showForm = (type) => {
    switch (type) {
      case "login":
        return <Login setFormToShow={setFormToShow} />;

      case "register":
        return <Register setFormToShow={setFormToShow} />;

      default:
        return <Login setFormToShow={setFormToShow} />;
    }
  };
  // useEffect(() => {
  //   if (status == "authenticated") {
  //     console.log("session is ", session,"status is ", status);
  //   } else {
  //     console.log("session is ", session,"status is ", status);
  //   }
  // }, [status]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-screen min-h-screen flex justify-center items-center">
        <div className="max-w-xl bg-gray-900 mx-auto w-full border border-zinc-700 p-8 lg:p-16 rounded-2xl">
          {showForm(formToShow)}
        </div>
      </div>
      <ToastContainer theme="dark" />
    </>
  );
}

// styling
const labelClasses = `block mb-2 text-sm`;
const inputClasses = `block w-full bg-transparent border border-zinc-700 rounded-md p-2 mb-4`;
const buttonClasses = `mt-6 w-full bg-indigo-600 text-white text-center py-2 px-12 flex justify-center items-center rounded-md`;

// LOGIN FORM
function Login({ setFormToShow }) {
  const { register, handleSubmit, error } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log('data is',data);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });
    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-3xl text-center ">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 login-form">
          <fieldset>
            <div>
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                className={inputClasses}
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label className={labelClasses} htmlFor="password">
                Password
              </label>
              <input
                className={inputClasses}
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <button
              disabled={loading}
              className={`${buttonClasses} disabled:opacity-50`}
              type="submit"
            >
              Submit
            </button>
          </fieldset>
        </form>
        <p
          className="text-center cursor-pointer"
          onClick={() => setFormToShow("register")}
        >
          Don&apos;t have an account?{" "}
          <span className="hover:text-white">Sign up</span>
        </p>
      </div>
    </>
  );
}

// REGISTRATION FORM
function Register({ setFormToShow }) {
  const { register, handleSubmit, error } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password != data.passwordConfirm) {
      toast.error("Password & Confirm Password must match!");
      return;
    }
  };

  return (
    <>
      <div>
        <h2 className="font-bold text-3xl text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="my-8 register-form">
          <fieldset>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full lg:w-1/2 px-2">
                <label className={labelClasses} htmlFor="fName">
                  First Name
                </label>
                <input
                  className={inputClasses}
                  type="text"
                  {...register("fName", { required: true })}
                />
              </div>
              <div className="w-full lg:w-1/2 px-2">
                <label className={labelClasses} htmlFor="lName">
                  Last Name
                </label>
                <input
                  className={inputClasses}
                  type="text"
                  {...register("lName", { required: true })}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses} htmlFor="email">
                Email
              </label>
              <input
                className={inputClasses}
                type="email"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label className={labelClasses} htmlFor="password">
                Password
              </label>
              <input
                className={inputClasses}
                type="password"
                {...register("password", { required: true })}
              />
            </div>
            <div>
              <label className={labelClasses} htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <input
                className={inputClasses}
                type="password"
                {...register("passwordConfirm", { required: true })}
              />
            </div>
            <button className={buttonClasses} type="submit">
              Submit
            </button>
          </fieldset>
        </form>
        <p
          className="text-center cursor-pointer"
          onClick={() => setFormToShow("login")}
        >
          Have an account already?{" "}
          <span className="hover:text-white">Sign in</span>
        </p>
      </div>
    </>
  );
}

export default LoginOrRegisterPage;

export async function getServerSideProps(context) {

  const session = await getSession({ req: context.req })

  console.log(`session stringify is ${JSON.stringify(session,null,4)}`)
  if (session && session != null) {
      return {
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }

  return {
      props: {}
  }

}