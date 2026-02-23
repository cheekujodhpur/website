const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const he = require('he');

const SOURCE_DIR = path.join(__dirname, '../../website');
const TARGET_DIR = path.join(__dirname, '../content');

// Build a map of all source files for link conversion
function buildFileMap() {
  const map = {};

  // Map blog posts
  const bpostsDir = path.join(SOURCE_DIR, '_bposts');
  if (fs.existsSync(bpostsDir)) {
    const files = fs.readdirSync(bpostsDir);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        // Remove date prefix if exists: 2021-12-25-title.md → title
        const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
        map[`_bposts/${file}`] = `/blog/${slug}/`;
      }
    });
  }

  // Map projects
  const projectsDir = path.join(SOURCE_DIR, '_projects');
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir);
    files.forEach(file => {
      if (file.endsWith('.md')) {
        const slug = file.replace(/\.md$/, '');
        map[`_projects/${file}`] = `/projects/${slug}/`;
      }
    });
  }

  return map;
}

// Convert Jekyll link syntax to Gatsby paths
function convertJekyllLinks(content, fileMap) {
  // Pattern: {% link _bposts/filename.md %} or {% link _projects/filename.md %}
  const linkRegex = /{%\s*link\s+(_bposts|_projects)\/([^}]+\.md)\s*%}/g;

  return content.replace(linkRegex, (match, collection, filename) => {
    const key = `${collection}/${filename}`;
    return fileMap[key] || match; // Return original if not found
  });
}

// Convert Kramdown IAL syntax to HTML
function convertKramdownIAL(content) {
  // Pattern: [text](url){:target="_blank"}
  const ialRegex = /\[([^\]]+)\]\(([^)]+)\)\{:target="_blank"\}/g;

  return content.replace(ialRegex, (match, text, url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
}

// Remove Kramdown nomarkdown blocks
function processNomarkdown(content) {
  return content
    .replace(/{::nomarkdown}/g, '')
    .replace(/{:\/?nomarkdown}/g, '');
}

// Extract excerpt from <!--break--> comment
function extractExcerpt(content, frontmatter) {
  const breakIndex = content.indexOf('<!--break-->');

  if (breakIndex !== -1) {
    const excerpt = content.substring(0, breakIndex).trim();
    const newContent = content.replace('<!--break-->', '').trim();

    return {
      frontmatter: { ...frontmatter, excerpt },
      content: newContent
    };
  }

  return { frontmatter, content };
}

// Convert prettify code blocks to markdown fenced blocks
function convertCodeBlocks(content) {
  // Pattern: <pre class="prettyprint"><code class="language-xxx">...</code></pre>
  const prettyprintRegex = /<pre\s+class="prettyprint"><code\s+class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;

  return content.replace(prettyprintRegex, (match, lang, code) => {
    // Unescape HTML entities
    const unescapedCode = he.decode(code.trim());
    return `\n\`\`\`${lang}\n${unescapedCode}\n\`\`\`\n`;
  });
}

// Normalize frontmatter
function normalizeFrontmatter(frontmatter) {
  const normalized = { ...frontmatter };

  // Convert date to ISO 8601 if it's in Jekyll format
  if (normalized.date) {
    const dateStr = String(normalized.date);
    // If it's already a Date object or ISO string, keep it
    if (!(normalized.date instanceof Date) && !dateStr.includes('T')) {
      // Parse Jekyll format: YYYY-MM-DD HH:MM:SS
      normalized.date = new Date(dateStr).toISOString();
    }
  }

  // Ensure categories is an array
  if (normalized.categories && typeof normalized.categories === 'string') {
    normalized.categories = normalized.categories.split(' ').filter(Boolean);
  }

  return normalized;
}

// Migrate a single file
function migrateFile(sourceFile, targetFile, fileMap) {
  console.log(`Migrating: ${path.basename(sourceFile)}`);

  // Read source file
  const sourceContent = fs.readFileSync(sourceFile, 'utf8');
  const { data: frontmatter, content } = matter(sourceContent);

  // Apply transformations
  let transformedContent = content;
  transformedContent = convertJekyllLinks(transformedContent, fileMap);
  transformedContent = convertKramdownIAL(transformedContent);
  transformedContent = processNomarkdown(transformedContent);
  transformedContent = convertCodeBlocks(transformedContent);

  // Extract excerpt
  const { frontmatter: updatedFrontmatter, content: finalContent } =
    extractExcerpt(transformedContent, frontmatter);

  // Normalize frontmatter
  const normalizedFrontmatter = normalizeFrontmatter(updatedFrontmatter);

  // Write target file
  const targetContent = matter.stringify(finalContent, normalizedFrontmatter);
  fs.writeFileSync(targetFile, targetContent, 'utf8');
}

// Migrate all files in a collection
function migrateCollection(sourceDir, targetDir, fileMap) {
  if (!fs.existsSync(sourceDir)) {
    console.warn(`Source directory not found: ${sourceDir}`);
    return 0;
  }

  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

  files.forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    migrateFile(sourceFile, targetFile, fileMap);
  });

  return files.length;
}

// Copy static assets
function copyStaticAssets() {
  const assetDirs = [
    { src: 'media', dest: 'media' },
    { src: 'images', dest: 'images' },
    { src: 'fonts', dest: 'fonts' },
    { src: 'css/font-awesome.min.css', dest: 'css/font-awesome.min.css', isFile: true }
  ];

  assetDirs.forEach(({ src, dest, isFile }) => {
    const sourcePath = path.join(SOURCE_DIR, src);
    const targetPath = path.join(__dirname, '../static', dest);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`Asset not found: ${sourcePath}`);
      return;
    }

    if (isFile) {
      // Copy single file
      const targetDir = path.dirname(targetPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${src}`);
    } else {
      // Copy directory recursively
      if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
      fs.cpSync(sourcePath, targetPath, { recursive: true });
      console.log(`Copied: ${src}/ (${fs.readdirSync(sourcePath).length} items)`);
    }
  });
}

// Main migration function
function main() {
  console.log('Starting Jekyll to Gatsby content migration...\n');

  // Build file map for link conversion
  console.log('Building file map...');
  const fileMap = buildFileMap();
  console.log(`Mapped ${Object.keys(fileMap).length} files\n`);

  // Migrate blog posts
  console.log('Migrating blog posts...');
  const blogCount = migrateCollection(
    path.join(SOURCE_DIR, '_bposts'),
    path.join(TARGET_DIR, 'blog'),
    fileMap
  );
  console.log(`Migrated ${blogCount} blog posts\n`);

  // Migrate projects
  console.log('Migrating projects...');
  const projectCount = migrateCollection(
    path.join(SOURCE_DIR, '_projects'),
    path.join(TARGET_DIR, 'projects'),
    fileMap
  );
  console.log(`Migrated ${projectCount} projects\n`);

  // Copy static assets
  console.log('Copying static assets...');
  copyStaticAssets();
  console.log('\n');

  console.log('✓ Migration complete!');
  console.log(`  - ${blogCount} blog posts`);
  console.log(`  - ${projectCount} projects`);
  console.log(`  - Static assets copied`);
}

// Run migration
if (require.main === module) {
  main();
}

module.exports = { main };
