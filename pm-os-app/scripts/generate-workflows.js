import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workflowsDir = 'C:\\Projects\\global_workflows';
// Go up one level from scripts to src/data
const outputFile = path.join(__dirname, '..', 'src', 'data', 'workflows.ts');

const metadata = [
    { filename: 'architecture-review.md', title: 'Architecture Review', category: 'Engineering', stages: ['development', 'scale'], description: 'Enforce scalable, resilient, and evolvable system architecture' },
    { filename: 'code-review.md', title: 'Code Review', category: 'Engineering', stages: ['development'], description: 'Enforce high-quality, secure, maintainable code through structured AI reviews' },
    { filename: 'context-reset.md', title: 'Context Reset', category: 'System', stages: ['optimization'], description: 'Reset context by auditing and archiving stale brain artifacts' },
    { filename: 'debugging-incident-analysis.md', title: 'Debug Incident', category: 'Engineering', stages: ['optimization', 'launch'], description: 'Systematically diagnose runtime errors, crashes, and failures' },
    { filename: 'deploy-design-system.md', title: 'Deploy Design System', category: 'Product', stages: ['design', 'development'], description: 'Deploy approved design system tokens across all pages' },
    { filename: 'dry-run-strategy.md', title: 'Dry Run Strategy', category: 'Strategy', stages: ['strategy'], description: 'Test trading strategy on historical data before live deployment' },
    { filename: 'engineering-orchestrator.md', title: 'Engineering Orchestrator', category: 'Engineering', stages: ['development', 'scale'], description: 'Coordinate, govern, and enforce multi-agent engineering workflows' },
    { filename: 'feature-delivery.md', title: 'Feature Delivery', category: 'Product', stages: ['development', 'launch'], description: 'Deliver complete, reliable, and scalable features from concept to production' },
    { filename: 'onboard-project.md', title: 'Onboard Project', category: 'Engineering', stages: ['discovery', 'development'], description: 'Onboard to a complex project by reading key architecture docs' },
    { filename: 'performance-engineering.md', title: 'Perf Engineering', category: 'Engineering', stages: ['optimization', 'scale'], description: 'Detect, analyze, and eliminate performance bottlenecks across systems' },
    { filename: 'project-foundation.md', title: 'Project Foundation', category: 'Engineering', stages: ['discovery', 'development'], description: 'Initialize new projects with scalable, secure, and maintainable foundations' },
    { filename: 'release-gatekeeper.md', title: 'Release Gatekeeper', category: 'Engineering', stages: ['launch', 'development'], description: 'Enforce production readiness, operational safety, and release quality' },
    { filename: 'safe-edit-mode.md', title: 'Safe Edit Mode', category: 'System', stages: ['development'], description: 'Safe file editing protocol to prevent failures and token waste' },
    { filename: 'safe-schema-change.md', title: 'Safe Schema Change', category: 'Engineering', stages: ['development', 'scale'], description: 'Safely modify database schema without breaking EXE or end-user data' },
    { filename: 'system-hardening.md', title: 'System Hardening', category: 'Engineering', stages: ['optimization', 'scale'], description: 'Detect structural risk, accumulated debt, and systemic fragility' },
    { filename: 'ui-ux-pro-max.md', title: 'UI/UX Pro Max', category: 'Product', stages: ['design'], description: 'Comprehensive High-Density Design Framework (97+ Palettes, 50+ Styles)' },
    { filename: 'ui-ux.md', title: 'UI/UX Standards', category: 'Product', stages: ['design'], description: 'Universal Premium UI-UX Standards for Modern Corporate Apps' },
];

let fileContent = `export interface Workflow {
    id: string;
    title: string;
    description: string;
    category: "Engineering" | "Product" | "Strategy" | "Quality" | "System";
    command: string;
    content: string;
    stages: string[];
}

export const workflows: Workflow[] = [
`;

metadata.forEach(item => {
    const filePath = path.join(workflowsDir, item.filename);
    let content = '';
    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch (e) {
        console.error(`Error reading ${item.filename}: ${e.message}`);
        content = 'Content not found.';
    }

    // Escape backticks and other special characters for template literal
    const escapedContent = content
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\$/g, '\\$');

    const id = item.filename.replace('.md', '');
    const command = `/${id}`;

    fileContent += `    {
        id: "${id}",
        title: "${item.title}",
        description: "${item.description}",
        category: "${item.category}",
        command: "${command}",
        stages: ${JSON.stringify(item.stages)},
        content: \`${escapedContent}\`
    },
`;
});

fileContent += `];
`;

fs.writeFileSync(outputFile, fileContent);
console.log(`Generated workflows.ts with ${metadata.length} workflows.`);
