
export function parseMarkdown(input) {
	const lines = input.split('\n');
	const parsedLines = [];
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (line.trim() === '') {
			parsedLines.push(null);
			continue;
		}

		const heading = parseHeading(line);
		if (heading) {
			parsedLines[i] = heading;
			continue;
		}

		let lastLine = parsedLines[parsedLines.length - 1];
		if (lastLine && lastLine.type === 'p') {
			lastLine.content = lastLine.content.concat(
				textNode('\n'),
				parseInlineText(line)
			);
		} else {
			parsedLines.push({
				type: 'p',
				content: parseInlineText(line)
			});
		}
	}
	
	return parsedLines.filter(line => line);
}

function parseInlineText(line) {
	const linkRegex = new RegExp(/(\[[^\[]+\]\([^(]+\))/g);
	const linkComponentsRegex = new RegExp(/\[([^\[]+)\]\(([^(]+)\)/);
	return line.split(linkRegex).reduce((parts, part) => {
		const linkComponentMatches = part.match(linkComponentsRegex);
		return parts.concat(
			linkComponentMatches
				? {
					type: 'a',
					content: linkComponentMatches[1],
					url: linkComponentMatches[2],
				}
				: textNode(part)
		);
	}, []);
}

function textNode(content) {
	return {
		type: 'text',
		content
	}
}

function parseHeading(line) {
	const matches = line.match(/(^#{1,6})\s(.+)/);
	if (matches && matches.length === 3) {
		return {
			type: 'h' + matches[1].length,
			content: parseInlineText(matches[2])
		};
	}
}
