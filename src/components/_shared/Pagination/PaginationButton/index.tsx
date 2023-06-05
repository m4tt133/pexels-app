import { formatQuery } from "@/helpers/isError";
import { useRouter } from "next/router";

interface IPaginationButton {
    url: string
    icon: string
}

export default function PaginationButton({ url, icon }: IPaginationButton ): React.ReactElement {
    const router = useRouter();

    const handlePageChange = (url: string) => {
        const query = formatQuery(url);

        if(typeof url === undefined) return;

        router.push(router.pathname + query);
    }

    return( 
        <button
            onClick={() => handlePageChange(url)}
            className="flex items-center justify-center font-bold text-[25px] rounded-full bg-[#181818] w-[40px] h-[40px] p-2"
        >
            <span>{icon}</span>
        </button>
    )
}