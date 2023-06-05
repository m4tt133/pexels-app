import { useRouter } from "next/router";

interface IFilters {
    pathname: string
}

export default function Filters({ pathname }: IFilters): React.ReactElement {
    const router = useRouter();

    return(
        <div className='flex items-center gap-5'>
            <p className="font-bold">Show:</p>
            <div className='flex gap-2'>
                {[...Array(4)].map((i, index) => {
                    const value = (index + 1) * 10;

                    return(
                        <button className={`rounded-full bg-[#181818] w-[40px] h-[40px] ${Number(router.query.per_page) === value ? "bg-[#2b2b2b]" : "bg-[#181818]"}`} onClick={() => {
                            router.push({ 
                                pathname: pathname, 
                                query: { ...router.query, per_page: value } 
                            });
                        }} key={index}>
                            {value}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}