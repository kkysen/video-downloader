export const createIframeSandbox = function(src: string): Promise<ActiveHTMLIFrameElement> {
    const iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.hidden = true;
    const activatedIframe = iframe.activate();
    return new Promise((resolve, reject) => {
        iframe.onload = () => {
            resolve(activatedIframe);
        };
        iframe.onerror = reject;
    });
};