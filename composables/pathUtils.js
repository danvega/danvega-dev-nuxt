export function useGetSlugFromPath() {
    function getSlugFromPath(path) {
        const cleanPath = removeTrailingSlash(path);
        const parts = cleanPath.split("/");
        return parts[parts.length - 1];
    }

    function removeTrailingSlash(inputString) {
        if (inputString.endsWith("/")) {
            return inputString.slice(0, -1);
        }
        return inputString;
    }

    return {
        getSlugFromPath,
        removeTrailingSlash,
    };
}