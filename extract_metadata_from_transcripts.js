const fs = require('fs');
const path = require('path');

// Paths
const REPO_EPISODES_DIR = 'c:/Projects/The Full Stack Human/lennys-transcripts-repo/episodes';
const METADATA_FILE = 'c:/Projects/The Full Stack Human/episodes_metadata.json';

// Simple regex fallback for fields
function extractFieldRegex(content, field) {
    const regex = new RegExp(`${field}:\\s*(.+)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : null;
}

// Helper to manually parse frontmatter
function extractDetailsManual(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const lines = match[1].split('\n');
    const data = {};
    lines.forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(':').trim();
            if (key && value) data[key] = value;
        }
    });
    return data;
}

async function run() {
    console.log("Starting metadata extraction...");

    if (!fs.existsSync(METADATA_FILE)) {
        console.error(`Metadata file not found: ${METADATA_FILE}`);
        return;
    }

    let metadata;
    try {
        metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
    } catch (e) {
        console.error("Error parsing metadata json:", e);
        return;
    }

    let updatedCount = 0;
    let notFoundCount = 0;

    if (!fs.existsSync(REPO_EPISODES_DIR)) {
        console.error(`Repo directory not found: ${REPO_EPISODES_DIR}`);
        return;
    }

    const directories = fs.readdirSync(REPO_EPISODES_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    console.log(`Found ${directories.length} episode directories in repo.`);

    for (const slug of directories) {
        const transcriptPath = path.join(REPO_EPISODES_DIR, slug, 'transcript.md');

        if (fs.existsSync(transcriptPath)) {
            const content = fs.readFileSync(transcriptPath, 'utf8');

            // Try to get fields using simple regex which is robust enough for this frontmatter
            let youtube_url = extractFieldRegex(content, 'youtube_url');
            let publish_date = extractFieldRegex(content, 'publish_date');

            if (youtube_url || publish_date) {
                // Find matching entry in metadata
                let episode = metadata.find(e => e.slug === slug);

                if (!episode) {
                    // Entry not found in metadata, create it
                    console.log(`[CREATE] Adding new episode metadata for '${slug}'`);
                    episode = {
                        slug: slug,
                        youtube_url: youtube_url,
                        publish_date: publish_date,
                        // Try to extract other fields if possible, but these are the critical ones
                        guest: extractFieldRegex(content, 'guest') || slug,
                        title: extractFieldRegex(content, 'title') || slug
                    };
                    metadata.push(episode);
                    updatedCount++;
                    continue;
                }

                let modified = false;
                if (!episode.youtube_url && youtube_url) {
                    episode.youtube_url = youtube_url;
                    modified = true;
                }
                if (!episode.publish_date && publish_date) {
                    episode.publish_date = publish_date;
                    modified = true;
                }

                if (modified) {
                    console.log(`[UPDATE] Updated metadata for '${slug}'`);
                    updatedCount++;
                }
            }
        }
    }

    fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 4));
    console.log(`\nSuccess! Updated ${updatedCount} episodes. ${notFoundCount} repo directories did not match metadata slugs.`);
}

run();
