import { Button } from "@/components/ui/button";
import { useHandleShippingAddresses } from "@/hooks/use-handle-shipping-addresses";
import { useState } from "react";
import { ChevronRight, Plus, X } from "lucide-react";
import ModalCreateAddress from "@/components/shared/modal-create-address";
import { ShippingAddress } from "@/type/shipping-addres-type";

export default function DaftarAlamat() {
    const { useListShippingAddresses, updateShippingAddress } =
        useHandleShippingAddresses();
    const { data: shippingAddresses } = useListShippingAddresses();

    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

    const handleSetDefaultAddress = async (id: number) => {
        try {
            await updateShippingAddress.mutateAsync({
                id,
                data: { is_default: true },
            });
        } catch (error) {
            console.error("Failed to set default address:", error);
        }
    };

    const handleSelectAddress = (id: number) => {
        setSelectedAddress(id === selectedAddress ? null : id);
    };

    return (
        <div className="w-full h-full">
            <div className="space-y-4">
                {/* Search Section */}
                <div className="bg-gray-100 p-3 rounded-lg">
                    <h3 className="font-semibold mb-2">
                        Tulis Nama Alamat / Kota / Kecamatan tujuan pengiriman
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

                {/* Add New Address Button */}
                <ModalCreateAddress>
                    <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Alamat Baru
                    </Button>
                </ModalCreateAddress>

                {/* All Addresses Section */}
                <div>
                    <h3 className="font-semibold mb-2">Semua Alamat</h3>
                    <div className="space-y-4 ">
                        {shippingAddresses?.map((address: ShippingAddress) => (
                            <div
                                key={address.id}
                                className={`border rounded-lg p-4 ${
                                    selectedAddress === Number(address.id)
                                        ? "border-primary"
                                        : ""
                                } ${
                                    address.is_default
                                        ? "bg-green-100 border-green-500"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleSelectAddress(Number(address.id))
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
                                {selectedAddress === Number(address.id) && (
                                    <div className="mt-3 pt-3 border-t flex justify-end">
                                        {!address.is_default && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSetDefaultAddress(
                                                        Number(address.id)
                                                    );
                                                }}
                                            >
                                                Jadikan Alamat Utama
                                            </Button>
                                        )}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mr-2"
                                        >
                                            Ubah Alamat
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Share
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
