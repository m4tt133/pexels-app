export default function Skeleton(): React.ReactElement {
    return(
        <div className='grid grid-cols-4 gap-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1'>
            {[...Array(8)].map((i, index) => {
                return(
                    <div className='flex flex-col gap-2 w-full animate-pulse-custom' key={index}>
                        <div className="h-[300px] w-full relative bg-[#181818] rounded-md" ></div>
                        <div className='text-white truncate h-[24px] bg-[#181818] w-3/4 rounded-md mb-1'></div>
                        <div className="text-[10px] h-[15px] bg-[#181818] w-2/4 rounded-md"></div>
                        <div className="text-[10px] h-[15px] bg-[#181818] w-4/5 rounded-md"></div>
                    </div>
                )
            })}
        </div>
    )
}