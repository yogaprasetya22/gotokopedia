import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useHandleShippingAddresses } from "@/hooks/use-handle-shipping-addresses";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Plus, X } from "lucide-react";
import ModalCreateAddress from "@/components/shared/modal-create-address";
import { ShippingAddress } from "@/type/shipping-addres-type";

export default function ModalShippingAddress() {
    const { useListShippingAddresses, useDefaultShippingAddresses } =
        useHandleShippingAddresses();
    const { data: shippingAddresses } = useListShippingAddresses();
    const { data: defaultAddresses } = useDefaultShippingAddresses();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

    const handleSelectAddress = (id: number) => {
        setSelectedAddress(id);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-md font-extrabold text-gray-500">
                            Alamat Pengiriman
                        </h1>
                        <div className="flex items-center gap-2">
                            <MapPin
                                size={17}
                                strokeWidth={2}
                                absoluteStrokeWidth
                                className="text-green-500"
                            />
                            <span className="font-semibold text-sm">
                                {defaultAddresses?.label}
                            </span>
                            <span className="font-semibold text-sm">·</span>
                            <span className="font-semibold text-sm">
                                {defaultAddresses?.recipient_name}
                            </span>
                        </div>
                        <p className="text-sm mt-1 font-extralight">
                            {defaultAddresses?.address_line1},{" "}
                            {defaultAddresses?.recipient_phone}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-4"
                        onClick={() => setIsOpen(true)}
                    >
                        Ganti
                    </Button>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <button onClick={() => setIsOpen(false)}>
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <span>Daftar Alamat</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <h3 className="font-semibold mb-2">
                            Tulis Nama Alamat / Kota / Kecamatan tujuan
                            pengiriman
                        </h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari alamat"
                                className="w-full p-2 border rounded-lg pl-10"
                            />
                            <X className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                    </div>

                    <ModalCreateAddress>
                        <Button variant="outline" className="w-full">
                            <Plus className="w-4 h-4 mr-2" />
                            Tambah Alamat Baru
                        </Button>
                    </ModalCreateAddress>

                    <div>
                        <h3 className="font-semibold mb-2">Semua Alamat</h3>
                        <div className="space-y-4 ">
                            {shippingAddresses?.map(
                                (address: ShippingAddress) => (
                                    <div
                                        key={address.id}
                                        className={`border rounded-lg p-4 ${
                                            selectedAddress ===
                                            Number(address.id)
                                                ? "border-primary"
                                                : ""
                                        } ${
                                            address.is_default
                                                ? "bg-green-100 border-green-500"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSelectAddress(
                                                Number(address.id)
                                            )
                                        }
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-semibold">
                                                    {address.label}
                                                    {address.is_default && (
                                                        <span className="ml-2 text-xs bg-green-300/50 text-green-800 px-2 py-1 rounded">
                                                            Utama
                                                        </span>
                                                    )}
                                                </h4>
                                                <p className="text-sm mt-1">
                                                    {address.recipient_name}
                                                </p>
                                                <p className="text-sm">
                                                    {address.recipient_phone}
                                                </p>
                                                <p className="text-sm mt-1">
                                                    {address.address_line1}
                                                </p>
                                            </div>
                                            <ChevronRight className="text-gray-400" />
                                        </div>
                                        {selectedAddress ===
                                            Number(address.id) && (
                                            <div className="mt-3 pt-3 border-t flex justify-end">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                >
                                                    Ubah Alamat
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Share
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
