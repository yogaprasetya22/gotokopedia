import { PaymentMethod } from "@/type/order-payment-type";
import { Checkbox } from "@/components/ui/checkbox";

export const PaymentMethodSection = ({
    methods,
    selectedMethod,
    onSelectMethod,
    error,
}: {
    methods: PaymentMethod[];
    selectedMethod: PaymentMethod | null;
    onSelectMethod: (method: PaymentMethod) => void;
    error?: string;
}) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h2 className="font-semibold text-lg mb-3">Metode Pembayaran</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="grid grid-cols-2 gap-3">
            {methods.map((method) => (
                <PaymentMethodItem
                    key={method.id}
                    method={method}
                    isSelected={selectedMethod?.id === method.id}
                    onSelect={onSelectMethod}
                />
            ))}
        </div>

        <div className="flex items-center mt-3">
            <Checkbox id="promo" className="mr-2" />
            <label htmlFor="promo">Pakai promo biar makin hemat!</label>
        </div>
    </div>
);

const PaymentMethodItem = ({
    method,
    isSelected,
    onSelect,
}: {
    method: PaymentMethod;
    isSelected: boolean;
    onSelect: (method: PaymentMethod) => void;
}) => (
    <div
        className={`border rounded-md p-3 cursor-pointer ${
            isSelected ? "border-green-500 bg-green-50" : ""
        }`}
        onClick={() => onSelect(method)}
    >
        <p className="font-medium">{method.name}</p>
        <p className="text-xs text-gray-500">{method.description}</p>
    </div>
);
