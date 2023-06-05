import { useEffect, useState } from "react";

type Button = {
    id: number
}

export default function WishlistButton({ id }: Button): React.ReactElement{
    const [ result, setResult ] = useState<string | null>(null);

    const saveToLocalStorage = (id: number) => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")!);            

        if(wishlist === null){
            const array = [id];
            const stringified = JSON.stringify(array)

            localStorage.setItem("wishlist", stringified);

            setResult("Wishlisted! ❤️");

            return;
        } 

        const inWishlist = wishlist.some((i: number) => i === id);
        
        if(inWishlist){
            alert(`Photo with ID: ${id} is already in the wishlist!`)

            return;
        } 
        
        try{
            let array = [];
            array = JSON.parse(localStorage.getItem('wishlist')!) || [];
            array.push(id);
    
            const stringified = JSON.stringify(array)
    
            localStorage.setItem("wishlist", stringified);

            setResult("Wishlisted! ❤️")
            
            return;
        }catch(err){
            console.log(err);
        }  
    };

    useEffect(() => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")!);    

        if(wishlist === null) return;

        const inWishlist = wishlist.some((i: number) => i === id);

        if(inWishlist) setResult("Wishlisted! ❤️");

        return () => {
            null
        }
    }, [id])

    return(
        <button onClick={() => saveToLocalStorage(id)} className="font-bold w-max">
            {result ? result : "Add To Wishlist 🤍"}
        </button>
    )
}