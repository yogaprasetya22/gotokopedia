import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import React from 'react'

export default function ErrorCart() {
  return (
      <div className="w-full gap-5 flex flex-col">
          <h2 className="text-2xl font-extrabold">Keranjang</h2>
          <div className="flex flex-col items-center justify-center gap-4 bg-white rounded-lg shadow-md p-8">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
              <h3 className="text-lg font-semibold">Gagal memuat keranjang</h3>
              <p className="text-sm text-gray-500">Silahkan coba lagi nanti</p>
              <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
              >
                  Refresh
              </Button>
          </div>
      </div>
  );
}
