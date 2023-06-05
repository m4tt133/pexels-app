import { useRouter } from "next/router";

interface IShareButton {
    title: string
    text?: string
    cta: string
}

export default function ShareButton({ title, text, cta }: IShareButton){
    const router = useRouter();
    
    const shareData = {
        title: title,
        text: text,
        url: process.env.NEXT_PUBLIC_BASE_URL + router.asPath,
    };
      
    const handleShare = async (data: typeof shareData) => {
        try {
            await navigator.share(data);
            
        } catch (err) {
            console.log(err);
        }
    };

    return(
        <button onClick={() => handleShare(shareData)} className="underline underline-offset-[5px] font-bold w-max my-5">{cta}</button>
    )
}