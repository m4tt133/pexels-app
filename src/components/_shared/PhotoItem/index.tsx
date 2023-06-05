import Image from 'next/image';
import Link from 'next/link';
import { Photo } from 'pexels/dist/types';

interface IPhotoItem {
    photo: Photo;
}

export default function PhotoItem({ photo }: IPhotoItem ): React.ReactElement {
    return (
        <div className='flex flex-col gap-2 max-w-[300px]'>
            <Link href={`/photos/${photo.id}`}>
                <div className="w-[300px] h-[300px] relative" >
                    <Image src={photo.src.original} alt={photo.alt ? photo.alt : ""} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill style={{ objectFit: "cover", borderRadius: "20px" }}/>
                </div>
            </Link>
            <h2 className='text-white truncate'>
                {photo.alt ? photo.alt : photo.photographer}
            </h2>
            <p className="text-[10px]">
                <span>Author: </span>
                <Link href={photo.photographer_url} target='_blank'>
                    <span className='underline'>{photo.photographer}</span>
                </Link>
            </p>
            <p className="text-[10px]">
                <span>Photo provided by: </span>
                <Link href="https://pexels.com" target='_blank'>
                    <span className='underline'>Pexels</span>
                </Link>
            </p>
        </div>
    )
}