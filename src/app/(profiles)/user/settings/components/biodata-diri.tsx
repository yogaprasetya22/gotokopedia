import React from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch"; // asumsikan pakai shadcn/ui
import { Button } from "@/components/ui/button";
import { BadgeCheck, Lock } from "lucide-react";

export default function BiodataDiri() {
    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kiri - Foto dan Tombol */}
            <div className="flex flex-col items-center border rounded-md p-4">
                <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" // ganti ke gambar kamu
                    alt="Foto Profil"
                    width={150}
                    height={150}
                    className="rounded-full"
                />
                <Button className="mt-4 w-full" variant="outline">
                    Pilih Foto
                </Button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                    Besar file: maksimum 10.000.000 bytes (10 Megabytes).
                    Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
                </p>
                <Button className="mt-4 w-full">Ubah Kata Sandi</Button>
                <Button className="mt-2 w-full" variant="outline">
                    <Lock className="w-4 h-4 mr-2" />
                    PIN Tokopedia
                </Button>
            </div>

            {/* Kanan - Form Data */}
            <div className="md:col-span-2 space-y-6">
                {/* Biodata */}
                <div>
                    <h2 className="font-semibold text-lg mb-4">
                        Ubah Biodata Diri
                    </h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Nama</strong>: Yoga Prasetya{" "}
                            <Button variant="link">Ubah</Button>
                        </p>
                        <p>
                            <strong>Tanggal Lahir</strong>: 22 Mei 2002{" "}
                            <Button variant="link">Ubah Tanggal Lahir</Button>
                        </p>
                        <p>
                            <strong>Jenis Kelamin</strong>: Pria{" "}
                            <Button variant="link">Ubah</Button>
                        </p>
                    </div>
                </div>

                {/* Kontak */}
                <div>
                    <h2 className="font-semibold text-lg mb-4">Ubah Kontak</h2>
                    <div className="space-y-2">
                        <p>
                            <strong>Email</strong>: arbawi6118@gmail.com{" "}
                            <BadgeCheck className="inline w-4 h-4 text-green-500 ml-1" />
                            <span className="text-green-600 ml-2">
                                Terverifikasi
                            </span>{" "}
                            <Button variant="link">Ubah</Button>
                        </p>
                        <p>
                            <strong>Nomor HP</strong>: 6289699991215{" "}
                            <BadgeCheck className="inline w-4 h-4 text-green-500 ml-1" />
                            <span className="text-green-600 ml-2">
                                Terverifikasi
                            </span>{" "}
                            <Button variant="link">Ubah</Button>
                        </p>
                    </div>
                </div>

                {/* Safe Mode */}
                <div>
                    <h2 className="font-semibold text-lg mb-2">Safe Mode</h2>
                    <p className="text-sm text-gray-600 mb-2">
                        Fitur ini akan otomatis menyaring hasil pencarian sesuai
                        kebijakan dan batasan usia pengguna
                    </p>
                    <div className="flex items-center space-x-2">
                        <span>Aktifkan</span>
                        <Switch defaultChecked />
                    </div>
                </div>
            </div>
        </div>
    );
}
