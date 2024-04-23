import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    children?: string;
    small?: boolean;
}

function Markdown({ children, small = false }: Props) {
    let components: Partial<Components> = {
        img(props) {
            const { src, alt, title, ...rest } = props;

            const size = alt?.match(/\{(\d+)x(\d+)\}/);
            const width = Number(size ? size[1] : "400");
            const height = Number(size ? size[2] : "250");

            return <img src={src} alt={alt} title={title} width={width} style={{ aspectRatio: width / height }} {...rest} />;
        },
        blockquote(props) {
            return <blockquote className="alert alert-primary" {...props}></blockquote>;
        },
        code(props) {
            return (
                <div className="code-container p-3">
                    <code {...props}></code>
                </div>
            );
        },
    };
    if (small) {
        const smallComponents: Partial<Components> = {
            h1: "h5",
            h2: "h5",
            h3: "h6",
            h4: "h6",
            h5: "h6",
        };
        components = { ...components, ...smallComponents };
    }
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children}
        </ReactMarkdown>
    );
}

export default Markdown;
