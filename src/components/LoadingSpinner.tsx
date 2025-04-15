import style from '@/styles/Spinner.module.scss'

interface LoadingSpinnerProps {
    width: string
}

export function LoadingSpinner({width} : LoadingSpinnerProps) {
    return (
        <div 
            className={style.container}
            style={{
                width,
                height: width
            }}
        >

        </div>
    )
}