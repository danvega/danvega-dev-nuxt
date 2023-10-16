export { };

declare global {

    type Theme = "light" | "dark";

    type Post = {
        title: String,
        description: String,
        path: String
    }

    type Photo = {
        id: number,
        width: number,
        height: number,
        src: string,
        rotate: string
    }

    type Course = {
        slug: String,
        title: String,
        description: String,
        link: String,
        cover: String
    }


}



