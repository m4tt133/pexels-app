import PhotoWrapper from "@/components/_pages/Photo/PhotoWrapper";
import Layout from "@/components/_shared/Layout";
import { isError } from "@/helpers/isError";
import client from "@/lib/pexels";
import type { ErrorResponse, Photo } from "pexels";
import { ParsedUrlQuery } from "querystring";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Loading from "@/components/_shared/Loading";

export default function Photo({ photo }: InferGetStaticPropsType<typeof getStaticProps>){
    if(!isError(photo)){
        return(
            <Layout className="py-[150px]">
                {photo ?
                    <PhotoWrapper photo={photo}/>
                    :
                    <Loading/>
                }
            </Layout>
        )
    }

    return( 
        <Layout>
          <span>Pexels API Response Error! Check the networking TAB for more information and contact the Website Administrator. Ref: https://www.pexels.com/api/documentation/</span>
        </Layout>
    )
}

interface Params extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const data = await client.photos.curated({ per_page: 20 });

    if(isError(data)) throw Error("Something Went Wrong In GetStaticPaths!")

    const paths: (string | {
        params: Params;
        locale?: string | undefined;
    })[] = [];
    
    data.photos.map((photo) => 
        paths.push({
            params: {
                id: photo.id.toString(),
            },
        })
    );
    
    return {
        paths: paths,
        fallback: true,
    };
};  

export const getStaticProps: GetStaticProps<{ photo: Photo | ErrorResponse }> = async ({ params }) => {
    const query = (params as Params);
    const photo = await client.photos.show(query);

    return { 
        props: { 
            photo: photo 
        },
        revalidate: 60
    };
};