import PageHeading from "@/components/_shared/PageHeading";
import SectionLayout from "@/components/_shared/SectionLayout";
import { useRouter } from "next/router";
import { Params } from "pexels";
import { ParsedUrlQuery } from "querystring";

interface INoResults {
    query: ParsedUrlQuery
    keyword: string | string [] | undefined
}

export default function NoResults({ query }: INoResults ): React.ReactElement {
    const router = useRouter();
    const params = JSON.stringify(query);
    const parsed: Params = JSON.parse(params);

    return(
        <SectionLayout className="w-max">
            <PageHeading cta={`No Results For:`} className="flex-col">
                <div className="flex flex-col gap-1 items-start min-w-max font-bold">
                    <span>Keyword: {parsed.query}</span>
                    {parsed.page && <span>Page: {parsed.page}</span>}
                    {parsed.per_page &&<span>Results per Page: {parsed.per_page}</span>}
                    <button onClick={() => router.push("/")} className="underline font-bold mt-2" >Get Me Back</button>
                </div>
            </PageHeading>
        </SectionLayout>
    )
}