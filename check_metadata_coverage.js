
const fs = require('fs');
const path = require('path');

const insightsPath = path.join(__dirname, 'pm-os-app/src/data/insights.json');
const metadataPath = path.join(__dirname, 'episodes_metadata.json');

const insightsData = JSON.parse(fs.readFileSync(insightsPath, 'utf8'));
const metadataData = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

const metadataMap = new Map(metadataData.map(m => [m.slug, m]));

let missingCount = 0;
let totalCount = 0;


const report = [];
report.push("Checking metadata coverage for insights.json episodes...\n");

const episodes = insightsData.insights || []; // Handle object structure

episodes.forEach(ep => {
    totalCount++;
    const meta = metadataMap.get(ep.slug);

    if (!meta) {
        report.push(`[MISSING META] Slug: "${ep.slug}" | Guest: "${ep.guest}"`);
        missingCount++;
    } else {
        const missingFields = [];
        if (!meta.youtube_url) missingFields.push('youtube_url');
        if (!meta.publish_date) missingFields.push('publish_date');

        if (missingFields.length > 0) {
            report.push(`[INCOMPLETE]   Slug: "${ep.slug}" | Missing: ${missingFields.join(', ')}`);
            missingCount++;
        }
    }
});

report.push(`\n------------------------------------------------`);
report.push(`Total Episodes: ${totalCount}`);
report.push(`Episodes w/ Issues: ${missingCount}`);
report.push(`Coverage: ${Math.round(((totalCount - missingCount) / totalCount) * 100)}%`);

fs.writeFileSync('missing_metadata_report.txt', report.join('\n'));
console.log("Report written to missing_metadata_report.txt");
