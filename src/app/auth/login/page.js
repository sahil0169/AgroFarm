// src/app/auth/login/page.js
"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirect to home page after successful login
    router.push("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
      <p>Don't have an account? <Link href="/auth/signup">Sign up</Link></p>
    </div>
  );
};

export default LoginPage;
