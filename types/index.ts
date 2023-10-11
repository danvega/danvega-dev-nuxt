export { };

declare global {

    type Theme = "light" | "dark";

    type Photo = {
        id: number,
        width: number,
        height: number,
        src: string,
        rotate: string
    }

}