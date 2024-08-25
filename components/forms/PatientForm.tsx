"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next13-progressbar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { UserFormValidation, LoginFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import appwriteService from "@/hooks/auth.lib";
import { useAppwrite } from "@/hooks/useAppwrite";
import { CreateUserParams } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "@/app/loading";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user, loading } = useAppwrite();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoggedIn && user) {
      redirectUser(user);
    }
  }, [isLoggedIn, user, loading]);

  const redirectUser = (user: any) => {
    if(!user) return;
    const userType = user.labels[0];
    const paths = {
      admin: "/admin",
      doctor: `/doctor/${user.$id}`,
      patient: `/patients/${user.$id}/dashboard`,
    };
    const path = paths[userType as keyof typeof paths] || "/";
    router.push(path);
  };

  const signUpForm = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const loginForm = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSignUpSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);
      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while creating the account.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const onLoginSubmit = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);

    try {
      const loggedInUser = await appwriteService.login({
        email: values.email,
        password: values.phone,
      });
      if (loggedInUser) {
        redirectUser(loggedInUser);
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while logging in.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  const createUser = async (user: CreateUserParams) => {
    try {
      const userData = await appwriteService.createUserAccount({
        email: user.email,
        password: user.phone,
        name: user.name,
      });
      return userData;
    } catch (error: any) {
      console.error("An error occurred while creating a new user:", error);
      if (error.type === "user_already_exists") {
        throw new Error("User already exists. Please try logging in.");
      }
      throw error;
    }
  };

  if (loading) return <div className="flex w-full items-center justify-center h-full">
    <Loader />
  </div>;

  return (
    <Tabs defaultValue="signup" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Form {...signUpForm}>
          <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)} className="flex-1 space-y-6">
            <section className="mb-12 space-y-4">
              <h1 className="header">Hi there 👋</h1>
              <p className="text-dark-700">Get started with appointments.</p>
            </section>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={signUpForm.control}
              name="name"
              label="Full name"
              placeholder="John Doe"
              iconSrc="/assets/icons/user.svg"
              iconAlt="user"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={signUpForm.control}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={signUpForm.control}
              name="phone"
              label="Phone number"
              placeholder="(555) 123-4567"
            />

            <SubmitButton isLoading={isLoading}>Sign Up</SubmitButton>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value="login">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="flex-1 space-y-6">
            <section className="mb-12 space-y-4">
              <h1 className="header">Welcome back 👋</h1>
              <p className="text-dark-700">Log in to your account.</p>
            </section>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={loginForm.control}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={loginForm.control}
              name="phone"
              label="Phone number (Password)"
              placeholder="(555) 123-4567"
            />

            <SubmitButton isLoading={isLoading}>Log In</SubmitButton>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};
