import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import client from '@/lib/pexels';

import Searchbar from '@/components/_shared/SearchBar';
import Filters from '@/components/_shared/Filters';
import PhotosGrid from '@/components/_shared/PhotosGrid';
import Pagination from '@/components/_shared/Pagination';
import Skeleton from '@/components/_shared/Skeleton';
import PageHeading from '@/components/_shared/PageHeading';
import SectionLayout from '@/components/_shared/SectionLayout';

import { ParsedUrlQuery } from 'querystring';
import type { ErrorResponse, Params, Photos } from 'pexels/dist/types';

import { isError } from '@/helpers/isError';

interface IPhotosWrapper {
    content: Photos
}

export default function PhotosWrapper({ content }: IPhotosWrapper ): React.ReactElement {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ res, setRes ] = useState<typeof content | ErrorResponse>(content);
      
    const { query } = useRouter();

    const fetchQuery = async (query: ParsedUrlQuery) => {
        setLoading(true);

        const params = JSON.stringify(query);
        const parsed: Params = JSON.parse(params)
        
        const res = await client.photos.curated(parsed);

        setRes(res);   

        setTimeout(() => {
            setLoading(false);
        }, 300) 
    };

    useEffect(() => {
        if(Object.keys(query).length !== 0) { 
            fetchQuery(query);
        }
    }, [query]);

    if(isError(res)) return( 
        <SectionLayout>
          <span>Pexels API Response Error! Check the networking TAB for more information and contact the Website Administrator. Ref: https://www.pexels.com/api/documentation/</span>
        </SectionLayout>
    )

    return (
        <SectionLayout>
            {!loading ? 
                <>
                    <PageHeading cta="Welcome To Pexels App!">
                        <Searchbar/>
                    </PageHeading>
                    <Filters pathname="/"/>
                    <PhotosGrid photos={res.photos} />
                    <Pagination data={res}/>
                </>
                :
                <Skeleton/>
            }
        </SectionLayout>
    )
}