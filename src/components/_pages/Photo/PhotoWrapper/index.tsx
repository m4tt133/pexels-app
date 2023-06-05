import ShareButton from "@/components/_shared/ShareButton";
import WishlistButton from "@/components/_shared/WishlistButton";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "pexels";

interface IPhotoItem {
    photo: Photo;
}

export default function PhotoWrapper({ photo }: IPhotoItem ): React.ReactElement {
    return(
        <article className='flex flex-col gap-2'>
            <div className="w-[500px] h-[500px] relative" >
                <Image src={photo.src.original} alt={photo.alt ? photo.alt : ""} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={{ objectFit: "cover", borderRadius: "20px" }}/>
            </div>
            <h1 className='text-white truncate'>{photo.alt ? photo.alt : photo.photographer}</h1>
            <p className="text-[10px]">Author: <Link href={photo.photographer_url} target='_blank'><span className='underline'>{photo.photographer}</span></Link></p>
            <p className="text-[10px]">Photo provided by: <Link href="https://pexels.com" target='_blank'><span className='underline'>Pexels</span></Link></p>
            <ShareButton title="Pexels App" text={"Check Out This Photo!"} cta="Share This Photo!" />
            <WishlistButton id={photo.id} />
        </article>
    )
}