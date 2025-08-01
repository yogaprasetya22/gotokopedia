export const DeliveryNoteSection = ({
    note,
    onNoteChange,
}: {
    note: string;
    onNoteChange: (note: string) => void;
}) => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h4 className="font-medium mb-2">Kasih Catatan</h4>
        <textarea
            className="w-full border rounded-md p-2 text-sm"
            placeholder="Contoh: Tolong dibungkus rapi ya"
            rows={3}
            maxLength={200}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
        />
        <div className="text-right text-xs text-gray-500">
            {note.length}/200
        </div>
    </div>
);
