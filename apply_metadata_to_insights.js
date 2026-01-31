const fs = require('fs');
const path = require('path');

const METADATA_FILE = 'episodes_metadata.json';
const INSIGHTS_FILE = 'pm-os-app/src/data/insights.json';

function run() {
    if (!fs.existsSync(METADATA_FILE) || !fs.existsSync(INSIGHTS_FILE)) {
        console.error("Missing metadata or insights file.");
        return;
    }

    const metadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
    const insightsData = JSON.parse(fs.readFileSync(INSIGHTS_FILE, 'utf8'));

    // Create a lookup map for metadata
    const metadataMap = new Map();
    metadata.forEach(ep => {
        if (ep.slug) {
            metadataMap.set(ep.slug, ep);
        }
    });

    let updatedCount = 0;

    // insightsData is structured as { insights: [ ... ] } or just [ ... ]?
    // Based on previous session, it might be { insights: [...] } or an array.
    // Let's handle both.

    let episodes = Array.isArray(insightsData) ? insightsData : (insightsData.insights || []);

    if (episodes.length === 0) {
        console.error("No episodes found in insights.json");
        return;
    }

    episodes.forEach(ep => {
        const meta = metadataMap.get(ep.slug);
        if (meta) {
            let modified = false;
            // Update fields if missing in insight but present in meta
            if (!ep.publish_date && meta.publish_date) {
                ep.publish_date = meta.publish_date;
                modified = true;
            }
            if (!ep.youtube_url && meta.youtube_url) {
                ep.youtube_url = meta.youtube_url;
                modified = true;
            }

            // Also ensure each individual insight in the episode has this data if useful?
            // The UI seems to check the episode level (InsightCard receives an 'insight' object which is actually an episode/insight combo in some contexts, or the episode object has the data).
            // Looking at InsightCard.tsx: `insight.publish_date`. 
            // Looking at InventoryPage.tsx: it iterates `filteredAndSortedEpisodes`.
            // So updating the episode object is correct.

            if (modified) {
                updatedCount++;
            }
        }
    });

    // Write back. Maintain structure.
    const outputData = Array.isArray(insightsData) ? episodes : { ...insightsData, insights: episodes };

    fs.writeFileSync(INSIGHTS_FILE, JSON.stringify(outputData, null, 4));
    console.log(`Updated ${updatedCount} episodes in insights.json with new metadata.`);
}

run();
