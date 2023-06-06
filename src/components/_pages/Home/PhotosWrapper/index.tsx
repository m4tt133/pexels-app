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
import type { Params, Photos } from 'pexels/dist/types';

import { isError } from '@/helpers/isError';

interface IPhotosWrapper {
    content: Photos & { total_results: number }
}

export default function PhotosWrapper({ content }: IPhotosWrapper ): React.ReactElement {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ res, setRes ] = useState<typeof content>(content);
      
    const { query } = useRouter();

    const fetchQuery = async (query: ParsedUrlQuery) => {
        setLoading(true);

        const params = JSON.stringify(query);
        const parsed: Params = JSON.parse(params)
        
        const res = await client.photos.curated(parsed);

        setTimeout(() => {
            setLoading(false);
        }, 300)
        
        if(!isError(res)){
            setRes(res);

            return;
        } else return null;   
    };

    useEffect(() => {
        if(Object.keys(query).length !== 0) { 
            fetchQuery(query);
        }
    }, [query]);

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