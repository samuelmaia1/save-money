import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function RootLoading() {
    return (
        <div
            style={{
                height: '40vh',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
            }}
        >
            < LoadingSpinner width='30px' color='var(--text-color)'/>
        </div>
    )
}