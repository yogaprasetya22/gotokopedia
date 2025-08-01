import { Checkbox } from "@/components/ui/checkbox";
import { ShippingMethod } from "@/type/order-payment-type";

export const ShippingMethodSection = ({
    methods,
    selectedMethod,
    onSelectMethod,
    error,
    useInsurance,
    onToggleInsurance,
}: {
    methods: ShippingMethod[];
    selectedMethod: ShippingMethod | null;
    onSelectMethod: (method: ShippingMethod) => void;
    error?: string;
    useInsurance: boolean;
    onToggleInsurance: () => void;
}) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 ">
        <h4 className="font-medium mb-2">Pilih Pengiriman</h4>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {methods.map((method) => (
            <ShippingMethodItem
                key={method.id}
                method={method}
                isSelected={selectedMethod?.id === method.id}
                onSelect={onSelectMethod}
            />
        ))}

        <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
                <Checkbox
                    id="insurance"
                    checked={useInsurance}
                    onCheckedChange={onToggleInsurance}
                    className="mr-2"
                />
                <label htmlFor="insurance">
                    Pakai Asuransi Pengiriman (Rp200)
                </label>
            </div>
            <span className="text-sm text-gray-500">●</span>
        </div>
    </div>
);

const ShippingMethodItem = ({
    method,
    isSelected,
    onSelect,
}: {
    method: ShippingMethod;
    isSelected: boolean;
    onSelect: (method: ShippingMethod) => void;
}) => (
    <div
        className={`flex justify-between items-center p-3 border rounded-md mb-2 cursor-pointer ${
            isSelected ? "border-green-500 bg-green-50" : ""
        }`}
        onClick={() => onSelect(method)}
    >
        <div>
            <p className="font-medium">{method.name}</p>
            <p className="text-sm text-gray-500">
                Estimasi tiba besok - 18 May
            </p>
        </div>
        <span className="font-medium">
            Rp{method.price.toLocaleString("id-ID")}
        </span>
    </div>
);
