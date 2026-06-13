"use client";

import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Spinner } from "./ui/spinner";

const signInFormSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(3, { message: "Password is required" }),
});

type SignInFormValues = z.infer<typeof signInFormSchema>;

export default function SignInForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    try {
      setIsLoading(true);
      await authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            router.push("/");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (err) {
      console.error({ err });
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="cursor-pointer">
              {isLoading ? <Spinner className="size-6" /> : "Sign In"}
            </Button>
            <p>
              Do not have an account?{" "}
              <Link href="/sign-up" className="text-blue-900">
                Sign up
              </Link>
            </p>

            <Separator />

            <Button
              type="button"
              variant="outline"
              className="text-[13px] cursor-pointer flex items-center gap-2 border-2 border-gray-300 shadow-sm"
              onClick={signInWithGoogle}
            >
              <FcGoogle className="text-xl" />
              <span className="font-medium">Google</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-[13px] cursor-pointer flex items-center gap-2 border-2 border-gray-300 shadow-sm"
              onClick={signInWithGithub}
            >
              <FaGithub className="text-xl" />
              <span className="font-medium">GitHub</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
