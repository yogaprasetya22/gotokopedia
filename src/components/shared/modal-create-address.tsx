import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useHandleShippingAddresses } from "@/hooks/use-handle-shipping-addresses";
import { CreateAddressData } from "@/type/shipping-addres-type";

interface ModalCreateAddressProps {
    children?: React.ReactNode;
}

export default function ModalCreateAddress({
    children,
}: ModalCreateAddressProps) {
    const [open, setOpen] = React.useState(false);
    const { createShippingAddress } = useHandleShippingAddresses();

    const [formData, setFormData] = React.useState<CreateAddressData>({
        address_line1: "",
        label: "",
        note_for_courier: "",
        recipient_name: "",
        recipient_phone: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createShippingAddress.mutateAsync(formData);
            setOpen(false);
            // Reset form
            setFormData({
                address_line1: "",
                label: "",
                note_for_courier: "",
                recipient_name: "",
                recipient_phone: "",
            });
        } catch (error) {
            // Error handling is already done in the mutation
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || <Button variant="outline">Add New Address</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Address</DialogTitle>
                        <DialogDescription>
                            Fill in the details for your new shipping address.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="label" className="text-right">
                                Label
                            </Label>
                            <Input
                                id="label"
                                name="label"
                                value={formData.label}
                                onChange={handleChange}
                                placeholder="e.g. Home, Office"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="recipient_name"
                                className="text-right"
                            >
                                Recipient Name
                            </Label>
                            <Input
                                id="recipient_name"
                                name="recipient_name"
                                value={formData.recipient_name}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="recipient_phone"
                                className="text-right"
                            >
                                Recipient Phone
                            </Label>
                            <Input
                                id="recipient_phone"
                                name="recipient_phone"
                                value={formData.recipient_phone}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="address_line1"
                                className="text-right"
                            >
                                Address
                            </Label>
                            <Textarea
                                id="address_line1"
                                name="address_line1"
                                value={formData.address_line1}
                                onChange={handleChange}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="note_for_courier"
                                className="text-right"
                            >
                                Notes for Courier
                            </Label>
                            <Textarea
                                id="note_for_courier"
                                name="note_for_courier"
                                value={formData.note_for_courier}
                                onChange={handleChange}
                                className="col-span-3"
                                placeholder="Any special instructions for delivery"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={createShippingAddress.isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createShippingAddress.isPending}
                        >
                            {createShippingAddress.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Address"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
