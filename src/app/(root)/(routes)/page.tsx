"use client";

import CategoryProduct from "@/app/(root)/(routes)/components/category-product";
import EmblaCarousel from "@/components/ui/embla-carosul";
import CatalogueProduct from "./components/catalogue-product";

const SLIDES = [
    {
        id: 1,
        image: "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/7/22/6d79d227-67fe-497a-a904-af990882e2ee.jpg.webp?ect=4g",
    },
    {
        id: 2,
        image: "https://images.tokopedia.net/img/NsjrJu/2020/9/25/ea701ee6-f36b-473d-b429-4d2a1da0713d.jpg?ect=4g",
    },
    {
        id: 3,
        image: "https://images.tokopedia.net/img/NsjrJu/2020/9/25/b1d2ed1e-ef80-4d7a-869f-a0394f0629be.jpg?ect=4g",
    },
    {
        id: 4,
        image: "https://images.tokopedia.net/img/home/defaultbanner/59e9ecd0-b91b-40d4-aef8-b1057be0_auto_x2.jpg?ect=4g",
    },
];

export default function Home() {
    return (
        <div className=" w-full flex flex-col items-center gap-2">
            <div className="max-w-[75rem]">
                <EmblaCarousel slides={SLIDES} autoplay autoplayDelay={5000} />
            </div>
            <CategoryProduct />
            <div className=" container md:px-5 lg:px-10 flex flex-col space-y-5  ">
                <CatalogueProduct />
            </div>
        </div>
    );
}
