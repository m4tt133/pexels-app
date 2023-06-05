import PhotoItem from '@/components/_shared/PhotoItem';
import type { Photo } from 'pexels';

interface IPhotosGrid {
    photos: Photo[]
    children?:  JSX.Element
    callback?: (id: number) => void
}

export default function WishlistPhotosGrid({ photos, children, callback }: IPhotosGrid ): React.ReactElement {
    return (
        <div className='grid grid-cols-4 gap-8'>
            {photos.map((photo: Photo, index: number) => 
                <div className="flex flex-col items-start gap-5" key={index}>
                    <PhotoItem photo={photo} key={index} />
                    <button onClick={() => callback?.(photo.id)}>Delete From Wishlist 💔</button>
                </div>
            )}
            {children}
        </div>
    )
}