import { Skeleton } from '@mui/material'

export default function SkeletonCard() {
    return (
        <div className="flex-1 flex flex-col h-full">
            <Skeleton width="80%" />
            <Skeleton width="40%" />
            <Skeleton
                style={{ transform: 'unset', marginTop: '.3em' }}
                width="100%"
                height="100%"
            />
        </div>
    )
}
