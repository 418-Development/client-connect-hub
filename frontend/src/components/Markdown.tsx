import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    children?: string;
    small?: boolean;
    medium?: boolean;
}

function Markdown({ children, small = false, medium = false }: Props) {
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
                <span className="code-container p-3">
                    <code {...props}></code>
                </span>
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
    } else if (medium) {
        const mediumComponents: Partial<Components> = {
            h1: "h3",
            h2: "h3",
            h3: "h4",
        };
        components = { ...components, ...mediumComponents };
    }
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {children}
        </ReactMarkdown>
    );
}

export default Markdown;
