
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const metadataPath = path.join(__dirname, '../../episodes_metadata.json');
const repoPath = path.join(__dirname, '../../lennys-transcripts-repo');

// Read existing metadata
const fileContent = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const metadata = Array.isArray(fileContent) ? fileContent : (fileContent.episodes || []);

let updatedCount = 0;

metadata.forEach(episode => {
    if (!episode.transcript_path) return;

    const transcriptFilePath = path.join(repoPath, episode.transcript_path);

    if (fs.existsSync(transcriptFilePath)) {
        const content = fs.readFileSync(transcriptFilePath, 'utf8');
        // Simple Regex to find video_id: XXXXXX
        const match = content.match(/^video_id:\s*(.+)$/m);

        if (match && match[1]) {
            const videoId = match[1].trim();
            episode.youtube_url = `https://www.youtube.com/watch?v=${videoId}`;
            updatedCount++;
        }
    } else {
        // console.warn(`Transcript not found: ${transcriptFilePath}`);
    }
});

// Write back to file
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 4));

console.log(`Successfully enriched ${updatedCount} episodes with YouTube URLs.`);
