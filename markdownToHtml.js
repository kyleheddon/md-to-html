import { parseMarkdown } from './parseMarkdown';
import { nodesToHtml } from './nodesToHtml';

export function markdownToHtml(input, logParsed) {
	const nodes = parseMarkdown(input);

	if (logParsed) {
		nodes.forEach((node) => console.log(node));
	}

	return nodesToHtml(nodes).join('\n');
}