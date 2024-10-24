const animations = {
    h1: {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 },
    },
    fadeIn: {
        initial: { opacity: 0 },
        transition: { delay: 0.5, duration: 0.8 },
        whileInView: { opacity: 1 },
    },
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        transition: { delay: 0.5, duration: 0.8 },
        whileInView: { opacity: 1, y: 0 },
    },
    statsAnimation: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    },
    div: {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
    },
    button: {
        whileTap: { scale: 0.9 },
    },
    a: {
        whileTap: { scale: 0.9 },
    },
    p: {
        initial: { opacity: 0, x: +100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.7 },
    },
    h2: {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
    },
    img: {
        initial: { opacity: 0, y: -100 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8 },
    }
};
export default animations