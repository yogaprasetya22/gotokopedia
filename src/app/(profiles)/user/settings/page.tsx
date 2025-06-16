"use client";
import React, { useState, useRef, useEffect } from "react";
import BiodataDiri from "./components/biodata-diri";
import DaftarAlamat from "./components/daftar-alamat";


const TABS = [
    { id: "bio", label: "Biodata Diri" },
    { id: "address", label: "Daftar Alamat" },
];

export default function Settings() {
    const [activeTab, setActiveTab] = useState("bio");
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const activeIndex = TABS.findIndex((tab) => tab.id === activeTab);
        if (activeIndex >= 0 && tabRefs.current[activeIndex]) {
            const tab = tabRefs.current[activeIndex];
            if (tab) {
                setIndicatorStyle({
                    left: tab.offsetLeft,
                    width: tab.offsetWidth,
                });
            }
        }
    }, [activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case "bio":
                return <BiodataDiri />;
            case "address":
                return <DaftarAlamat />;
            default:
                return <p>Pilih tab di sebelah kiri.</p>;
        }
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-lg font-extrabold">Profile</h2>
            <div className="w-full flex flex-col gap-4 bg-white rounded-lg shadow-md border">
                <div
                    className="w-full flex justify-start items-center rounded-t-lg border-b relative"
                    ref={tabsRef}
                >
                    {TABS.map((tab, index) => (
                        <button
                            key={tab.id}
                            ref={(el) => {
                                tabRefs.current[index] = el;
                            }}
                            onClick={() => setActiveTab(tab.id)}
                            className={`text-left px-4 py-2 w-full transition-colors duration-300 bg-white ${
                                activeTab === tab.id
                                    ? "text-green-500 font-semibold"
                                    : "text-gray-700"
                            } ${index === 0 ? "rounded-tl-lg" : ""} ${
                                index === TABS.length - 1 ? "rounded-tr-lg" : ""
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}

                    <div
                        className="absolute bottom-0 h-0.5 bg-green-500 transition-all duration-300 ease-in-out"
                        style={{
                            left: `${indicatorStyle.left}px`,
                            width: `${indicatorStyle.width}px`,
                        }}
                    />
                </div>
                <div className="p-4 min-h-[500px]">{renderContent()}</div>
            </div>
        </div>
    );
}
