export { };

declare global {

    type Theme = "light" | "dark";

    type Post = {
        title: string,
        description: string
    }

    type Photo = {
        id: number,
        width: number,
        height: number,
        src: string,
        alt: string
    }

    type Course = {
        slug: string,
        title: string,
        description: string,
        link: string,
        cover: string
    }

    type NavItem = {
        name: string,
        link: string
    }

}



