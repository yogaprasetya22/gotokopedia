import ModalShippingAddress from "./modal-shipping-addresses";

export const ShippingAddressSection = ({ error }: { error?: string }) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <ModalShippingAddress />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    </div>
);
