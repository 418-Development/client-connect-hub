import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    children?: string;
}

function Markdown({ children }: Props) {
    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>;
}

export default Markdown;
