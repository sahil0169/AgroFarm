// src/app/auth/signup/page.js
"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    // Redirect to login page after successful signup
    router.push("/auth/login");
  };

  return (
    <div>
      <h1>Signup</h1>
      <AuthForm onSubmit={handleSignup} buttonText="Signup" />
      <p>Already have an account? <Link href="/auth/login">Login</Link></p>
    </div>
  );
};

export default SignupPage;
