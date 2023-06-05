import PaginationButton from "./PaginationButton";
import Pages from "./Pages";

interface IPagination {
    data: {
        url?: string | undefined;
        page: number;
        per_page: number;
        next_page?: string | undefined
        prev_page?: string | undefined
        total_results: number
    }
}

export default function Pagination({ data }: IPagination ){
    return(
        <div className="m-auto flex gap-5 my-5 items-center">
            {data.prev_page && 
                <PaginationButton url={data.prev_page} icon="-" />
            }
            <Pages page={data.page} per={data.per_page} total={data.total_results} />
            {data.next_page && 
                <PaginationButton url={data.next_page} icon="+" />
            }
        </div>
    )
}