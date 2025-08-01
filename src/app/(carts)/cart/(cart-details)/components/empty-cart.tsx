export default function EmptyCart() {
    return (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center text-muted-foreground">
            <h3 className="text-xl font-semibold mb-2">
                Keranjang kamu kosong
            </h3>
            <p className="text-sm">Ayo tambahkan produk ke keranjangmu!</p>
        </div>
    );
}
