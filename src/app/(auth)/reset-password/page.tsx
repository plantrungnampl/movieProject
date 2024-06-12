"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/service/firebase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

export default function ForgotPassword() {
  const [error, setError] = useState("");

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).min(1, {
      message: "Email is required",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: { email: string }) => {
    setError("");
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "Password reset email sent!",
        duration: 2000,
        style: {
          color: "white",
          backgroundColor: "green",
          direction: "ltr",
          textAlign: "center",
          padding: "10px",
        },
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col mx-auto my-0 bg-slate-600 p-80 shadow-2xl rounded-xl">
      <h1 className="text-white text-2xl font-bold">Reset your Password</h1>

      {error && <p>{error}</p>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
