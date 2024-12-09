"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import InputField from "./input-field";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user";


const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter()
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const send = async (value: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            //Sign up with Appwrite & create plaid token
            if (type === 'sign-up') {
                const newUser = await signUp(value)
                
                setUser(newUser);
            } else {
                const res = await signIn({
                    email: value.email,
                    password: value.password,
                })

                if (res) router.push('/')
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="auth-form">
            <Card>
                <CardHeader className="flex flex-col gap-5 md:gap-8">
                    <Link href="/" className="flex cursor-pointer items-center gap-1 justify-center">
                        <Image src="/icons/logo.svg" width={50} height={50} alt="logo" />
                        <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                            MW-88
                        </h1>
                    </Link>

                    <div className="flex flex-col gap-1 md:gap-3 ">
                        <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
                            <p className="text-16 font-normal text-gray-600">
                                {user
                                    ? "Link your account to get started"
                                    : "Please enter your details"}
                            </p>
                        </h1>
                    </div>
                </CardHeader>
                <CardContent>
                    {user ? (
                        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
                    ) : (
                        <>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(send)} className="space-y-8">
                                    {type === "sign-up" && (
                                        <>
                                            <div className="flex gap-4">
                                                <InputField
                                                    name="firstName"
                                                    label="First Name"
                                                    controller={form.control}
                                                />
                                                <InputField
                                                    name="lastName"
                                                    label="Last Name"
                                                    controller={form.control}
                                                />
                                            </div>
                                            <InputField
                                                name="address"
                                                label="Address"
                                                controller={form.control}
                                            />
                                            <div className="flex gap-4">
                                                <InputField
                                                    name="state"
                                                    label="State (PP)"
                                                    controller={form.control}
                                                />
                                                <InputField
                                                    name="postalCode"
                                                    label="Postal Code (00000)"
                                                    controller={form.control}
                                                />
                                            </div>
                                            <InputField
                                                name="city"
                                                label="City"
                                                controller={form.control}
                                            />
                                            <div className="flex gap-4">
                                                <InputField
                                                    name="dateOfBirth"
                                                    label="Date of Birth"
                                                    controller={form.control}
                                                    type="date"
                                                />
                                                <InputField
                                                    name="ssn"
                                                    label="SSN (1234)"
                                                    controller={form.control}
                                                />
                                            </div>
                                        </>
                                    )}
                                    <InputField
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        controller={form.control}
                                    />
                                    <InputField
                                        name="password"
                                        label="Password"
                                        controller={form.control}
                                        type="password"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <Button type="submit" className="form-btn" disabled={isLoading}>
                                            {isLoading
                                                ? (
                                                    <>
                                                        <Loader2 className="animate-spin" />
                                                        &nbsp;Loading...
                                                    </>

                                                ) : type === 'sign-in'
                                                    ? 'Sign In'
                                                    : 'Sign Up'
                                            }
                                        </Button>
                                    </div>
                                </form>
                            </Form>

                            <footer className="flex justify-center gap-1 mt-2">
                                <p className="text-14 font-normal text-gray-600">
                                    {type === 'sign-in' ? "Don't an account?" : 'Already have an account?'}
                                </p>
                                <Link href={`/${type === 'sign-in' ? 'sign-up' : 'sign-in'}`} className="form-link">
                                    {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
                                </Link>
                            </footer>
                        </>
                    )}
                </CardContent>
            </Card>
        </section>
    );
};

export default AuthForm;
