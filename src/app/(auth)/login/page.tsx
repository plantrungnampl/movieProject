"use client";
import { useEffect, useState } from "react";
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

import Link from "next/link";

import { LoginEmailOrPassWorld, signInWithGoogle } from "@/lib/firebase/auth";
import { createSession } from "@/actions/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/validation/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  useEffect(() => {
    if (message) {
      toast({
        title: "Notification",
        description: message,
        duration: 2000,
        style: {
          color: "white",
          backgroundColor: "red",
        },
      });
    }
  }, [message]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleGoogleLogin = async () => {
    const userUid = await signInWithGoogle();
    if (userUid) {
      await createSession(userUid);
    }
  };

  const onSubmit = async (data: { email: string; password: string }) => {
    const userUid = await LoginEmailOrPassWorld(data);
    if (userUid) {
      await createSession(userUid);
    }
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
            // onClick={handleSignIn}
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
export default LoginForm;
