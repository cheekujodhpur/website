const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_DIR = path.join(__dirname, '../content');

// Convert markdown links inside HTML blocks to <a> tags
// Pattern: [text](url) → <a href="url">text</a>
function convertMarkdownLinksInHTML(content) {
  // Match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  // Split content into HTML blocks and markdown blocks
  // We only want to convert links that are inside HTML tags
  const lines = content.split('\n');
  const result = [];

  for (const line of lines) {
    // Check if line contains HTML tags (starts with < or contains inline HTML)
    const hasHTMLTags = /<[a-zA-Z]/.test(line);

    if (hasHTMLTags && linkRegex.test(line)) {
      // Reset regex lastIndex
      linkRegex.lastIndex = 0;
      const converted = line.replace(linkRegex, (match, text, url) => {
        return `<a href="${url}">${text}</a>`;
      });
      result.push(converted);
    } else {
      result.push(line);
    }
  }

  return result.join('\n');
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data: frontmatter, content } = matter(raw);

  const fixed = convertMarkdownLinksInHTML(content);

  if (fixed !== content) {
    const output = matter.stringify(fixed, frontmatter);
    fs.writeFileSync(filePath, output, 'utf8');
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  let count = 0;

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (processFile(filePath)) {
      console.log(`Fixed: ${file}`);
      count++;
    }
  });

  return count;
}

console.log('Fixing markdown links inside HTML blocks...\n');

const blogFixed = processDirectory(path.join(CONTENT_DIR, 'blog'));
const projectsFixed = processDirectory(path.join(CONTENT_DIR, 'projects'));

console.log(`\nDone! Fixed ${blogFixed} blog posts and ${projectsFixed} projects.`);
