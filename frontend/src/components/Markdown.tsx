import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    children?: string;
    small?: boolean;
}

function Markdown({ children, small = false }: Props) {
    const smallComponents: Partial<Components> = {
        h1: "h5",
        h2: "h5",
        h3: "h6",
        h4: "h6",
        h5: "h6",
    };
    const components: Partial<Components> = {
        img(props) {
            const { src, alt, title, ...rest } = props;

            const size = alt?.match(/\{(\d+)x(\d+)\}/);
            const width = size ? size[1] : "400";
            const height = size ? size[2] : "250";

            return <img src={src} alt={alt} title={title} width={width} height={height} {...rest} />;
        },
    };
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={small ? smallComponents : components}>
            {children}
        </ReactMarkdown>
    );
}

export default Markdown;
