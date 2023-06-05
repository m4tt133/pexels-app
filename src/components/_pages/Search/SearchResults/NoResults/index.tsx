import PageHeading from "@/components/_shared/PageHeading";
import SectionLayout from "@/components/_shared/SectionLayout";
import { Params } from "pexels";
import { ParsedUrlQuery } from "querystring";

interface INoResults {
    query: ParsedUrlQuery
    keyword: string | string [] | undefined
}

export default function NoResults({ query }: INoResults ): React.ReactElement {
    const params = JSON.stringify(query);
    const parsed: Params = JSON.parse(params);
    
    return(
        <SectionLayout className="w-max">
            <PageHeading cta={`No Results`} className="flex-col">
                <div className="flex flex-col gap-1 items-start min-w-max">
                    <p className="font-bold">Active Filters:</p>
                    <span>Keyword: {parsed.query}</span>
                    {parsed.page && <span>Page: {parsed.page}</span>}
                    {parsed.per_page &&<span>Results per Page: {parsed.per_page}</span>}
                </div>
            </PageHeading>
        </SectionLayout>
    )
}