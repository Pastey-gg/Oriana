import { A } from "@solidjs/router";
import BashIcon from "~/svgs/langs/bash";
import CIcon from "~/svgs/langs/c";
import CPPIcon from "~/svgs/langs/cpp";
import CSharpIcon from "~/svgs/langs/csharp.jsx";
import CSSIcon from "~/svgs/langs/css";
import GoIcon from "~/svgs/langs/go.jsx";
import JavascriptIcon from "~/svgs/langs/javascript";
import PythonIcon from "~/svgs/langs/python";
import RustIcon from "~/svgs/langs/rust";
import SXIcon from "~/svgs/langs/sx";
import TextIcon from "~/svgs/langs/text";
import TypescriptIcon from "~/svgs/langs/typescript";
import AiFillDiff from "./svgs/langs/diff";
import SiGraphql from "./svgs/langs/gql";
import SiHtml5 from "./svgs/langs/html";
import FaBrandsJava from "./svgs/langs/java";
import VsJson from "./svgs/langs/json";
import SiKotlin from "./svgs/langs/kotlin";
import SiLess from "./svgs/langs/less";
import SiLua from "./svgs/langs/lua";
import SiMarkdown from "./svgs/langs/markdown";
import SiPerl from "./svgs/langs/perl";
import SiPhp from "./svgs/langs/php";
import FaBrandsRProject from "./svgs/langs/r";
import VsRegex from "./svgs/langs/regex";
import SiRuby from "./svgs/langs/ruby";
import TbOutlineSql from "./svgs/langs/sql";
import SiSwift from "./svgs/langs/swift";
import SiToml from "./svgs/langs/toml";
import SiWebassembly from "./svgs/langs/wasm";
import BsFiletypeXml from "./svgs/langs/xml";
import SiYaml from "./svgs/langs/yaml";
export interface LangObj {
  name: string;
  // biome-ignore lint/suspicious/noExplicitAny: ...
  icon: any;
}

export const LANGS: LangObj[] = [
  { name: "regex", icon: VsRegex },
  { name: "yaml", icon: SiYaml },
  { name: "tsx", icon: SXIcon },
  { name: "typescript", icon: TypescriptIcon },
  { name: "scss", icon: CSSIcon },
  { name: "makefile", icon: TextIcon },
  { name: "json", icon: VsJson },
  { name: "graphql", icon: SiGraphql },
  { name: "csharp", icon: CSharpIcon },
  { name: "clike", icon: CIcon },
  { name: "swift", icon: SiSwift },
  { name: "rust", icon: RustIcon },
  { name: "python", icon: PythonIcon },
  { name: "perl", icon: SiPerl },
  { name: "lua", icon: SiLua },
  { name: "jsx", icon: SXIcon },
  { name: "javascript", icon: JavascriptIcon },
  { name: "go", icon: GoIcon },
  { name: "cpp", icon: CPPIcon },
  { name: "wasm", icon: SiWebassembly },
  { name: "sql", icon: TbOutlineSql },
  { name: "ruby", icon: SiRuby },
  { name: "objectivec", icon: TextIcon },
  { name: "less", icon: SiLess },
  { name: "java", icon: FaBrandsJava },
  { name: "diff", icon: AiFillDiff },
  { name: "c", icon: CIcon },
  { name: "basic", icon: TextIcon },
  { name: "r", icon: FaBrandsRProject },
  { name: "php", icon: SiPhp },
  { name: "markdown", icon: SiMarkdown },
  { name: "xml", icon: BsFiletypeXml },
  { name: "markup", icon: SiHtml5 },
  { name: "css", icon: CSSIcon },
  { name: "bash", icon: BashIcon },
  { name: "ini", icon: TextIcon },
  { name: "toml", icon: SiToml },
  { name: "kotlin", icon: SiKotlin },
  { name: "text", icon: TextIcon },
];
LANGS.sort((a, b) => a.name.localeCompare(b.name));

export const EXTS: Record<string, string> = {
  ".yaml": "yaml",
  ".yml": "yaml",
  ".tsx": "tsx",
  ".ts": "typescript",
  ".scss": "scss",
  Make: "makefile",
  ".json": "json",
  ".gql": "graphql",
  ".graphql": "graphql",
  ".cs": "csharp",
  ".csproj": "csharp",
  ".c": "c",
  ".h": "c",
  ".swift": "swift",
  ".rs": "rust",
  ".py": "python",
  ".pyc": "python",
  ".pyx": "python",
  ".pl": "perl",
  ".pm": "perl",
  ".lua": "lua",
  ".jsx": "jsx",
  ".js": "javascript",
  ".go": "go",
  ".cpp": "cpp",
  ".hpp": "cpp",
  ".wasm": "wasm",
  ".sql": "sql",
  ".rb": "ruby",
  ".rake": "ruby",
  ".arb": "ruby",
  ".m": "objectivec",
  ".less": "less",
  ".java": "java",
  ".jar": "java",
  ".class": "java",
  ".diff": "diff",
  ".patch": "diff",
  ".bas": "basic",
  ".vbp": "basic",
  ".r": "r",
  ".php": "php",
  ".md": "markdown",
  ".mdx": "markdown",
  ".html": "markup",
  ".xml": "xml",
  ".css": "css",
  ".sh": "bash",
  ".ini": "ini",
  ".kt": "kotlin",
  ".kts": "kotlin",
  ".txt": "text",
  ".toml": "toml",
};
