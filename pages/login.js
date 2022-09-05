import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      method="POST"
      className="mx-auto max-w-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h1 className="text-xl mb-4">Login</h1>
      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          {...register("email", {
            required: "please enter your email",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "please enter a valid email",
            },
          })}
          type="text"
          id="email"
          className="w-full"
          autoFocus
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 5,
              message: "password is greter than 5 characters",
            },
          })}
          type="password"
          id="password"
          className="w-full"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>
      <button className="primary-button">Submit</button>
    </form>
  );
}
