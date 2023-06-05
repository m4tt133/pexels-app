interface IPages {
    page: number
    per: number
    total: number
}

export default function Pages({ page, per, total }: IPages): React.ReactElement {
    const pages = Math.round(total / per);

    return(
        <span className="text-[14px]">Page {page} of {pages}</span>
    )
}