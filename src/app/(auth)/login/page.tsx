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
import { addDocument } from "@/service/serives";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/app/loading";
import { formSchema } from "@/validation/form";

const LoginForm = () => {
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
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

      // Lưu token vào localStorage
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

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await userCredential.user.getIdToken();
      const accountId = await userCredential.user.uid;
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
      if (error.code === "auth/user-not-found") {
        setError("User not found");
        toast({
          title: "Error",
          description: "User not found",
          duration: 2000,
          style: {
            background: "red",
            color: "white",
          },
        });
      } else if (error.code === "auth/wrong-password") {
        setError("Wrong password or email");
        toast({
          title: "Error",
          description: "Wrong password or email",
          duration: 2000,
          style: {
            background: "red",
            color: "white",
          },
        });
      } else if (error.code === "auth/too-many-requests") {
        setError("Too many requests");
        toast({
          title: "Error",
          description: "Too many requests, please try again later",
          duration: 2000,
          style: {
            background: "red",
            color: "white",
          },
        });
      } else if (error.code == "auth/invalid-credential") {
        setError("Invalid email or password");
        toast({
          title: "Error",
          description: "Invalid email or password",
          duration: 2000,
          style: {
            background: "red",
            color: "white",
          },
        });
      } else {
        setError("Something went wrong google");
      }
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-1/2 rounded-md bg-slate-600 shadow-lg flex justify-between flex-col">
        <div className="h-28 w-full justify-center flex items-center">
          <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">
            Welcome
          </span>
        </div>
        <Form {...form}>
          <form
            className="h-full w-1/2 mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
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
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormDescription className="text-red-500 text-sm">
              {error}
            </FormDescription>
            <Button className="flex justify-center mt-6 mb-3" type="submit">
              Submit
            </Button>
          </form>
        </Form>
        <div className="mx-auto">
          <span className="text-sm block text-center">Hoặc</span>
          <Button
            className="flex justify-center mt-6 mb-3"
            onClick={handleGoogleLogin}
          >
            Đăng nhập bằng Google
          </Button>
        </div>
        <div className="h-20 mx-auto">
          <span className="text-sm ">
            You not have an account?
            <Link href={"/register"}>
              <span className="text-blue-500 font-semibold text-md">
                {" "}
                Register Here
              </span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

const LoginFormSuspense = () => (
  <Suspense fallback={<Loading />}>
    <LoginForm />
  </Suspense>
);

export default LoginFormSuspense;
