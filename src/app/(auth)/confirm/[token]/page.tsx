"use client";
import { api } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StepForward } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

export default function ConfirmationPage() {
    const token = useParams<{ token: string }>().token;
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await api.put(`/api/v1/users/activate/${token}`);
            return response.data;
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success("Account activated successfully");
                router.push("/sign-in");
            }
        },
        onError: () => {
            toast.error("An error occurred. Please try again.");
        },
        onSettled: () => {
            setLoading(false);
            router.push("/sign-in");
        },
    });

    const handleConfirm = () => {
        setLoading(true);
        mutation.mutate();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-xl shadow-xl max-w-md w-full space-y-4">
                <div className="text-center space-y-1">
                    <h2 className="text-lg font-semibold text-center">
                        Confirmation
                    </h2>
                    <p className="text-gray-600 text-center text-sm">
                        Click the button below to confirm your account
                    </p>
                </div>
                <Button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full bg-indigo-500 text-white"
                >
                    Confirm
                    <StepForward className="w-3.5 h-3.5 ml-1" />
                </Button>
            </div>
        </div>
    );
}
