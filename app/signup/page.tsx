"use client";
import { handleSignin } from "@/actions/actions";
import React from "react";
import { useFormState } from "react-dom";

function AuthPage() {
  const [state, action] = useFormState(handleSignin, undefined);
  return (
    <div className="flex flex-col self-center mb-96">
      <form className="flex flex-col gap-5 items-center" action={action}>
        <input type="text" name="name" placeholder="Login" className="p-2 rounded-md" />
        {state?.field == "name" && <p className="text-red-500 text-lg">{state.errorMessage}</p>}
        {/* <input type="password" placeholder="Password" className="p-2 rounded-md" /> */}
        <button className="bg-secondary w-max p-1 rounded-md hover:opacity-70" type="submit">
          Login
        </button>
      </form>
      {/* <Link href={"/login"} className="text-center">
        or sign in
      </Link> */}
    </div>
  );
}

export default AuthPage;
