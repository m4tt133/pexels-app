import Image from "next/image";
import Search from "/public/icons/search-icon.svg"
import { useRouter } from "next/router";
import type { SyntheticEvent } from "react";
import { useState } from "react";

export default function Searchbar(): React.ReactElement{
    const [ input, setInput ] = useState<string>("");
    const router = useRouter();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault(); 

        if(input === "") return;
        
        router.push({ 
            pathname: '/search', 
            query: { query: input } 
        });
    }

    return(
        <form className="relative w-max min-w-[300px] text-black sm:w-full" onSubmit={(e) => handleSubmit(e)}>
            <input onChange={(e) => setInput(e.target.value)} type="text" className="rounded-full w-full bg-white placeholder:text-gray-500 placeholder:text-[14px] p-3 px-5" placeholder="Search for images..."/>
            <button type="submit" className="absolute rounded-full right-2 top-[50%] translate-y-[-50%] bg-black p-2 text-[14px]">
                <Image src={Search} width={20} height={20} alt="" />
            </button>
        </form>
    )
}