export { };

declare global {

    type Theme = "light" | "dark";

    type Post = {
        title: string,
        description: string
    }

    // RSS Feed Types
    type BlogPost = {
        title?: string;
        description?: string;
        slug?: string;
        date: string;
        published: boolean;
        author?: string;
        tags?: string[];
        _path?: string;
        body?: string;
    }

    type RSSItem = {
        title: string;
        description: string;
        link: string;
        guid: string;
        pubDate: string;
        author: string;
        categories: string[];
    }

    type RSSFeed = {
        title: string;
        description: string;
        link: string;
        language: string;
        lastBuildDate: string;
        managingEditor: string;
        webMaster: string;
        items: RSSItem[];
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



