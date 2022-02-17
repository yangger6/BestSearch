import sanitizeHtml from 'sanitize-html'

const defaultOptions = {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
        a: ['href'],
    },
    allowedIframeHostnames: ['www.youtube.com'],
} as sanitizeHtml.IOptions

const sanitize = (dirty: string, options: sanitizeHtml.IOptions) => ({
    __html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
})
interface ISanitizeHTMLProps {
    html: string
    options?: sanitizeHtml.IOptions
}
const SanitizeHTML = ({ html, options }: ISanitizeHTMLProps) => (
    <div dangerouslySetInnerHTML={sanitize(html, options || {})} />
)
export default SanitizeHTML
