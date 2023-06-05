import Loading from "@/components/_shared/Loading";
import client from "@/lib/pexels";
import { Photo } from "pexels";
import { useEffect, useState } from "react"
import Layout from "@/components/_shared/Layout";
import { isError } from "@/helpers/isError";
import PageHeading from "@/components/_shared/PageHeading";
import SectionLayout from "@/components/_shared/SectionLayout";
import WishlistPhotosGrid from "@/components/_pages/Wishlist/WishlistPhotosGrid";

export default function Wishlist(){
    const [ res, setRes ] = useState<Array<Photo> | null>(null);

    const fetchPhotos = async (wishlist: number[] | []) => {
        let photos: Photo[] = [];
        let i = 0;

        if(wishlist.length === 0) {
            setRes(photos);
            
            return;
        }

        do{
            const photo = await client.photos.show({ id: wishlist[i] });

            if(!isError(photo)) photos.push(photo);

            i++;
        }while(i < wishlist.length);

        setRes(photos);

        return photos;
    }

    useEffect(() => {
        const wishlist = localStorage.getItem("wishlist");

        if(wishlist){      
            fetchPhotos(JSON.parse(wishlist));

            return;
        } 
            
        setRes([]); 
    }, [])

    const deleteItem = async (id: number) => {
        try{
            const wishlist = JSON.parse(localStorage.getItem("wishlist")!);
            const newArray = wishlist.filter((item: number) => item !== id);
            
            const stringified = JSON.stringify(newArray)

            fetchPhotos(newArray);
            
            localStorage.setItem("wishlist", stringified)
        }catch(err){
            console.log(err);
        }
    }

    const clearWishlist = () => {
        const arr = JSON.stringify([]);
        localStorage.setItem("wishlist", arr)
        fetchPhotos([]);
    }

    if(!res) return <Loading/>

    return(
        <Layout className="py-[150px]">
            {res.length > 0 ?
                <SectionLayout>
                    <PageHeading cta="Your Wishlist">
                        <button onClick={() => clearWishlist()}>Clear Your Wishlist</button>
                    </PageHeading>
                    <WishlistPhotosGrid photos={res} callback={deleteItem} />
                </SectionLayout>
                :
                <SectionLayout>
                    <PageHeading cta="Empty Wishlist"/>
                </SectionLayout>
            }
        </Layout>
    )
}