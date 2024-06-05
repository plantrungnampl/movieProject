// // import React from "react";

// // export default function Register() {
// //   return <div>Register</div>;
// // }
// "use client";

// import { Suspense, useState } from "react";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import Link from "next/link";
// import { auth } from "@/service/firebase";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import { toast } from "@/components/ui/use-toast";
// import Loading from "@/app/loading";
// const formSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
// });
// // interface LoginFormProps {
// //   resgister: () => void;
// // }
// export default function Register() {
//   const route = useRouter();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });
//   // const onSubmit = (data: any) => console.log(data);
//   const onSubmit = async (data: z.infer<typeof formSchema>) => {
//     if (data.password !== data.confirmPassword) {
//       form.setError("confirmPassword", {
//         type: "manual",
//         message: "Passwords do not match",
//       });
//       return;
//     }
//     createUserWithEmailAndPassword(auth, data.email, data.password)
//       .then((response) => {
//         console.log(response);
//         toast({
//           title: "Success",
//           description: "You have successfully registered",
//           duration: 2000,
//           style: {
//             color: "white",
//             backgroundColor: "green",
//           },
//         });
//         form.reset();
//         route.push("/login");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   return (
//     <>
//       <div className="h-screen flex justify-center items-center">
//         <div className="w-1/2 rounded-md bg-slate-600 shadow-lg flex justify-between flex-col">
//           <div className="h-28 w-full justify-center flex items-center">
//             <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">
//               Register
//             </span>
//           </div>
//           <Form {...form}>
//             <form
//               className="h-full w-1/2 mx-auto"
//               onSubmit={form.handleSubmit(onSubmit)}
//             >
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-black">Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="email@example.com" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-black">Password</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="password"
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="confirmPassword"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-black">
//                       Confirm password
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Confirm password"
//                         type="password"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button className="flex justify-center mt-6 mb-3" type="submit">
//                 Submit
//               </Button>
//             </form>
//           </Form>
//           <div className="h-20 mx-auto">
//             <span className="text-sm ">
//               If you have an account?
//               <Link href={"/login"}>
//                 <span className="text-blue-500 font-semibold text-md">
//                   {" "}
//                   Login Here
//                 </span>
//               </Link>
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import Loading from "@/app/loading";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const RegisterPage = () => {
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.password !== data.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        console.log(response);
        toast({
          title: "Success",
          description: "You have successfully registered",
          duration: 2000,
          style: {
            color: "white",
            backgroundColor: "green",
          },
        });
        form.reset();
        route.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-1/2 rounded-md bg-slate-600 shadow-lg flex justify-between flex-col">
          <div className="h-28 w-full justify-center flex items-center">
            <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">
              Register
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
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Confirm password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="flex justify-center mt-6 mb-3" type="submit">
                Submit
              </Button>
            </form>
          </Form>
          <div className="h-20 mx-auto">
            <span className="text-sm ">
              If you have an account?
              <Link href={"/login"}>
                <span className="text-blue-500 font-semibold text-md">
                  {" "}
                  Login Here
                </span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const Register = () => (
  <Suspense fallback={<Loading />}>
    <RegisterPage />
  </Suspense>
);

export default Register;
