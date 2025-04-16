interface GradientTextProps {
    size?: string,
    text: string,
    weight?: string,
    gradient?: string,
    className?: string
}

export function GradientText({
    size, 
    text, 
    weight, 
    gradient = 'linear-gradient(43deg, #3C7139 0%, #73D76C 100%)', 
    className
    } : GradientTextProps) {
    return (
        <p style={{
            fontSize: size, 
            fontWeight: weight,
            background: gradient,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
        }}
            className={className}
        >
            {text}
        </p>
    )
}