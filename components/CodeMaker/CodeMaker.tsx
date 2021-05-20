import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";
export default function CodeMaker({ code }: { code: String }) {
    return (
        <SyntaxHighlighter
            language='jsx'
            className='syntaxhighlighter'
            style={tomorrow}
            showLineNumbers={true}>
            {code ? code : "no code"}
        </SyntaxHighlighter>
    );
}
