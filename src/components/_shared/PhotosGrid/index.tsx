import { Photo } from 'pexels';
import PhotoItem from '../PhotoItem';

interface IPhotosGrid {
    photos: Photo[]
    children?:  JSX.Element
}

export default function PhotosGrid({ photos, children }: IPhotosGrid ): React.ReactElement {
    return (
        <div className='grid grid-cols-4 gap-8'>
            {photos.map((photo: Photo, index: number) => 
                <PhotoItem photo={photo} key={index} />
            )}
            {children}
        </div>
    )
}