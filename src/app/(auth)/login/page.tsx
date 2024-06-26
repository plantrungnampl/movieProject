"use client";
import { Suspense, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { auth } from "@/service/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import { formSchema } from "@/validation/form";
import { addDocument } from "@/service/serives";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const ggProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, ggProvider);
      const user = result.user;
      const token = await user.getIdToken();

      // Save token to localStorage
      localStorage.setItem("authToken", token);
      router.push("/");

      await addDocument("users", {
        uuid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        providerId: user.providerData[0].providerId,
      });

      setIsLoading(false);
    } catch (error) {
      console.error("Google login error:", error);
      setError("Failed to log in with Google.");
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    setError("");
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const token = await userCredential.user.getIdToken();
      const accountId = userCredential.user.uid;
      localStorage.setItem("authToken", token);
      localStorage.setItem("accountId", accountId);
      router.push("/");
      form.reset();

      toast({
        title: "Success",
        description: "You have successfully logged in",
        duration: 2000,
        style: {
          background: "green",
          color: "white",
        },
      });
    } catch (error: any) {
      handleFirebaseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFirebaseError = (error: any) => {
    let errorMessage = "An error occurred";
    if (error.code === "auth/user-not-found") {
      errorMessage = "User not found";
    } else if (error.code === "auth/wrong-password") {
      errorMessage = "Wrong password or email";
    } else if (error.code === "auth/too-many-requests") {
      errorMessage = "Too many requests, please try again later";
    } else if (error.code === "auth/invalid-credential") {
      errorMessage = "Invalid email or password";
    }

    setError(errorMessage);
    toast({
      title: "Error",
      description: errorMessage,
      duration: 2000,
      style: {
        background: "red",
        color: "white",
      },
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2 rounded-md bg-slate-600 shadow-lg flex flex-col p-3">
        <div className="h-28 w-full flex justify-center items-center">
          <span className="text-3xl text-black font-mono font-semibold bg-red-300 p-3 rounded-lg">
            Welcome
          </span>
        </div>
        <Form {...form}>
          <form
            className="h-full w-1/2 mx-auto space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link href="/reset-password">
              <span className="text-blue-500">Reset Password</span>
            </Link>
            {error && (
              <FormDescription className="text-red-500 text-sm">
                {error}
              </FormDescription>
            )}
            <Button className="w-full mt-6" type="submit">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
        <div className="mx-auto mt-6">
          <span className="text-sm block text-center">Or</span>
          <Button
            className="w-full mt-3"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Log in with Google"}
          </Button>
        </div>
        <div className="mx-auto mt-6 ">
          <span className="text-sm flex gap-1">
            {" Don't"} have an account?
            <Link href="/register">
              <span className="text-blue-500 font-semibold">Register Here</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

const LoginFormSuspense = () => (
  <Suspense fallback={<Loading number={3} />}>
    <LoginForm />
  </Suspense>
);

export default LoginFormSuspense;
