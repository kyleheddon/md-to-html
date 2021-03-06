export function nodesToHtml(nodes) {
	return nodes.map((node) => {
		if (node.type === 'text') {
			return node.content;
		} else if (node.type === 'a') {
			return aTag(node);
		} else if (node.type[0] === 'h' || node.type === 'p') {
			return tag(node);
		}
		
		// this shoudn't happen
		return '';
	});
}

function tag(node) {
	const content = nodesToHtml(node.content).join('');
	return `<${node.type}>${content}</${node.type}>\n`;
}

function aTag(node) {
	return `<a href="${node.url}">${node.content}</a>`;
}