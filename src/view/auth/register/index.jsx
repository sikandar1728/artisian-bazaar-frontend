import React from "react";
import UserSignupForm from "../form/signup";

const Signup = () => {
  return (
    <section className="flex max-md:h-screen">
      <img
        src="/src/assets/crafts.jpg"
        alt="login background craft"
        className="idden md:block w-2/5 lg:w-1/2 h-screen object-cover object-top"
      />
      <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col gap-10 items-center justify-center">
        <img src="/src/assets/ab-wooodmark.png" alt="woodmark logo" />
        <UserSignupForm />
      </div>
    </section>
  );
};

export default Signup;
