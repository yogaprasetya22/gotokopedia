'use client';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";

interface CommentData {
    comment: string;
    rating: number;
}

export function ModalComment({ id }: { id: number }) {
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<CommentData>();

    const handleRating = (rate: number) => {
        setRating(rate);
        form.setValue("rating", rate);
    };

    const mutation: UseMutationResult<AxiosResponse, unknown, CommentData> =
        useMutation({
            mutationFn: async (data: CommentData) => {
                const response = await api.post(
                    `/api/v1/product/${id}/comment`,
                    {
                        content: data.comment,
                        rating: data.rating,
                    }
                );
                return response.data;
            },
            onSuccess: () => {
                toast.success("Komentar ditambahkan dengan sukses");
                form.reset();
                setIsOpen(false); // Tutup modal ketika sukses
            },
            onError: (error) => {
                toast.error("Anda belum melakukan autentikasi (login)");
                console.error(error);
            },
        });

    const handleSubmit = form.handleSubmit((data: CommentData) => {
        return mutation.mutate(data);
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    Comments
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                    <DialogDescription>
                        Leave a comment on this post
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <Label>Rating</Label>
                            <div className="flex items-center space-x-4">
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <span
                                        key={rate}
                                        className={`h-6 w-6 cursor-pointer`}
                                        onClick={() => handleRating(rate)}
                                    >
                                        <svg
                                            className="inline-block mr-2 align-middle"
                                            viewBox="0 0 24 24"
                                            width="45"
                                            height="45"
                                            fill={
                                                rating >= rate
                                                    ? "#FFC400"
                                                    : "#D1D5DB"
                                            }
                                        >
                                            <path d="M21.57 9.14a2.37 2.37 0 0 0-1.93-1.63L15.9 7l-1.68-3.4a2.38 2.38 0 0 0-4.27 0L8.27 7l-3.75.54a2.39 2.39 0 0 0-1.32 4.04l2.71 2.64L5.27 18a2.38 2.38 0 0 0 2.35 2.79 2.42 2.42 0 0 0 1.11-.27l3.35-1.76 3.35 1.76a2.41 2.41 0 0 0 2.57-.23 2.369 2.369 0 0 0 .89-2.29l-.64-3.73L21 11.58a2.38 2.38 0 0 0 .57-2.44Z"></path>
                                        </svg>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <FieldInput
                            label="Comment"
                            placeholder="Leave a comment..."
                            type="textarea"
                            field={form.register("comment")}
                        />
                        <DialogFooter>
                            <Button type="submit" variant={"signUp"}>
                                Kirim
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

interface FieldInputProps {
    label: string;
    placeholder: string;
    type?: string;
    field?: UseFormRegisterReturn;
}

function FieldInput({
    label,
    placeholder,
    type = "text",
    field,
}: FieldInputProps) {
    const refTextarea = useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = () => {
        if (refTextarea.current) {
            refTextarea.current.style.height = "auto";
            refTextarea.current.style.height =
                refTextarea.current.scrollHeight + "px";
        }
    };

    return (
        <div className="space-y-4">
            <Label>{label}</Label>
            {type === "textarea" ? (
                <Textarea
                    ref={refTextarea}
                    placeholder={placeholder}
                    onInput={resizeTextarea}
                    rows={2}
                    className="resize-none overflow-y-hidden"
                    {...field}
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="input"
                    {...field}
                />
            )}
        </div>
    );
}
