"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { api, googleSignIn } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { StepForward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Schema validasi menggunakan Zod dengan validasi confirmPassword
const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .nonempty({ message: "Email is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .nonempty({ message: "Password is required" }),
});

type SignInFormValues = z.infer<typeof formSchema>;

export default function SignIn() {
    const [loading, setLoading] = useState(false);

    const { mutate } = useMutation({
        mutationFn: async (data: SignInFormValues) => {
            setLoading(true);
            const response = await api.get("/api/v1/authentication/token", {
                params: {
                    email: data.email,
                    password: data.password,
                },
            });
            return response.data;
        },
        onSuccess: () => {
            setLoading(false);
            toast.success("Account created successfully");
            window.location.href = "/";
        },
        onError: (error: {
            response: { data: { errors: string; message: string } };
        }) => {
            // Menghindari reload, cukup tampilkan error dan reset loading state
            toast.error(
                error.response?.data?.errors ||
                    error.response?.data?.message ||
                    "An error occurred. Please try again."
            );
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        },
    });

    const onSumbit = async (data: SignInFormValues) => {
        await mutate(data);
    };

    const form = useForm<SignInFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full space-y-4">
            <div className=" text-center space-y-1">
                <h2 className="text-lg font-semibold text-center ">
                    Sign In to OAuth
                </h2>
                <p className="text-gray-600 text-center text-sm">
                    Sign in to your account to continue
                </p>
            </div>
            <div className="flex justify-center ">
                <Button
                    variant={"ghost"}
                    onClick={googleSignIn}
                    className="border border-gray-200 space-x-2 "
                >
                    <Image
                        src="/google.png"
                        alt="Google"
                        width={16}
                        height={16}
                    />
                    <span className="text-sm">Google</span>
                </Button>
            </div>
            <div className="w-full flex items-center space-x-2">
                <div className="w-full border-t border-gray-200"></div>
                <span className="text-gray-400 text-sm">or</span>
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="space-y-4">
                <Form {...form}>
                    <form
                        className="space-y-4 w-full"
                        onSubmit={form.handleSubmit(onSumbit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 text-xs font-semibold mb-2">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled={loading} />
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
                                    <FormLabel className="block text-gray-700 text-xs font-semibold mb-2">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field}
                                            disabled={loading}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={loading}
                            type="submit"
                            variant={"outline"}
                            className="w-full bg-indigo-500 text-white "
                        >
                            Continue
                            <StepForward className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </form>
                </Form>
            </div>
            <Separator />
            <p className="text-center text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/sign-up" className="text-indigo-500">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}
