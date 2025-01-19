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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Schema validasi menggunakan Zod dengan validasi confirmPassword
const formSchema = z
    .object({
        fullname: z.string().nonempty({ message: "Full name is required" }),
        email: z
            .string()
            .email({ message: "Invalid email address" })
            .nonempty({ message: "Email is required" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters" })
            .nonempty({ message: "Password is required" }),
        confirmPassword: z
            .string()
            .min(8, {
                message: "Confirm password must be at least 8 characters",
            })
            .nonempty({ message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Menargetkan validasi untuk confirmPassword
    });

type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { mutate } = useMutation({
        mutationFn: async (data: SignUpFormValues) => {
            setLoading(true);
            const response = await api.post(
                "/api/v1/authentication/user",
                {
                    username: data.fullname,
                    email: data.email,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            setLoading(false);
            toast.success("Account created successfully");
            router.push("/sign-in");
        },
        onError: (error: {
            response: { data: { errors: string; message: string } };
        }) => {
            // Menghindari reload, cukup tampilkan error dan reset loading state
            toast.error(
                error.response?.data?.errors ||
                    "An error occurred. Please try again."
            );
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        },
    });

    const onSumbit = async (data: SignUpFormValues) => {
        await mutate(data);
    };

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    return (
        <div className="bg-white px-10 py-6 rounded-xl shadow-xl max-w-md w-full space-y-4">
            <div className=" text-center space-y-1">
                <h2 className="text-md font-semibold text-center ">
                    Sign Up to OAuth
                </h2>
                <p className="text-gray-600 text-center text-sm">
                    Welcome! Please fill in the details to get started.
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
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 text-xs font-semibold mb-2">
                                        Full Name
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block text-gray-700 text-xs font-semibold mb-2">
                                        Confirm Password
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
                            className="w-full bg-indigo-500 text-white"
                        >
                            Continue{" "}
                            <StepForward className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </form>
                </Form>
            </div>
            <Separator />
            <p className="text-center text-gray-600 text-sm">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-indigo-500">
                    Sign In
                </Link>
            </p>
        </div>
    );
}
