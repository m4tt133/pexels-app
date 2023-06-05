import Head from "next/head";
import type { InferGetStaticPropsType, GetStaticProps } from 'next';

import client from '@/lib/pexels';

import Layout from '@/components/_shared/Layout';
import PhotosWrapper from '@/components/_pages/Home/PhotosWrapper';

import { isError } from "@/helpers/isError";

import type { ErrorResponse, Photos } from 'pexels/dist/types';

export default function Home({ content }: InferGetStaticPropsType<typeof getStaticProps> ) {

  if(!isError(content)){
    return (
      <>
        <Head>
          <title>Pexels App</title>
          <meta name="description" content="Pexels App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <PhotosWrapper content={content} />
        </Layout>
      </>
    )
  }

  return( 
    <Layout>
      <span>Pexels API Response Error! Check the networking TAB for more information and contact the Website Administrator. Ref: https://www.pexels.com/api/documentation/</span>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<{ content: Photos | ErrorResponse }> = async () => {
  const data = await client.photos.curated({ per_page: 20 });

  return { 
    props: { 
        content: data 
    },
    revalidate: 60
 };
};
