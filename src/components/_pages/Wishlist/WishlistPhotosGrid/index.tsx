import GridLayout from '@/components/_shared/GridLayout';
import PhotoItem from '@/components/_shared/PhotoItem';
import type { Photo } from 'pexels';

interface IPhotosGrid {
    photos: Photo[]
    children?:  JSX.Element
    callback?: (id: number) => void
}

export default function WishlistPhotosGrid({ photos, children, callback }: IPhotosGrid ): React.ReactElement {
    return (
        <GridLayout>
            <>
                {photos.map((photo: Photo, index: number) => 
                    <div className="flex flex-col items-start gap-5 w-full" key={index}>
                        <PhotoItem photo={photo} key={index} />
                        <button onClick={() => callback?.(photo.id)}>Delete From Wishlist 💔</button>
                    </div>
                )}
                {children}
            </>
        </GridLayout>
    )
}