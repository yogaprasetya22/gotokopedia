export const SlideUp = (delay: number) => {
    return {
        initial: {
            y: 100,
            opacity: 0,
        },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: delay,
            },
        },
    };
}