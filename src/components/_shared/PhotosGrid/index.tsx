import { Photo } from 'pexels';
import PhotoItem from '../PhotoItem';
import GridLayout from '../GridLayout';

interface IPhotosGrid {
    photos: Photo[]
    children?:  JSX.Element
}

export default function PhotosGrid({ photos, children }: IPhotosGrid ): React.ReactElement {
    return (
        <GridLayout>
            <>
                {photos.map((photo: Photo, index: number) => 
                    <PhotoItem photo={photo} key={index} />
                )}
                {children}
            </>
        </GridLayout>
    )
}