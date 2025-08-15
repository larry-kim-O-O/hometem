#!/usr/bin/env node

/**
 * Sitemap Generator for ホームテム
 * Automatically generates sitemap.xml from HTML files
 *
 * Usage: node scripts/update-sitemap.js
 */

const fs = require("fs");
const path = require("path");

// Configuration
const BASE_URL = "https://homutemu.example";
const OUTPUT_FILE = "sitemap.xml";
const EXCLUDE_PATTERNS = [
  /templates\//,
  /partials\//,
  /scripts\//,
  /\.git\//,
  /node_modules\//,
  /404\.html$/,
  /\.(css|js|png|jpg|jpeg|gif|svg|ico)$/,
  /partials\.html$/,
  /templates\.html$/,
];

// Priority mapping for different page types
const PRIORITY_MAP = {
  "index.html": 1.0,
  "about.html": 0.8,
  "contact.html": 0.8,
  "categories/": 0.7,
  "posts/": 0.6,
  "products/": 0.6,
  "policy/": 0.5,
};

// Change frequency mapping
const CHANGEFREQ_MAP = {
  "index.html": "daily",
  "categories/": "weekly",
  "posts/": "monthly",
  "products/": "monthly",
  "policy/": "yearly",
  "about.html": "yearly",
  "contact.html": "yearly",
};

/**
 * Recursively find all HTML files
 */
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      // Check if file should be excluded
      const shouldExclude = EXCLUDE_PATTERNS.some((pattern) =>
        pattern.test(filePath)
      );

      // Additional check for partials and templates
      const isPartialOrTemplate =
        filePath.includes("partials") ||
        filePath.includes("templates") ||
        filePath.includes("scripts");

      if (!shouldExclude && !isPartialOrTemplate) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Get priority for a URL
 */
function getPriority(url) {
  for (const [pattern, priority] of Object.entries(PRIORITY_MAP)) {
    if (url.includes(pattern)) {
      return priority;
    }
  }
  return 0.5; // Default priority
}

/**
 * Get change frequency for a URL
 */
function getChangeFreq(url) {
  for (const [pattern, freq] of Object.entries(CHANGEFREQ_MAP)) {
    if (url.includes(pattern)) {
      return freq;
    }
  }
  return "monthly"; // Default frequency
}

/**
 * Get last modified date for a file
 */
function getLastModified(filePath) {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString();
}

/**
 * Generate sitemap XML
 */
function generateSitemap(files) {
  const now = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  files.forEach((file) => {
    // Convert file path to URL
    let url = file.replace(/\\/g, "/"); // Windows path fix
    url = url.replace(/^\.\//, ""); // Remove leading ./
    url = url.replace(/index\.html$/, ""); // Remove index.html
    url = url.replace(/\.html$/, ""); // Remove .html extension
    url = url || "/"; // Empty string becomes root

    // Ensure URL starts with /
    if (!url.startsWith("/")) {
      url = "/" + url;
    }

    const fullUrl = BASE_URL + url;
    const priority = getPriority(url);
    const changefreq = getChangeFreq(url);
    const lastmod = getLastModified(file);

    xml += "  <url>\n";
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
}

/**
 * Main function
 */
function main() {
  console.log("🔍 Scanning for HTML files...");

  try {
    // Find all HTML files
    const htmlFiles = findHtmlFiles(".");

    console.log(`📄 Found ${htmlFiles.length} HTML files`);

    // Generate sitemap
    const sitemapXml = generateSitemap(htmlFiles);

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, sitemapXml, "utf8");

    console.log(`✅ Sitemap generated successfully: ${OUTPUT_FILE}`);
    console.log(`📊 Total URLs: ${htmlFiles.length}`);

    // Show some statistics
    const stats = {
      Homepage: htmlFiles.filter((f) => f.includes("index.html")).length,
      Categories: htmlFiles.filter((f) => f.includes("categories/")).length,
      Posts: htmlFiles.filter((f) => f.includes("posts/")).length,
      Products: htmlFiles.filter((f) => f.includes("products/")).length,
      Policy: htmlFiles.filter((f) => f.includes("policy/")).length,
      Other: htmlFiles.filter(
        (f) =>
          !f.includes("index.html") &&
          !f.includes("categories/") &&
          !f.includes("posts/") &&
          !f.includes("products/") &&
          !f.includes("policy/")
      ).length,
    };

    console.log("\n📈 Page Statistics:");
    Object.entries(stats).forEach(([type, count]) => {
      if (count > 0) {
        console.log(`   ${type}: ${count}`);
      }
    });
  } catch (error) {
    console.error("❌ Error generating sitemap:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { generateSitemap, findHtmlFiles };
