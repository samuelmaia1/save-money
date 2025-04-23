import style from '@/styles/Spinner.module.scss';

interface LoadingSpinnerProps {
    width: string,
    color?: string
};

export function LoadingSpinner({width, color} : LoadingSpinnerProps) {
    return (
        <div 
            className={style.container}
            style={{
                width,
                height: width,
                color: color
            }}
        >

        </div>
    )
}