import { ErrorResponse, Photos } from 'pexels/dist/types';

import { useEffect, useState } from 'react';
import client from '@/lib/pexels';

import Skeleton from '../../../_shared/Skeleton';
import NoResults from './NoResults';
import Filters from '../../../_shared/Filters';
import PhotosGrid from '../../../_shared/PhotosGrid';
import { PhotosWithTotalResults, PaginationParams } from 'pexels';
import Searchbar from '@/components/_shared/SearchBar';
import Pagination from '../../../_shared/Pagination';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { isError } from '@/helpers/isError';
import SectionLayout from '@/components/_shared/SectionLayout';
import PageHeading from '@/components/_shared/PageHeading';

export default function SearchResults(): React.ReactElement {
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ res, setRes ] = useState<PhotosWithTotalResults>();

    const router = useRouter()
    const { query } = router

    const fetchQuery = async (query: ParsedUrlQuery) => {
        setLoading(true);

        const params = JSON.stringify(query);
        const parsed: PaginationParams & { query: string } = JSON.parse(params);

        if(parsed.query){
            const res = await client.photos.search(parsed);
    
            setTimeout(() => {
                setLoading(false);
            }, 300)
            
            if(!isError(res)){
                setRes(res);
    
                return;
            } else return null;   
        } else {
            router.push("/")
        } 
    };

    useEffect(() => {
        if(Object.keys(query).length !== 0) { 
            fetchQuery(query);
        }
    }, [query]);
    

    if(res && !res?.photos.length) return <NoResults query={query} keyword={query.query} />

    return (
        <SectionLayout>
            {!loading && res && res?.photos?.length > 0 ? 
                <>
                    <PageHeading cta={`Search Results for: ${query.query} (${res.total_results} Photos)`}>
                        <Searchbar />
                    </PageHeading>
                    <Filters pathname="/search"/>
                    <PhotosGrid photos={res.photos}/>
                    <Pagination data={res}/>
                </>
                :
                <Skeleton/>
            }
        </SectionLayout>
    )
}