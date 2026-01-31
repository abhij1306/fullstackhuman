
export interface AIWorkflow {
    title: string;
    description: string;
    prompt_template?: string;
    workflow_steps?: string[];
}

export interface StageData {
    id: string;
    label: string; // Display name
    definition: string;
    objectives: string[];
    tools: string[]; // List of tool names
    frameworks: string[]; // List of framework names
    ai_workflows: AIWorkflow[];
    success_metrics: string[]; // List of metric names
    failure_modes: { problem: string; avoidance: string }[];
}

export const stages: Record<string, StageData> = {
    discovery: {
        id: 'discovery',
        label: 'Discovery',
        definition: 'Discovery is the process of understanding your users, their problems, and the market opportunity before writing a single line of code. It reduces the risk of building the wrong thing.',
        objectives: [
            'Validate that the problem exists and is worth solving',
            'Understand who the customer is (Persona)',
            'Identify the competitive landscape',
            'Uncover user pain points and needs',
            'Define the value proposition'
        ],
        tools: [
            'UserTesting',
            'Maze',
            'Typeform',
            'SurveyMonkey',
            'Crunchbase',
            'Gong',
            'Chorus'
        ],
        frameworks: [
            'Design Thinking (Empathize, Define, Ideate...)',
            'Double Diamond (Discover, Define, Develop, Deliver)',
            'The Mom Test (How to talk to customers)',
            '5 Whys (Root cause analysis)'
        ],
        ai_workflows: [
            {
                title: '🎤 User Interview Analyzer',
                description: 'Transform raw interview transcripts into actionable product insights. Identifies pain points, emotional signals, and hidden feature requests.',
                prompt_template: `ROLE: You are a senior product researcher analyzing user interview data.

INPUT: Paste your raw interview notes or transcript below:
[PASTE INTERVIEW NOTES HERE]

TASK: Analyze the interview and extract the following in a structured format:

## 1. TOP 3 RECURRING PAIN POINTS
- List the most frequently mentioned problems
- Include frequency count if multiple users mentioned it

## 2. EMOTIONAL SIGNALS
- Direct quotes showing strong emotion (frustration, excitement, anxiety)
- Context around why they feel this way

## 3. IMPLICIT FEATURE REQUESTS
- Features users want but didn't explicitly ask for
- Derived from complaints or workarounds mentioned

## 4. CONTRADICTIONS & CONFLICTS
- Where different users disagree
- Conflicting needs or behaviors

## 5. ACTIONABLE RECOMMENDATIONS
- Top 3 product changes to prioritize
- Why each matters based on user evidence`
            },
            {
                title: '🔍 Competitive Differentiation Agent',
                description: 'Analyze competitors to find market gaps, avoid feature bloat, and identify your unique value proposition.',
                prompt_template: `ROLE: You are a competitive strategy analyst helping a product team find their edge.

INPUT:
- Competitor A Features: [LIST COMPETITOR A FEATURES]
- Competitor B Features: [LIST COMPETITOR B FEATURES]
- Your Product Idea: [DESCRIBE YOUR PRODUCT CONCEPT]
- Target Market: [DEFINE YOUR TARGET USERS]

TASK: Provide a competitive analysis with the following sections:

## 1. TABLE STAKES (Must-Have Features)
- Features users expect in this category
- Without these, you won't be considered

## 2. FEATURE BLOAT (Low-Value Additions)
- Features competitors have that add complexity but little value
- What to avoid building

## 3. MARKET GAPS (Underserved Needs)
- Pain points neither competitor addresses well
- Opportunities for differentiation

## 4. YOUR UNIQUE ANGLE
- What makes your approach different
- Why users would switch to you

## 5. POSITIONING STRATEGY
- How to describe your advantage in one sentence`
            },
            {
                title: '👤 Persona Generator',
                description: 'Create vivid, actionable user personas from demographic and behavioral data for design and development decisions.',
                prompt_template: `ROLE: You are a user research expert creating detailed personas for product teams.

INPUT:
- Target Audience: [DEMOGRAPHICS - age, role, industry]
- Main Goal: [WHAT THEY WANT TO ACHIEVE]
- Biggest Frustration: [WHAT BLOCKS THEM]
- Current Solution: [WHAT THEY USE TODAY]

TASK: Create a detailed user persona with the following sections:

## PERSONA PROFILE
**Name:** [Give them a realistic name]
**Job Title:** [Specific role]
**Age:** [Age range]
**Location:** [Urban/suburban/rural, region]

## A DAY IN THE LIFE
- Morning routine related to the problem
- Work context and environment
- Evening/weekend behavior

## GOALS & MOTIVATIONS
- Primary goal (what success looks like)
- Secondary goals
- Personal motivations

## PAIN POINTS & FRUSTRATIONS
- Current workarounds they use
- What makes them angry or anxious
- What wastes their time

## BEHAVIORAL TRAITS
- Tech savviness level
- Decision-making style
- Research habits before buying

## QUOTES
- 3 authentic-sounding quotes this person would say about the problem`
            },
            {
                title: '🎯 Problem Statement Refiner',
                description: 'Transform vague problem descriptions into crystal-clear, actionable problem statements the whole team can align on.',
                prompt_template: `ROLE: You are a product strategist helping teams articulate problems clearly.

INPUT:
- Current Problem Statement: "[PASTE YOUR VAGUE STATEMENT]"
- Context: [ANY BACKGROUND ON USERS/MARKET]

TASK: Refine the problem statement using multiple frameworks:

## STANDARD FORMAT
"[User Type] struggles to [Achieve Goal] because [Barrier/Constraint], which results in [Negative Outcome]."

## ALTERNATIVE VERSIONS

**Version 2 - Focus on Emotion:**
[Emotion-driven reframing]

**Version 3 - Focus on Impact:**
[Business/outcome-driven reframing]

**Version 4 - Focus on Root Cause:**
[Deeper systemic issue framing]

## VALIDATION CHECKLIST
- [ ] Is the user clearly defined?
- [ ] Is the action specific and observable?
- [ ] Is the barrier concrete?
- [ ] Is the outcome measurable?
- [ ] Would a stranger understand this?

## RECOMMENDED VERSION
[Best version with brief explanation of why]`
            }
        ],
        success_metrics: [
            '# of Customer Interviews conducted',
            'Problem Validation Score (Confidence)',
            'TAM/SAM/SOM estimates',
            'User Sentiment (Pre-product)'
        ],
        failure_modes: [
            {
                problem: 'Solution looking for a problem',
                avoidance: 'Fall in love with the problem, not the solution.'
            },
            {
                problem: 'Confirmation Bias',
                avoidance: 'Actively seek disconfirming evidence. Ask "What would prove me wrong?"'
            },
            {
                problem: 'Analysis Paralysis',
                avoidance: 'Time-box discovery. Set a date for the "Go/No-Go" decision.'
            },
            {
                problem: 'Outsourcing Discovery',
                avoidance: 'PMs and Designers must do the interviews themselves to build intuition.'
            }
        ]
    },
    strategy: {
        id: 'strategy',
        label: 'Strategy',
        definition: 'Strategy is the "How" that connects the Mission (Why) to the Roadmap (What/When). It is a coherent set of choices that positions the product to win.',
        objectives: [
            'Define a clear, winning value proposition',
            'Choose where to play and how to win',
            'Align the team around a shared vision',
            'Prioritize opportunities against resources',
            'Create a sustainable competitive advantage (Moat)'
        ],
        tools: [
            'Productboard',
            'Roadmunk',
            'Aha!',
            'Strategyzer',
            'Miro',
            'Whimsical'
        ],
        frameworks: [
            'Blue Ocean Strategy (Create new market space)',
            'Clayton Christensen’s Disruptive Innovation',
            'The 7 Powers (Hamilton Helmer)',
            'Good Strategy/Bad Strategy (Rumelt)'
        ],
        ai_workflows: [
            {
                title: '🛡️ Strategy Stress-Tester',
                description: 'Challenge your strategic assumptions with a "Red Team" critique to find weaknesses before competitors do.',
                prompt_template: `ROLE: You are a skeptical board member and strategic advisor who challenges assumptions.

INPUT:
- Product Strategy Summary: [PASTE YOUR STRATEGY]
- Market Context: [DESCRIBE YOUR MARKET/COMPETITION]
- Key Assumptions: [LIST YOUR MAIN ASSUMPTIONS]

TASK: Critique this strategy ruthlessly. Provide analysis in these sections:

## LOGICAL FALLACIES & GAPS
- Flawed reasoning in the strategy
- Missing evidence or data
- Circular logic or confirmation bias

## WEAK ASSUMPTIONS
- What are you assuming that might not be true?
- What would prove each assumption wrong?
- Which assumption, if false, kills the strategy?

## HIDDEN THREATS
- Market threats you haven't considered
- Competitor moves that could undermine you
- Regulatory or technological shifts

## ALTERNATIVE SCENARIOS
- 2-3 different strategic approaches
- Why they might work better
- Trade-offs of each

## HARD QUESTIONS
- 5 questions the CEO should be prepared to answer
- What investors will ask
- What your team needs to know

## RED TEAM VERDICT
- Go / No-Go / Proceed with Caution
- Top 3 fixes needed before proceeding`
            },
            {
                title: '🏰 Moat Builder',
                description: 'Identify and build sustainable competitive advantages using proven frameworks like the 7 Powers.',
                prompt_template: `ROLE: You are a competitive strategy expert helping build defensible businesses.

INPUT:
- Product Description: [WHAT YOU'RE BUILDING]
- Current Traction: [USERS, REVENUE, GROWTH]
- Target Market: [WHO YOU SERVE]
- Key Differentiators: [WHAT MAKES YOU UNIQUE TODAY]

TASK: Analyze and recommend moat-building strategies:

## CURRENT MOAT ASSESSMENT
Rate your current defensibility (1-10) for each power:
- [ ] Scale Economies
- [ ] Network Effects
- [ ] Counter-Positioning
- [ ] Switching Costs
- [ ] Brand
- [ ] Cornered Resource
- [ ] Process Power

## TOP 3 MOAT OPPORTUNITIES
For each:
1. **The Power:** Which of the 7 Powers
2. **How to Build It:** Specific actions
3. **Timeline:** Short/Medium/Long term
4. **Investment Required:** Resources needed
5. **Defensibility Score:** How strong it becomes

## NETWORK EFFECTS DEEP DIVE
(if applicable)
- Type of network effect possible
- How to bootstrap it
- Critical mass needed
- Metrics to track

## SWITCHING COSTS STRATEGY
- Data lock-in opportunities
- Integration depth strategies
- Habit formation tactics

## IMMEDIATE ACTIONS (Next 90 Days)
- 3 things to start doing now
- Quick wins for defensibility
- What to stop doing

## LONG-TERM MOAT VISION
- What your moat looks like in 3 years
- How competitors will struggle to copy you`
            },
            {
                title: '🚀 Vision Statement Architect',
                description: 'Craft inspiring, concrete vision statements that align teams and attract investors.',
                prompt_template: `ROLE: You are a communications expert specializing in product vision and mission statements.

INPUT:
- Current Draft (if any): "[YOUR DRAFT]"
- Product: [WHAT YOU BUILD]
- Target Users: [WHO YOU SERVE]
- Problem You Solve: [THE PAIN POINT]
- Aspirational Impact: [THE BIG PICTURE]

TASK: Create compelling vision statements in multiple formats:

## VISION FRAMEWORK
**The Formula:**
"We are building [Product] to help [User] achieve [Outcome], ultimately [Big Impact]."

## VERSION OPTIONS

**Option 1: User-Empowerment Focus**
(Highlights what users can do)
[Draft statement]

**Option 2: Market-Transformation Focus**
(Highlights industry change)
[Draft statement]

**Option 3: Mission-Driven Focus**
(Highlights purpose and values)
[Draft statement]

**Option 4: Ambition/Scale Focus**
(Highlights growth and dominance)
[Draft statement]

## THE "ELEVATOR PITCH" VERSION
(Under 25 words, memorable)
[Short version]

## THE "ALL-HANDS" VERSION
(More detailed, inspiring for team)
[Longer version]

## TESTING YOUR VISION
Check each version against:
- [ ] Is it inspiring?
- [ ] Is it specific enough?
- [ ] Will it still matter in 10 years?
- [ ] Does it differentiate from competitors?
- [ ] Can every employee see their role in it?

## RECOMMENDED VISION
[Best option with brief rationale]`
            },
            {
                title: '💀 Pre-Mortem Simulator',
                description: 'Imagine future failure and work backward to identify risks and preventative actions today.',
                prompt_template: `ROLE: You are a risk analyst conducting a pre-mortem analysis.

INPUT:
- Product Name: [YOUR PRODUCT]
- Launch Date: [WHEN YOU LAUNCHED]
- Current Date (in scenario): [2 YEARS FROM NOW]
- Market Context: [COMPETITION, TRENDS]
- Key Decisions Made: [STRATEGIC CHOICES]

SCENARIO: It's 2 years from now. Your product has completely failed. The company has shut it down or pivoted away.

TASK: Work backward to understand why:

## FAILURE ANNOUNCEMENT
Write a realistic "post-mortem" announcement:
"Today we are shutting down [Product]. Despite [initial traction], we failed because..."

## ROOT CAUSE ANALYSIS
Identify 5-7 plausible failure reasons:

**Reason 1: [Category]**
- What happened
- Early warning signs (that you can watch for now)
- Preventative measures

**Reason 2: [Category]**
[Same structure]

[Continue for all reasons]

## EARLY WARNING INDICATORS
For each failure mode, list:
- Metric to track
- Red flag threshold
- Who should monitor it

## PREVENTION PLAYBOOK
**Immediate (Next 30 Days):**
- Actions to reduce risk

**Short-term (Next 90 Days):**
- Strategic adjustments

**Ongoing:**
- Monitoring and review cadence

## CONTINGENCY PLANS
If Warning Sign X appears:
- Response plan
- Decision criteria
- Pivot options

## GO/NO-GO REASSESSMENT
Given these risks, should you:
- Proceed as planned
- Proceed with modifications
- Pause and reconsider
- Pivot now`
            }
        ],
        success_metrics: [
            'Strategic Clarity Score (Team Survey)',
            'Market Share Growth targets',
            'LTV:CAC Ratio targets',
            'Roadmap Adherence (Strategic Items)'
        ],
        failure_modes: [
            {
                problem: 'Strategy as "Goal Setting"',
                avoidance: 'Strategy is not "Grow by 20%". It is *how* you will grow.'
            },
            {
                problem: 'The "Kitchen Sink" Strategy',
                avoidance: 'Strategy requires trade-offs. If you aren\'t saying NO to good ideas, you don\'t have a strategy.'
            },
            {
                problem: 'Ignoring the Competition',
                avoidance: 'Respect the incumbents. Understand why they are winning before trying to beat them.'
            }
        ]
    },
    design: {
        id: 'design',
        label: 'Design',
        definition: 'Design is not just how it looks, but how it works. It translates user needs and strategic goals into intuitive, functional, and delightful experiences.',
        objectives: [
            'Create intuitive and efficient user flows',
            'minimize cognitive load',
            'Ensure accessibility (a11y) for all users',
            'Build a consistent visual language (Design System)',
            'Validate solutions through prototyping'
        ],
        tools: [
            'Figma',
            'Sketch',
            'Marvel',
            'InVision',
            'Zeplin',
            'Storybook'
        ],
        frameworks: [
            'Atomic Design (Atoms, Molecules, Organisms)',
            'Material Design / Human Interface Guidelines',
            'Gestalt Principles of Perception',
            'Mobile-First Design'
        ],
        ai_workflows: [
            {
                title: '🔍 Edge Case Explorer',
                description: 'Systematically identify edge cases, error states, and unhappy paths before they become user problems.',
                prompt_template: 'ROLE: You are a QA engineer and UX researcher focused on finding what could go wrong.\n\nINPUT:\n- User Flow Name: [e.g., "Checkout Process", "User Registration"]\n- Flow Description: [STEP-BY-STEP DESCRIPTION]\n- User Types: [WHO USES THIS FLOW]\n- Critical Actions: [WHAT MUST NOT FAIL]\n\nTASK: Identify edge cases and error scenarios:\n\n## SYSTEM-LEVEL EDGE CASES\n- Network failures (offline, slow, intermittent)\n- Server errors (500, 503, timeout)\n- Data issues (null, malformed, extremely large)\n- Browser/Device variations\n\n## USER BEHAVIOR EDGE CASES\n- What if user abandons mid-flow?\n- What if user goes back then forward?\n- What if user has multiple tabs open?\n- What if user refreshes at critical moment?\n- What if user uses browser back button?\n\n## DATA INPUT EDGE CASES\n- Empty/null inputs\n- Maximum length exceeded\n- Special characters and emojis\n- Copy-paste from Word/PDF\n- Autofill complications\n\n## BUSINESS LOGIC EDGE CASES\n- Race conditions (two users, same resource)\n- Time-based issues (expired sessions, midnight)\n- Permission changes mid-flow\n- Inventory/stock issues\n- Pricing/payment edge cases\n\n## ERROR STATE DESIGNS NEEDED\nFor each critical error:\n- Error message (user-friendly)\n- Recovery action\n- Fallback state\n- Logging requirements\n\n## TEST SCENARIOS\nList 10 specific test cases with:\n- Precondition\n- Action\n- Expected error\n- Expected recovery'
            },
            {
                title: '✍️ UX Copywriter',
                description: 'Generate clear, human-centered microcopy that guides users and reduces confusion.',
                prompt_template: 'ROLE: You are a UX writer specializing in clear, helpful microcopy.\n\nINPUT:\n- Context: [WHERE THIS COPY APPEARS]\n- User Action: [WHAT USER IS TRYING TO DO]\n- Current Copy (if any): [EXISTING TEXT]\n- Tone: [e.g., Friendly, Professional, Playful]\n- Constraints: [CHARACTER LIMITS, BRAND GUIDELINES]\n\nTASK: Create effective UX copy:\n\n## COPY NEEDS ANALYSIS\n- User mindset at this moment\n- What they need to know\n- What action they should take\n- Potential confusion points\n\n## OPTIONS (5 Variations)\n\n**Option 1: Direct & Clear**\n[Copy] - [Character count]\n\n**Option 2: Friendly & Conversational**\n[Copy] - [Character count]\n\n**Option 3: Action-Oriented**\n[Copy] - [Character count]\n\n**Option 4: Reassuring**\n[Copy] - [Character count]\n\n**Option 5: Minimal**\n[Copy] - [Character count]\n\n## ERROR MESSAGE VARIATIONS (if applicable)\n\n**Technical Error:**\n[What went wrong + what to do]\n\n**Validation Error:**\n[What is wrong + how to fix]\n\n**System Error:**\n[Apology + next steps]\n\n## BUTTON/CTA OPTIONS\n- Primary action label\n- Secondary action label\n- Cancel/dismiss label\n\n## RECOMMENDED COPY\n[Best option with rationale]'
            },
            {
                title: '♿ Accessibility Auditor',
                description: 'Review designs for accessibility issues and get actionable fixes for WCAG compliance.',
                prompt_template: 'ROLE: You are an accessibility specialist auditing designs for WCAG 2.1 AA compliance.\n\nINPUT:\n- Component Name: [e.g., "Date Picker", "Navigation Menu"]\n- Component Description: [WHAT IT DOES]\n- Visual Layout: [DESCRIBE OR PASTE IMAGE URL]\n- Interaction Flow: [HOW USERS INTERACT]\n- Color Values: [HEX CODES USED]\n\nTASK: Conduct accessibility audit:\n\n## PERCEIVABLE (Can users perceive it?)\n\n**Color & Contrast**\n- Current contrast ratios\n- Issues identified\n- Suggested fixes with new hex codes\n\n**Text Alternatives**\n- Images need alt text?\n- Icons need labels?\n- Complex visuals need descriptions?\n\n**Adaptable**\n- Does it work at 200% zoom?\n- Mobile responsive considerations\n- Screen reader compatibility\n\n## OPERABLE (Can users operate it?)\n\n**Keyboard Navigation**\n- Tab order logic\n- Focus indicators needed\n- Keyboard shortcuts\n- Skip links\n\n**Timing & Movement**\n- Any time limits? (need extensions)\n- Auto-playing content? (need pause)\n- Animations? (respect prefers-reduced-motion)\n\n**Input Modalities**\n- Touch target sizes (min 44x44px)\n- Gesture alternatives\n- Pointer cancellation\n\n## UNDERSTANDABLE (Can users understand it?)\n\n**Readable**\n- Language identification\n- Unusual words explained\n- Abbreviations expanded\n\n**Predictable**\n- Consistent navigation\n- Consistent component behavior\n- Error prevention\n\n**Input Assistance**\n- Error identification\n- Error suggestions\n- Labels and instructions\n\n## ROBUST (Does it work with assistive tech?)\n- ARIA labels needed\n- Role attributes\n- State management\n- Screen reader testing notes\n\n## PRIORITY FIXES\n1. **Critical** (Blocks users) - [Fix]\n2. **High** (Major barrier) - [Fix]\n3. **Medium** (Friction) - [Fix]\n4. **Low** (Nice to have) - [Fix]\n\n## IMPLEMENTATION CHECKLIST\n- [ ] Fix 1\n- [ ] Fix 2\n- [ ] Test with screen reader\n- [ ] Test keyboard-only navigation\n- [ ] Run automated accessibility scan'
            },
            {
                title: '🎨 Color Palette Generator',
                description: 'Create emotionally resonant color schemes with psychology-backed rationale and accessible combinations.',
                prompt_template: 'ROLE: You are a color psychologist and UI designer creating purposeful color palettes.\n\nINPUT:\n- Product Type: [e.g., Fintech, Healthcare, Gaming]\n- Target Emotions: [e.g., Trustworthy, Energetic, Calm]\n- Brand Personality: [e.g., Professional, Playful, Luxurious]\n- Usage Context: [e.g., Dashboard, Marketing, Mobile App]\n- Existing Brand Colors (if any): [HEX CODES]\n\nTASK: Design a comprehensive color system:\n\n## EMOTIONAL ANALYSIS\n- What emotions should the palette evoke?\n- Cultural considerations\n- Industry color norms\n- How to differentiate from competitors\n\n## PRIMARY PALETTE\n\n**Main Brand Color**\n- Hex: #______\n- RGB: ___, ___, ___\n- Psychology: [Why this color]\n- Usage: [Where to use it]\n\n**Secondary Color**\n- Hex: #______\n- Psychology: [Complementary role]\n- Usage: [Supporting elements]\n\n**Accent Color**\n- Hex: #______\n- Psychology: [Call-to-action energy]\n- Usage: [CTAs, highlights]\n\n## NEUTRAL PALETTE\n\n**Text Colors**\n- Primary text: #______ (contrast ratio: ___:1)\n- Secondary text: #______\n- Disabled text: #______\n\n**Background Colors**\n- Primary background: #______\n- Secondary background: #______\n- Card/Surface: #______\n\n**Border/Divider Colors**\n- Default border: #______\n- Hover border: #______\n- Focus ring: #______\n\n## SEMANTIC COLORS\n\n**Success**\n- Hex: #______\n- Usage: Success states, confirmations\n\n**Warning**\n- Hex: #______\n- Usage: Caution, non-blocking issues\n\n**Error**\n- Hex: #______\n- Usage: Errors, destructive actions\n\n**Info**\n- Hex: #______\n- Usage: Tips, neutral information\n\n## ACCESSIBILITY CHECK\n- All text meets WCAG AA (4.5:1 minimum)\n- Interactive elements meet 3:1 minimum\n- Color-blind friendly combinations\n- Dark mode considerations\n\n## USAGE EXAMPLES\nShow the palette applied to:\n- Primary button\n- Secondary button\n- Card component\n- Form input\n- Alert/notification\n\n## CSS VARIABLES\n:root {\n  --color-primary: #______;\n  --color-secondary: #______;\n  /* etc */\n}'
            }
        ],
        success_metrics: [
            'System Usability Scale (SUS) Score',
            'Time on Task',
            'Task Completion Rate (Success Rate)',
            'Error Rate'
        ],
        failure_modes: [
            {
                problem: 'Dribbblisation of Design',
                avoidance: 'Design for real data and real constraints, not just for the "pretty picture".'
            },
            {
                problem: 'Designing for Yourself',
                avoidance: 'You are not the user. Test early and often.'
            },
            {
                problem: 'Inconsistent Patterns',
                avoidance: 'Invest in a Design System early to scale consistency.'
            }
        ]
    },
    development: {
        id: 'development',
        label: 'Development',
        definition: 'Development is where designs become reality. This stage focuses on technical planning, engineering collaboration, and actually building the product.',
        objectives: [
            'Translate designs into working software',
            'Maintain code quality and technical health',
            'Manage technical debt strategically',
            'Collaborate effectively with engineering',
            'Ship incrementally and iteratively'
        ],
        tools: [
            'GitHub',
            'GitLab',
            'Linear',
            'Jira',
            'Postman',
            'Sentry',
            'Datadog',
            'New Relic'
        ],
        frameworks: [
            'Agile / Scrum / Kanban',
            'CI/CD (Continuous Integration/Deployment)',
            'TDD (Test Driven Development)',
            '12-Factor App methodology'
        ],
        ai_workflows: [
            {
                title: '📝 User Story Generator',
                description: 'Converts feature requirements into structured user stories with acceptance criteria.',
                prompt_template: `ROLE: You are an experienced product manager and agile coach specializing in writing clear, actionable user stories.

INPUT:
- Feature/Requirement Description: [DESCRIBE THE FEATURE OR REQUIREMENT]
- User Type: [WHO IS THIS FOR? e.g., "Premium subscribers", "Admin users"]
- Business Value: [WHY ARE WE BUILDING THIS?]
- Technical Constraints: [ANY KNOWN LIMITATIONS?]

TASK: Break this down into comprehensive user stories:

## EPIC OVERVIEW
**Epic Name:** [Short, descriptive name]
**Epic Goal:** [One sentence describing the outcome]
**Success Criteria:** [How we know the epic is complete]

## USER STORIES

### Story 1: [Core Functionality]
**User Story:**
As a [user type], I want to [action], so that [benefit].

**Acceptance Criteria:**
- [ ] Criterion 1: [Specific, testable condition]
- [ ] Criterion 2: [Specific, testable condition]
- [ ] Criterion 3: [Specific, testable condition]
- [ ] Criterion 4: [Specific, testable condition]

**Edge Cases:**
- Edge case 1: [What could go wrong?]
- Edge case 2: [Unusual user behavior]
- Edge case 3: [System failure scenario]

**Story Points:** [1/2/3/5/8/13] - Rationale: [Why this estimate?]

### Story 2: [Next Functionality]
[Same structure as above]

### Story 3: [Additional Functionality if needed]
[Same structure as above]

## TECHNICAL NOTES
- Dependencies: [What must be done first?]
- API Changes Needed: [Yes/No - details if yes]
- Database Changes: [Yes/No - details if yes]
- Third-party Integrations: [Any external services?]

## TESTING CONSIDERATIONS
- Unit test requirements
- Integration test scenarios
- QA acceptance criteria

## DEFINITION OF DONE
- [ ] Code reviewed and approved
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Deployed to staging
- [ ] QA sign-off`
            },
            {
                title: '📋 Technical Spec Drafter',
                description: 'Drafts comprehensive technical specifications including API contracts and data models.',
                prompt_template: `ROLE: You are a senior technical architect and engineering lead creating detailed technical specifications.

INPUT:
- Feature Name: [FEATURE NAME]
- Feature Description: [WHAT DOES THIS DO?]
- Business Requirements: [KEY REQUIREMENTS]
- User Stories: [LINK TO STORIES IF AVAILABLE]
- Performance Requirements: [LATENCY, THROUGHPUT, SCALE]
- Security Requirements: [AUTH, ENCRYPTION, COMPLIANCE]

TASK: Create a comprehensive technical specification:

## 1. OVERVIEW
**Feature:** [Name]
**Status:** [Draft/Review/Approved]
**Owner:** [Tech Lead Name]
**Stakeholders:** [PM, Design, QA, etc.]

## 2. GOALS & NON-GOALS

### Goals
- Goal 1: [What we WILL build]
- Goal 2: [What we WILL build]

### Non-Goals (Out of Scope)
- Non-goal 1: [What we will NOT build]
- Non-goal 2: [What we will NOT build]

## 3. TECHNICAL APPROACH

### Architecture Overview
[High-level diagram description or actual diagram link]

### Key Components
1. **Component A:** [Description and responsibility]
2. **Component B:** [Description and responsibility]
3. **Component C:** [Description and responsibility]

### Design Decisions
| Decision | Options Considered | Rationale |
|----------|-------------------|-----------|
| [Decision 1] | Option A, Option B | [Why we chose this] |
| [Decision 2] | Option A, Option B | [Why we chose this] |

## 4. API SPECIFICATION

### Endpoints

#### POST /api/v1/[resource]
**Description:** [What this does]

**Request:**
\`\`\`json
{
  "field1": "type - description",
  "field2": "type - description"
}
\`\`\`

**Response (200 OK):**
\`\`\`json
{
  "id": "string",
  "field1": "type",
  "created_at": "ISO timestamp"
}
\`\`\`

**Error Responses:**
- 400: [Bad Request - when this happens]
- 401: [Unauthorized]
- 500: [Server Error]

### Rate Limiting
- [Limits and handling]

### Authentication
- [Auth method required]

## 5. DATA MODEL

### Database Schema

\`\`\`sql
CREATE TABLE [table_name] (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  field1 VARCHAR(255) NOT NULL,
  field2 INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

### Indexes
- Index 1: [Field(s)] - [Reason]
- Index 2: [Field(s)] - [Reason]

### Data Migration Strategy
- [How to migrate existing data if needed]

## 6. TESTING STRATEGY

### Unit Tests
- [What to test at unit level]
- Target coverage: [X%]

### Integration Tests
- [Key integration scenarios]

### Load Tests
- [Performance benchmarks]

### E2E Tests
- [Critical user journeys]

## 7. ROLLOUT PLAN

### Phase 1: [Internal/Dogfooding]
- [What happens in this phase]
- [Success criteria]

### Phase 2: [Beta/Early Access]
- [What happens in this phase]
- [Success criteria]

### Phase 3: [General Availability]
- [What happens in this phase]
- [Rollback plan]

## 8. MONITORING & ALERTING

### Key Metrics
- Metric 1: [What to track]
- Metric 2: [What to track]

### Alerts
- Alert 1: [Condition and severity]
- Alert 2: [Condition and severity]

## 9. SECURITY CONSIDERATIONS
- [Security checklist items]
- [Compliance requirements]

## 10. OPEN QUESTIONS
- [Questions that need answers before implementation]`
            },
            {
                title: '🚀 Release Notes Generator',
                description: 'Summarizes commits and changes into user-friendly release notes.',
                prompt_template: `ROLE: You are a product marketing manager creating compelling, user-focused release notes.

INPUT:
- Version Number: [e.g., "v2.4.0"]
- Release Date: [DATE]
- Commit Messages: [LIST OF COMMITS]
- PR Descriptions: [LIST OF PRS IF AVAILABLE]
- User Impact Areas: [WHICH USER SEGMENTS ARE AFFECTED?]
- Known Issues: [ANY BUGS OR LIMITATIONS?]

TASK: Create comprehensive release notes:

## RELEASE OVERVIEW
**Version:** [Number]
**Release Date:** [Date]
**Release Type:** [Major/Minor/Patch/Hotfix]

### TL;DR
[2-3 sentence summary of the most important changes]

---

## 🎉 NEW FEATURES

### Feature 1: [Feature Name]
**What:** [Clear description of what this does]
**Why:** [Why users should care]
**How to Use:** [Brief instructions]
**Who Benefits:** [User segment]

### Feature 2: [Feature Name]
[Same structure]

---

## 🔧 IMPROVEMENTS

### Improvement 1: [Area Improved]
**Before:** [What was the pain point?]
**After:** [What's better now?]
**Impact:** [Quantify if possible - "50% faster", "30% less clicks"]

### Improvement 2: [Area Improved]
[Same structure]

---

## 🐛 BUG FIXES

### Fix 1: [Issue Fixed]
**Issue:** [Description of the bug]
**Resolution:** [How it was fixed]
**Affected Users:** [Who experienced this]

### Fix 2: [Issue Fixed]
[Same structure]

---

## ⚡ PERFORMANCE
- [Any performance improvements]
- [Load time changes]
- [Resource usage changes]

## 🔒 SECURITY
- [Security updates if any]
- [Compliance updates if any]

## 📱 PLATFORM UPDATES
- [iOS/Android specific updates]
- [Browser compatibility changes]

## ⚠️ DEPRECATIONS & BREAKING CHANGES
- [Features being deprecated]
- [Breaking changes with migration guide]

## 📝 ADDITIONAL NOTES
- [Any other important information]

## 🔗 RESOURCES
- Full Changelog: [Link]
- Documentation: [Link]
- Support: [Link]

---

## SOCIAL MEDIA POSTS

### Twitter/X Post
[280 character announcement]

### LinkedIn Post
[Professional announcement with hashtags]

### Email Subject Line Options
1. [Option 1]
2. [Option 2]
3. [Option 3]`
            },
            {
                title: '💳 Technical Debt Tracker',
                description: 'Identifies, prioritizes, and creates action plans for technical debt.',
                prompt_template: `ROLE: You are a technical program manager specializing in engineering excellence and technical debt management.

INPUT:
- Code Quality Reports: [SONARQUBE, CODECOV, ETC.]
- Performance Metrics: [LATENCY, ERROR RATES]
- Developer Feedback: [PAIN POINTS FROM TEAM]
- System Architecture Review: [AREAS OF CONCERN]
- Incident History: [PAST OUTAGES OR BUGS]
- Refactoring Opportunities: [KNOWN ISSUES]

TASK: Create a comprehensive technical debt assessment:

## EXECUTIVE SUMMARY
**Overall Debt Level:** [Low/Medium/High/Critical]
**Estimated Remediation Cost:** [Engineering weeks/days]
**Risk Level:** [Low/Medium/High]
**Recommended Investment:** [% of sprint capacity]

---

## DEBT INVENTORY

### Critical Priority (Fix Immediately)

#### Debt Item 1: [Name]
**Category:** [Code Complexity/Performance/Security/Architecture/Test Coverage]
**Location:** [File/module/service]
**Description:** [What's wrong?]
**Impact:** [How this affects the system]
**Risk if Not Fixed:** [What could go wrong]
**Effort to Fix:** [Story points or days]
**Suggested Approach:** [How to fix it]
**Owner:** [Team or individual]

#### Debt Item 2: [Name]
[Same structure]

### High Priority (Fix This Quarter)

#### Debt Item 3: [Name]
[Same structure]

#### Debt Item 4: [Name]
[Same structure]

### Medium Priority (Fix Next Quarter)

#### Debt Item 5: [Name]
[Same structure]

---

## DEBT CATEGORIES BREAKDOWN

### Code Quality Issues
- [List issues and counts]
- [Trend over time]

### Performance Debt
- [Slow queries, inefficient algorithms]
- [Resource utilization issues]

### Architecture Debt
- [Monolithic components needing separation]
- [Outdated patterns]

### Test Debt
- [Missing test coverage areas]
- [Flaky tests to fix]

### Documentation Debt
- [Outdated docs]
- [Missing runbooks]

---

## ROI ANALYSIS

### Cost of Inaction
- [Quantify the ongoing cost]
- [Developer productivity impact]
- [Incident risk]

### Benefits of Fixing
- [Performance gains]
- [Developer velocity improvement]
- [Reliability improvements]

---

## REMEDIATION ROADMAP

### Sprint [X] - [Date Range]
- [ ] Task 1
- [ ] Task 2

### Sprint [X+1] - [Date Range]
- [ ] Task 3
- [ ] Task 4

### Q[X] Goals
- [Goal 1]
- [Goal 2]

---

## PREVENTION STRATEGIES
- [Code review checklist updates]
- [CI/CD improvements]
- [Engineering standards]
- [Training needs]

---

## MONITORING & SUCCESS METRICS
- [How we'll measure improvement]
- [Target metrics]
- [Review cadence]`
            }
        ],
        success_metrics: [
            'Sprint Velocity',
            'Cycle Time (Start to Deploy)',
            'Bug Escape Rate',
            'Uptime / Availability (SLA)'
        ],
        failure_modes: [
            {
                problem: 'Building Without Planning',
                avoidance: 'Write specs before writing code. "Measure twice, cut once".'
            },
            {
                problem: 'Scope Creep',
                avoidance: 'Lock scope for the sprint. Put new ideas in the backlog.'
            },
            {
                problem: 'Premature Optimization',
                avoidance: 'Build for current scale. Make it work, then make it fast.'
            }
        ]
    },
    launch: {
        id: 'launch',
        label: 'Launch',
        definition: 'Launch is about bringing your product to market successfully. It encompasses go-to-market strategy, messaging, initial user acquisition, and ensuring a smooth first experience.',
        objectives: [
            'Define go-to-market strategy',
            'Craft compelling positioning and messaging',
            'Coordinate cross-functional launch activities',
            'Acquire initial users',
            'Monitor launch success'
        ],
        tools: [
            'Product Hunt',
            'Intercom',
            'Help Scout',
            'Mailchimp',
            'ConvertKit',
            'Buffer'
        ],
        frameworks: [
            'The Launch Checklist',
            'Press Release FAQ (PR/FAQ - Amazon style)',
            'Product Launch Tiers (Tier 1 vs Tier 3)',
            'Crossing the Chasm (Early Adopters -> Mainstream)'
        ],
        ai_workflows: [
            {
                title: '📅 Launch Plan Generator',
                description: 'Creates a comprehensive launch timeline with tasks, owners, and critical path identification.',
                prompt_template: `ROLE: You are a seasoned product launch manager who has orchestrated dozens of successful product launches.

INPUT:
- Product Name: [PRODUCT NAME]
- Launch Date: [TARGET DATE]
- Product Type: [B2B/B2C/Mobile/Web/Feature]
- Launch Tier: [Tier 1 (Major) / Tier 2 (Significant) / Tier 3 (Minor)]
- Target Audience: [WHO ARE WE LAUNCHING TO?]
- Key Features: [MAIN VALUE PROPS]
- Team Size: [APPROXIMATE TEAM SIZE]
- Previous Launch Experience: [FIRST TIME / EXPERIENCED]

TASK: Create a comprehensive launch plan:

## LAUNCH OVERVIEW
**Product:** [Name]
**Launch Date:** [Date]
**Launch Tier:** [Tier]
**Launch Type:** [Public Beta / General Availability / Feature Release]
**Success Criteria:** [How we know it succeeded]

## WORKING BACKWARD TIMELINE

### T-8 Weeks: Strategy & Planning
**Week 1-2 Tasks:**
- [ ] Finalize positioning and messaging (Owner: PM)
- [ ] Define launch tier and scope (Owner: PM + Leadership)
- [ ] Identify key stakeholders and RACI (Owner: PM)
- [ ] Budget approval and resource allocation (Owner: Finance/Leadership)
- [ ] Competitive analysis refresh (Owner: PMM)

**Deliverables:**
- Launch brief document
- Approved budget
- Stakeholder alignment

### T-6 Weeks: Content Creation
**Week 3-4 Tasks:**
- [ ] Draft all marketing copy (Owner: Content)
- [ ] Design launch assets (Owner: Design)
- [ ] Create product demo/video (Owner: Product/Design)
- [ ] Draft press release (Owner: PR)
- [ ] Prepare sales enablement materials (Owner: Sales Enablement)

**Deliverables:**
- Marketing copy deck
- Visual assets library
- Demo script and recording
- Press release draft

### T-4 Weeks: Technical Preparation
**Week 5-6 Tasks:**
- [ ] Feature complete and code freeze (Owner: Engineering)
- [ ] QA and bug fixing (Owner: QA)
- [ ] Performance testing (Owner: Engineering)
- [ ] Security review (Owner: Security)
- [ ] Documentation complete (Owner: Tech Writing)

**Deliverables:**
- Release candidate build
- QA sign-off
- Performance benchmarks
- Security clearance

### T-2 Weeks: Go-to-Market Prep
**Week 7 Tasks:**
- [ ] Sales team training (Owner: Sales Enablement)
- [ ] Support team training (Owner: Support)
- [ ] Beta user feedback synthesis (Owner: PM)
- [ ] Launch email sequences built (Owner: Marketing Ops)
- [ ] Landing pages live (Owner: Web Dev)

**Deliverables:**
- Training completion certificates
- FAQ document
- Email campaigns ready
- Live landing pages

### T-1 Week: Final Preparations
**Week 8 Tasks:**
- [ ] All-hands launch briefing (Owner: PM)
- [ ] Press embargo coordination (Owner: PR)
- [ ] Influencer/beta user coordination (Owner: Community)
- [ ] Monitoring dashboards ready (Owner: Engineering)
- [ ] Rollback plan finalized (Owner: Engineering)

**Deliverables:**
- Launch day runbook
- Monitoring setup
- Communication plan

### Launch Day (T-0)
**Morning (Launch - 4 hours):**
- [ ] Final smoke tests (Owner: QA)
- [ ] Feature flags enabled (Owner: Engineering)
- [ ] Announcement posts scheduled (Owner: Social)
- [ ] Press release distributed (Owner: PR)
- [ ] Team war room active (Owner: PM)

**Launch Time:**
- [ ] Go/No-Go decision (Owner: Launch Lead)
- [ ] Launch announcement (Owner: CEO/PM)
- [ ] Social media blitz (Owner: Marketing)
- [ ] Email campaigns sent (Owner: Marketing Ops)

**Post-Launch (First 4 hours):**
- [ ] Monitor metrics dashboard (Owner: Data)
- [ ] Watch for critical bugs (Owner: Engineering)
- [ ] Respond to social mentions (Owner: Community)
- [ ] Support ticket triage (Owner: Support)

## CRITICAL PATH ITEMS
⚠️ **These MUST be completed on time or launch is at risk:**
1. [Critical item 1]
2. [Critical item 2]
3. [Critical item 3]

## RISK MITIGATION
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Strategy] |

## LAUNCH DAY CHECKLIST
- [ ] All systems green
- [ ] Team in war room/available
- [ ] Rollback plan tested
- [ ] Communications ready
- [ ] Monitoring active

## POST-LAUNCH FOLLOW-UP
**Week 1:**
- Daily standups
- Metrics review
- Bug triage

**Week 2-4:**
- Retrospective
- Success metrics analysis
- Iterate based on feedback`
            },
            {
                title: '🎯 Positioning & Messaging Generator',
                description: 'Crafts compelling positioning statements, messaging pillars, and proof points.',
                prompt_template: `ROLE: You are an expert product marketer who specializes in creating compelling positioning and messaging that resonates with target audiences.

INPUT:
- Product Name: [PRODUCT NAME]
- Product Description: [WHAT DOES IT DO?]
- Target Audience: [WHO IS THE PRIMARY USER?]
- Key Features: [TOP 3-5 FEATURES]
- Key Benefits: [WHAT OUTCOMES DOES IT DELIVER?]
- Competitive Landscape: [MAIN COMPETITORS]
- Unique Differentiators: [WHAT MAKES YOU DIFFERENT?]
- Brand Voice: [TONE - e.g., Professional, Playful, Technical]

TASK: Create comprehensive positioning and messaging:

## POSITIONING STATEMENT

### Classic Format
For [target customer]
Who [statement of need or opportunity]
[Product Name] is a [product category]
That [key benefit/reason to buy]
Unlike [primary competitive alternative]
Our product [primary differentiation]

### Alternative Format (Short)
[Product Name] helps [target audience] [achieve key benefit] by [unique approach].

## MESSAGING PILLARS

### Pillar 1: [Theme - e.g., "Ease of Use"]
**Headline:** [Short, punchy statement]
**Supporting Copy:** [2-3 sentences expanding on the benefit]
**Proof Points:**
- [Specific feature or capability]
- [Customer outcome or metric]
- [Comparison to alternative]

**Use Cases:**
- [When to use this message]
- [Audience segment this resonates with]

### Pillar 2: [Theme - e.g., "Power & Flexibility"]
[Same structure]

### Pillar 3: [Theme - e.g., "Security & Trust"]
[Same structure]

## VALUE PROPOSITION OPTIONS

### Option 1: Feature-Focused
[Emphasizes capabilities]

### Option 2: Benefit-Focused
[Emphasizes outcomes]

### Option 3: Emotional
[Emphasizes feelings/status]

### Option 4: Competitive
[Emphasizes differentiation]

## ELEVATOR PITCHES

### 15-Second Version
[Ultra-concise for quick intros]

### 30-Second Version
[Standard elevator pitch]

### 60-Second Version
[More detailed for interested prospects]

## MESSAGING BY AUDIENCE

### For Executives/C-Suite
**Focus:** [Business outcomes, ROI]
**Key Message:** [What to emphasize]
**Proof Points:** [Relevant metrics/case studies]

### For End Users
**Focus:** [Daily experience, pain relief]
**Key Message:** [What to emphasize]
**Proof Points:** [Ease of use, time savings]

### For Technical Buyers
**Focus:** [Architecture, integrations, security]
**Key Message:** [What to emphasize]
**Proof Points:** [Technical specs, compliance]

## TAGLINE OPTIONS
1. [Option 1]
2. [Option 2]
3. [Option 3]
4. [Option 4]

## MESSAGING DO'S AND DON'TS

### DO
- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

### DON'T
- [Pitfall 1]
- [Pitfall 2]
- [Pitfall 3]

## TESTING RECOMMENDATIONS
- [How to validate this messaging]
- [A/B test ideas]
- [Feedback collection methods]`
            },
            {
                title: '✍️ Launch Content Generator',
                description: 'Creates launch announcements, blog posts, social media content, and email campaigns.',
                prompt_template: `ROLE: You are a creative content strategist and copywriter specializing in product launches that generate buzz and drive action.

INPUT:
- Product Name: [PRODUCT NAME]
- Launch Type: [NEW PRODUCT / MAJOR UPDATE / FEATURE]
- Key Features: [TOP FEATURES TO HIGHLIGHT]
- Target Audience: [WHO ARE WE TALKING TO?]
- Brand Voice: [TONE - e.g., Bold, Friendly, Professional]
- Launch Angle: [THE BIG STORY - e.g., "First to market", "Solves X problem"]
- Call to Action: [WHAT DO WE WANT THEM TO DO?]
- Visual Assets: [WHAT IMAGES/VIDEOS ARE AVAILABLE?]

TASK: Create a complete content package for launch:

## 📝 BLOG POST

### Title Options
1. [Catchy, benefit-focused title]
2. [Alternative angle]
3. [Third option]

### Recommended Title
[Best option with rationale]

### Blog Post Structure

**Introduction (Hook)**
[2-3 paragraphs that grab attention and establish the problem]

**The Solution**
[Introduce the product as the answer]

**Key Features Deep Dive**
1. **Feature 1: [Name]**
   - What it does
   - Why it matters
   - User benefit

2. **Feature 2: [Name]**
   [Same structure]

3. **Feature 3: [Name]**
   [Same structure]

**Real-World Impact**
[How this changes things for users]
[Include use cases or scenarios]

**Looking Ahead**
[What's next on the roadmap]
[Vision for the future]

**Call to Action**
[Clear next step for readers]

**Meta Description**
[155 characters for SEO]

---

## 🐦 SOCIAL MEDIA CONTENT

### Twitter/X Thread (8-10 tweets)

**Tweet 1 (Hook):**
[Attention-grabbing opening]

**Tweet 2 (Problem):**
[The pain point we solve]

**Tweet 3 (Solution Intro):**
[Introducing the product]

**Tweet 4-7 (Features):**
[One feature per tweet with visual description]

**Tweet 8 (Social Proof):**
[Early user quote or metric]

**Tweet 9 (CTA):**
[Call to action with link]

**Tweet 10 (Engagement):**
[Question to drive replies]

### LinkedIn Post
[Professional, longer-form announcement suitable for LinkedIn]

### Instagram Caption
[Visual-focused with hashtags]

### TikTok/Short-form Video Script
[Hook (0-3 sec)]
[Problem setup (3-10 sec)]
[Solution reveal (10-20 sec)]
[CTA (20-30 sec)]

---

## 📧 EMAIL CAMPAIGNS

### Email 1: Teaser (1 week before)
**Subject Line Options:**
1. [Curiosity-driven]
2. [Benefit-driven]
3. [FOMO-driven]

**Preview Text:** [Supporting copy]

**Body:**
[Teaser content building anticipation]
[Waitlist or early access CTA]

### Email 2: Launch Day
**Subject Line:** [Exciting announcement]

**Body:**
[It's here!]
[Key benefits]
[Strong CTA button]

### Email 3: Follow-up (3 days after)
**Subject Line:** [Reminder/social proof]

**Body:**
[Early traction metrics]
[User quotes]
[Final CTA]

---

## 🎥 VIDEO SCRIPTS

### 30-Second Product Video
**Visual:** [What shows on screen]
**Audio/Voiceover:** [What is said]
**Text on Screen:** [Key phrases]

### 2-Minute Demo Video
**Intro (0:15):**
[Hook and problem statement]

**Demo (1:00):**
[Walkthrough of key features]

**Outro (0:45):**
[Benefits recap and CTA]

---

## 📱 PRODUCT HUNT LAUNCH

### Tagline
[60 characters max]

### Description
[260 characters max]

### First Comment (Maker Story)
[Personal story about building the product]
[What makes it different]
[Ask for feedback]

### Gallery Captions
[Descriptions for each screenshot/video]

---

## 📰 PRESS RELEASE (Optional)

### Headline
[Newsworthy, benefit-focused]

### Subheadline
[Additional context]

### Lead Paragraph
[Who, what, when, where, why]

### Body Paragraphs
[Feature details]
[Quotes from leadership]
[Customer use case]

### Boilerplate
[Company description]

### Contact Info
[Media contact]`
            },
            {
                title: '❓ Launch FAQ Generator',
                description: 'Anticipates user questions and creates comprehensive FAQ content for support and sales.',
                prompt_template: `ROLE: You are a customer success expert who anticipates every possible question users might have about a new product or feature.

INPUT:
- Product Name: [PRODUCT NAME]
- Product Description: [WHAT DOES IT DO?]
- Key Features: [MAIN CAPABILITIES]
- Pricing Model: [FREE/PAID/SUBSCRIPTION/ENTERPRISE]
- Target Users: [WHO IS THIS FOR?]
- Technical Requirements: [SYSTEM REQUIREMENTS]
- Migration Path: [FROM OLD VERSION OR COMPETITOR?]
- Known Limitations: [WHAT DOESN'T IT DO YET?]
- Support Channels: [HOW TO GET HELP]

TASK: Create a comprehensive FAQ document:

## PRODUCT BASICS

### What is [Product Name]?
[Clear, jargon-free explanation]

### Who is [Product Name] for?
[Ideal user profiles]
[Who should NOT use it]

### How is this different from [Competitor/Old Version]?
[Key differentiators]
[Migration benefits if applicable]

### Is there a free trial or demo?
[Availability and how to access]
[What's included in trial]

## GETTING STARTED

### How do I get started?
[Step-by-step onboarding]
[Time to first value]

### What do I need to use [Product Name]?
[Technical requirements]
[Account/prerequisites]

### How long does setup take?
[Time estimates]
[What affects setup time]

### Is there onboarding support?
[Available resources]
[Human support options]

## FEATURES & FUNCTIONALITY

### What features are included?
[Feature overview by category]
[What's in each pricing tier if applicable]

### Can I [specific action]? (Generate 5-10 based on features)
[Yes/No with explanation]
[How to do it if yes]

### Are there any limitations?
[Current limitations]
[Workarounds if available]
[Roadmap for addressing]

### How does [Key Feature] work?
[Detailed explanation]
[Use case example]

## PRICING & BILLING

### How much does it cost?
[Pricing tiers]
[What's included in each]

### Is there a free plan?
[Free tier details]
[Limitations]

### How do I upgrade/downgrade?
[Process explanation]
[What happens to data]

### What payment methods do you accept?
[Payment options]
[Currency support]

### Can I get a refund?
[Refund policy]
[Timeframes]

## TECHNICAL QUESTIONS

### What platforms/browsers are supported?
[Compatibility list]
[Mobile support details]

### Is my data secure?
[Security measures]
[Compliance certifications]
[Data handling practices]

### Can I integrate with [Tool]?
[Integration availability]
[How to set up]
[API access if applicable]

### What happens if something goes wrong?
[Error handling]
[Support process]
[SLA if applicable]

### Do you have an API?
[API availability]
[Documentation link]
[Pricing for API access]

## DATA & PRIVACY

### Where is my data stored?
[Data location]
[Geographic options if available]

### Can I export my data?
[Export capabilities]
[Formats available]

### Who owns my data?
[Data ownership policy]
[Rights and permissions]

### Is it GDPR/CCPA compliant?
[Compliance status]
[Privacy features]

## MIGRATION & SWITCHING

### How do I switch from [Competitor]? (If applicable)
[Migration process]
[Data import options]
[Support available]

### Will I lose my existing data?
[Data preservation]
[Migration guarantees]

### How long does migration take?
[Time estimates]
[Downtime if any]

## SUPPORT & RESOURCES

### How do I get help?
[Support channels]
[Response times]
[Priority support options]

### Is there documentation?
[Available resources]
[Links to guides/tutorials]

### Do you offer training?
[Training options]
[Self-serve vs. live]

### How do I report a bug?
[Bug reporting process]
[What info to include]

## TROUBLESHOOTING

### I can't [common issue]. What should I do?
[Step-by-step troubleshooting]
[When to contact support]

### Why is [feature] not working?
[Common causes]
[Solutions to try]

### I'm getting an error message. What does it mean?
[Common errors and fixes]

## ROADMAP & FUTURE

### What's on the roadmap?
[Upcoming features]
[Timeline if available]

### Can I request a feature?
[Feedback process]
[How to submit ideas]

### How often do you release updates?
[Release cadence]
[Update process]

## SALES & ENTERPRISE

### Do you offer enterprise pricing?
[Enterprise options]
[How to inquire]

### Can I schedule a demo?
[Demo availability]
[How to book]

### Do you offer custom implementations?
[Professional services]
[What's included]

---

## INTERNAL FAQ (For Sales/Support Teams)

### Competitive Responses
**When prospect says "[Competitor] is cheaper"**
[Response framework]

**When prospect says "We already use [Alternative]"**
[Response framework]

### Objection Handling
**"It's too expensive"**
[Value-based response]
[ROI talking points]

**"We don't have time to implement"**
[Ease of use points]
[Quick win examples]

**"We're waiting for [Feature]"**
[Timeline if known]
[Workaround suggestions]
[Interim value proposition]`
            }
        ],
        success_metrics: [
            'Launch Day Signups/Traffic',
            'Activation Rate',
            'Press/Social Mentions',
            'Customer Support Ticket Volume'
        ],
        failure_modes: [
            {
                problem: 'Launching Too Late',
                avoidance: 'If you aren\'t embarrassed by the first version, you launched too late. (Reid Hoffman)'
            },
            {
                problem: 'Launching to Crickets',
                avoidance: 'Build an audience before you build a product. "Build in public".'
            },
            {
                problem: 'Weak Positioning',
                avoidance: 'Test your messaging. If users don\'t "get it" in 5 seconds, fix the copy.'
            }
        ]
    },
    growth: {
        id: 'growth',
        label: 'Growth',
        definition: 'Growth is about scaling user acquisition, activation, and retention systematically. It combines product, marketing, and data to drive sustainable growth.',
        objectives: [
            'Acquire users efficiently (CAC)',
            'Activate new users (Aha Moment)',
            'Retain and engage users (LTV)',
            'Drive monetization',
            'Build viral loops'
        ],
        tools: [
            'Amplitude',
            'Mixpanel',
            'Segment',
            'Optimizely',
            'VWO',
            'Braze',
            'Customer.io'
        ],
        frameworks: [
            'AARRR Metrics (Acquisition, Activation, Retention, Referral, Revenue)',
            'Growth Loops (Acquisition Loops, Engagement Loops)',
            'North Star Metric',
            'Hook Model (Trigger, Action, Reward, Investment)'
        ],
        ai_workflows: [
            {
                title: '🧪 Growth Experiment Ideator',
                description: 'Brainstorms data-driven A/B test ideas with ICE scoring and implementation plans.',
                prompt_template: `ROLE: You are a growth product manager who specializes in designing high-impact experiments using the ICE (Impact, Confidence, Ease) framework.

INPUT:
- Funnel Stage: [ACQUISITION / ACTIVATION / RETENTION / REFERRAL / REVENUE]
- Current Metric Value: [e.g., "15% activation rate"]
- Target Metric Value: [e.g., "25% activation rate"]
- Biggest Drop-off Point: [WHERE ARE USERS LEAVING?]
- User Segment: [WHO ARE WE TARGETING?]
- Recent Insights: [QUALITATIVE OR QUANTITATIVE FINDINGS]
- Available Resources: [ENGINEERING, DESIGN, MARKETING BANDWIDTH]
- Past Experiments: [WHAT HAVE WE TRIED BEFORE?]

TASK: Generate comprehensive growth experiments:

## EXPERIMENT OPPORTUNITY ANALYSIS

### Funnel Context
**Stage:** [Name]
**Current Performance:** [Metric and value]
**Industry Benchmark:** [How we compare]
**Opportunity Size:** [Potential impact calculation]

### User Pain Points
1. [Pain point 1 - from research/data]
2. [Pain point 2 - from research/data]
3. [Pain point 3 - from research/data]

---

## EXPERIMENT IDEAS

### Experiment 1: [Name]
**Hypothesis:**
"We believe that [change] for [audience] will result in [outcome], as measured by [metric]."

**Problem:** [What user pain point does this address?]

**Solution:** [Detailed description of the experiment]

**ICE Score:**
- **Impact (1-10):** [Score] - [Rationale]
- **Confidence (1-10):** [Score] - [Rationale based on data/research]
- **Ease (1-10):** [Score] - [Effort required]
- **Total ICE Score:** [Sum/3]

**Success Metrics:**
- Primary: [Main metric to move]
- Secondary: [Supporting metrics]
- Guardrail: [Metrics that shouldn't degrade]

**Test Design:**
- **Control:** [Current experience]
- **Variant:** [New experience]
- **Sample Size:** [Required users per variant]
- **Duration:** [How long to run]
- **Traffic Split:** [e.g., 50/50]

**Implementation Notes:**
- [Technical requirements]
- [Design needs]
- [Dependencies]

**Expected Outcome:**
- Lift: [% improvement expected]
- Business Impact: [Revenue/users estimate]

---

### Experiment 2: [Name]
[Same structure]

### Experiment 3: [Name]
[Same structure]

### Experiment 4: [Name]
[Same structure]

### Experiment 5: [Name]
[Same structure]

---

## PRIORITIZED ROADMAP

### This Sprint (Quick Wins)
1. [Experiment with highest Ease score]
2. [Second quick win]

### Next 30 Days (High ICE)
1. [Highest ICE score experiment]
2. [Second highest]

### Next Quarter (Strategic)
1. [High Impact, lower Confidence - needs validation]
2. [High Impact, harder Ease - needs resources]

---

## EXPERIMENT DESIGN TEMPLATES

### A/B Test Template
- **Null Hypothesis:** [What we're testing against]
- **Minimum Detectable Effect:** [Smallest improvement that matters]
- **Statistical Significance:** [p-value threshold, usually 0.05]
- **Power:** [Usually 80%]

### Multivariate Test Template
- **Variables:** [What elements we're testing]
- **Combinations:** [Number of variants]
- **Traffic Requirements:** [Higher sample needed]

### Bandit Test Template
- **Exploration vs Exploitation:** [Balance strategy]
- **Auto-allocation:** [When to shift traffic]

---

## POST-EXPERIMENT PLAN

### Analysis Framework
- [How to analyze results]
- [Segmentation plan]
- [Qualitative follow-up]

### Next Steps by Outcome
**If Winner:**
- [Rollout plan]
- [Iterative experiments]

**If Loser:**
- [Learnings documentation]
- [Pivot ideas]

**If Inconclusive:**
- [Extend or iterate decision]

---

## EXPERIMENT TRACKER
| Experiment | Status | ICE | Start Date | End Date | Result | Action |
|------------|--------|-----|------------|----------|--------|--------|
| [Name] | [Planned/Running/Done] | [Score] | [Date] | [Date] | [Win/Loss/Inconclusive] | [Next step] |`
            },
            {
                title: '📊 Funnel Analyzer',
                description: 'Diagnoses friction points in conversion funnels with psychological and UX insights.',
                prompt_template: `ROLE: You are a conversion optimization expert who combines data analysis with behavioral psychology to identify and fix funnel leaks.

INPUT:
- Funnel Name: [e.g., "Free Trial Signup", "Checkout Flow"]
- Funnel Steps: [LIST EACH STEP WITH CONVERSION RATES]
- User Segment: [WHO IS GOING THROUGH THIS FUNNEL?]
- Device Breakdown: [MOBILE VS DESKTOP PERFORMANCE]
- Traffic Source: [WHERE ARE USERS COMING FROM?]
- Time Period: [DATA DATE RANGE]
- Recent Changes: [ANY UPDATES TO THE FUNNEL?]
- User Feedback: [QUALITATIVE INSIGHTS IF AVAILABLE]

TASK: Conduct comprehensive funnel analysis:

## FUNNEL OVERVIEW

### Funnel Map
| Step | Name | Users | Conversion | Drop-off | Time Spent |
|------|------|-------|------------|----------|------------|
| 1 | [Step name] | [Count] | [Rate] | [Rate] | [Duration] |
| 2 | [Step name] | [Count] | [Rate] | [Rate] | [Duration] |
| 3 | [Step name] | [Count] | [Rate] | [Rate] | [Duration] |

### Overall Metrics
- **Total Conversion Rate:** [%]
- **Industry Benchmark:** [%]
- **Gap to Benchmark:** [%]
- **Revenue Impact:** [If conversion improved to benchmark]

---

## BOTTLENECK IDENTIFICATION

### Primary Bottleneck: [Step X - Step Name]
**Severity:** [Critical/High/Medium]
**Conversion Loss:** [Number of users lost]
**Revenue Impact:** [Estimated $ loss]

#### Data Evidence
- [Specific metrics showing the problem]
- [Comparison to other steps]
- [Trend over time]

#### User Behavior Signals
- [Heatmap insights if available]
- [Session recording observations]
- [Rage clicks or error patterns]

---

## ROOT CAUSE ANALYSIS

### Psychological Barriers

#### 1. Cognitive Load
**Problem:** [Too much information/decisions]
**Evidence:** [Time on step, abandonment pattern]
**Solution Direction:** [Simplify, reduce fields, clearer CTAs]

#### 2. Trust Deficit
**Problem:** [Users don't feel safe proceeding]
**Evidence:** [Exit at payment/personal info steps]
**Solution Direction:** [Social proof, security badges, guarantees]

#### 3. Value Uncertainty
**Problem:** [Users unsure if worth continuing]
**Evidence:** [Drop at pricing/feature explanation]
**Solution Direction:** [Clearer value prop, testimonials, preview]

#### 4. Friction Points
**Problem:** [Too hard to complete]
**Evidence:** [Long time on step, back button usage]
**Solution Direction:** [Auto-fill, progress indicators, guest checkout]

#### 5. Anxiety/Fear
**Problem:** [Worries about commitment/cost]
**Evidence:** [Exit at final confirmation]
**Solution Direction:** [Risk reversal, clear cancellation, trial options]

### UX/UI Issues

#### 1. Layout Problems
- [Issue description]
- [Impact on conversion]
- [Recommended fix]

#### 2. Mobile Experience
- [Specific mobile friction points]
- [Comparison to desktop]
- [Mobile-specific fixes]

#### 3. Form/Input Issues
- [Field-specific problems]
- [Validation errors]
- [Input method improvements]

#### 4. Navigation Confusion
- [Where users get lost]
- [Back button patterns]
- [Clearer wayfinding]

#### 5. Technical Friction
- [Load times]
- [Errors/crashes]
- [Browser compatibility]

---

## SEGMENT ANALYSIS

### By Device
- **Desktop:** [Performance and issues]
- **Mobile:** [Performance and issues]
- **Tablet:** [Performance and issues]
- **Recommendation:** [Device-specific priorities]

### By Traffic Source
- **Organic:** [Behavior patterns]
- **Paid:** [Behavior patterns]
- **Social:** [Behavior patterns]
- **Email:** [Behavior patterns]
- **Recommendation:** [Source-specific optimizations]

### By User Type
- **New Users:** [Friction points]
- **Returning Users:** [Friction points]
- **Logged-in vs Guest:** [Differences]

---

## OPTIMIZATION RECOMMENDATIONS

### Quick Wins (This Week)
1. **[Fix Name]**
   - **Effort:** [Low/Med/High]
   - **Expected Impact:** [% lift estimate]
   - **Implementation:** [Brief description]

2. **[Fix Name]**
   [Same structure]

### Medium-term (This Month)
1. **[Fix Name]**
   - **Effort:** [Low/Med/High]
   - **Expected Impact:** [% lift estimate]
   - **A/B Test Needed:** [Yes/No]

2. **[Fix Name]**
   [Same structure]

### Strategic (This Quarter)
1. **[Fix Name]**
   - **Effort:** [Low/Med/High]
   - **Expected Impact:** [% lift estimate]
   - **Dependencies:** [What's needed]

---

## EXPERIMENT ROADMAP

### Priority 1: Fix [Primary Bottleneck]
**Hypothesis:** [What we believe will help]
**Test Design:** [Control vs Variant description]
**Success Metric:** [Primary metric to move]
**Timeline:** [Duration]

### Priority 2: [Next Fix]
[Same structure]

### Priority 3: [Next Fix]
[Same structure]

---

## MONITORING PLAN

### Key Metrics to Track
- [Metric 1 - why it matters]
- [Metric 2 - why it matters]
- [Metric 3 - why it matters]

### Alert Thresholds
- [When to investigate anomalies]
- [When to escalate issues]

### Review Cadence
- [Daily/weekly/monthly check-ins]`
            },
            {
                title: '🔄 Retention Analysis Agent',
                description: 'Analyzes user cohorts to identify behaviors that drive long-term retention and sticky features.',
                prompt_template: `ROLE: You are a data scientist specializing in retention analysis and cohort behavior to identify what makes users stick around.

INPUT:
- Product Type: [SAAS/MOBILE APP/MARKETPLACE/ETC.]
- Cohort Data: [RETENTION RATES BY COHORT]
- User Actions: [LIST OF TRACKED EVENTS/ACTIONS]
- Time Period: [DATA RANGE]
- Segment Info: [USER TYPES, PRICING TIERS, ETC.]
- Churn Signals: [LAST ACTIONS BEFORE CHURNING]
- Power User Behaviors: [WHAT DO HIGH-RETENTION USERS DO?]
- Feature Usage Data: [WHICH FEATURES ARE USED MOST?]

TASK: Conduct comprehensive retention analysis:

## COHORT OVERVIEW

### Retention Curves
| Cohort | Week 1 | Week 2 | Week 4 | Week 8 | Week 12 |
|--------|--------|--------|--------|--------|---------|
| [Date] | [%] | [%] | [%] | [%] | [%] |
| [Date] | [%] | [%] | [%] | [%] | [%] |

### Key Metrics
- **Average Day 1 Retention:** [%]
- **Average Day 7 Retention:** [%]
- **Average Day 30 Retention:** [%]
- **Average Day 90 Retention:** [%]
- **Churn Rate:** [% per month]
- **CLV (Customer Lifetime Value):** [$]

### Trends
- [Improving/declining/stable retention]
- [Seasonal patterns if any]
- [Impact of recent releases]

---

## RETENTION DRIVER ANALYSIS

### The "Aha Moment" Identification
**Hypothesis:** Users who [action] within [timeframe] are more likely to retain.

**Correlation Analysis:**
| Action | Correlation with Retention | Statistical Significance |
|--------|---------------------------|-------------------------|
| [Action 1] | [Strong/Moderate/Weak] | [p-value] |
| [Action 2] | [Strong/Moderate/Weak] | [p-value] |
| [Action 3] | [Strong/Moderate/Weak] | [p-value] |

**Leading Indicators of Retention:**
1. **[Action Name]**
   - Users who do this retain at [%] vs [% baseline]
   - [%] of retained users do this
   - Optimal timeframe: [within X days]

2. **[Action Name]**
   [Same structure]

3. **[Action Name]**
   [Same structure]

### Power User Profile
**Characteristics of High-Retention Users:**
- **Usage Frequency:** [X times per week]
- **Feature Adoption:** [Which features they use]
- **Engagement Pattern:** [When/how they engage]
- **Segment Attributes:** [Pricing tier, source, etc.]

**Actions Power Users Take:**
1. [Action 1] - [% of power users]
2. [Action 2] - [% of power users]
3. [Action 3] - [% of power users]

---

## CHURN ANALYSIS

### Churn Patterns

#### Early Churn (First 7 Days)
**% of Total Churn:** [X%]
**Common Last Actions:**
- [Action 1] - [% of early churners]
- [Action 2] - [% of early churners]

**Root Causes:**
1. [Cause 1 - e.g., "Never reached value"]
2. [Cause 2 - e.g., "Confusing onboarding"]
3. [Cause 3 - e.g., "Wrong expectations"]

**Prevention Strategies:**
- [Strategy 1]
- [Strategy 2]

#### Mid-Term Churn (Week 2-4)
**% of Total Churn:** [X%]
**Common Last Actions:**
- [Action 1]
- [Action 2]

**Root Causes:**
1. [Cause 1]
2. [Cause 2]

**Prevention Strategies:**
- [Strategy 1]
- [Strategy 2]

#### Late Churn (After Day 30)
**% of Total Churn:** [X%]
**Common Last Actions:**
- [Action 1]
- [Action 2]

**Root Causes:**
1. [Cause 1 - e.g., "Value erosion over time"]
2. [Cause 2 - e.g., "Competitive switching"]

**Prevention Strategies:**
- [Strategy 1]
- [Strategy 2]

### Churn Risk Signals
**Predictive Indicators:**
1. [Signal 1] - [X% likelihood of churning]
2. [Signal 2] - [X% likelihood of churning]
3. [Signal 3] - [X% likelihood of churning]

**Early Warning System:**
- [How to identify at-risk users]
- [Automated alerts to set up]

---

## SEGMENT RETENTION ANALYSIS

### By Acquisition Channel
| Channel | Day 7 | Day 30 | Day 90 | Insight |
|---------|-------|--------|--------|---------|
| [Channel 1] | [%] | [%] | [%] | [Analysis] |
| [Channel 2] | [%] | [%] | [%] | [Analysis] |

**Recommendations:**
- [Channel-specific retention strategies]

### By Pricing Tier
| Tier | Day 7 | Day 30 | Day 90 | Insight |
|------|-------|--------|--------|---------|
| [Tier 1] | [%] | [%] | [%] | [Analysis] |
| [Tier 2] | [%] | [%] | [%] | [Analysis] |

**Recommendations:**
- [Tier-specific retention strategies]

### By User Type
| Type | Day 7 | Day 30 | Day 90 | Insight |
|------|-------|--------|--------|---------|
| [Type 1] | [%] | [%] | [%] | [Analysis] |
| [Type 2] | [%] | [%] | [%] | [Analysis] |

---

## FEATURE IMPACT ON RETENTION

### High-Impact Features
**Features that Drive Retention:**

1. **[Feature Name]**
   - Users who use this retain at [%] vs [%]
   - [%] of retained users use this
   - Usage frequency for retained users: [X times/week]
   - **Recommendation:** [How to drive adoption]

2. **[Feature Name]**
   [Same structure]

### Low-Impact Features
**Features with Weak Retention Correlation:**
1. [Feature] - [Analysis]
2. [Feature] - [Analysis]

### Feature Adoption Funnel
| Feature | Awareness | Trial | Adoption | Habitual Use |
|---------|-----------|-------|----------|--------------|
| [Feature] | [%] | [%] | [%] | [%] |

**Drop-off Points:**
- [Where users abandon feature adoption]
- [Why they don't stick with it]

---

## RETENTION IMPROVEMENT ROADMAP

### Immediate Actions (This Sprint)
1. **[Action Name]**
   - **Target:** [Who this affects]
   - **Expected Impact:** [% retention lift]
   - **Implementation:** [Brief description]

2. **[Action Name]**
   [Same structure]

### Short-term (This Month)
1. **[Initiative Name]**
   - **Focus:** [Area of improvement]
   - **Expected Impact:** [% retention lift]
   - **Resources Needed:** [Team/effort]

2. **[Initiative Name]**
   [Same structure]

### Long-term (This Quarter)
1. **[Initiative Name]**
   - **Focus:** [Strategic retention driver]
   - **Expected Impact:** [% retention lift]
   - **Dependencies:** [What's needed]

---

## EXPERIMENTS TO RUN

### Experiment 1: Drive "Aha Moment"
**Hypothesis:** [What we believe]
**Intervention:** [What we'll build/test]
**Success Metric:** [% of users reaching aha moment]
**Expected Retention Impact:** [% lift]

### Experiment 2: Re-engage At-Risk Users
**Hypothesis:** [What we believe]
**Intervention:** [What we'll build/test]
**Success Metric:** [Reactivation rate]
**Expected Retention Impact:** [% lift]

### Experiment 3: Feature Adoption Campaign
**Hypothesis:** [What we believe]
**Intervention:** [What we'll build/test]
**Success Metric:** [Feature adoption rate]
**Expected Retention Impact:** [% lift]

---

## MONITORING DASHBOARD

### Key Metrics to Track
- [Metric 1] - [Why it matters]
- [Metric 2] - [Why it matters]
- [Metric 3] - [Why it matters]

### Cohort Review Cadence
- [Daily/weekly/monthly reviews]
- [Who should attend]
- [What to look for]

### Alert Thresholds
- [When retention drops below X%]
- [When churn spikes above Y%]`
            },
            {
                title: '📝 Content Marketing Planner',
                description: 'Generates SEO-focused content calendars with keyword strategy and distribution plans.',
                prompt_template: `ROLE: You are a content marketing strategist who creates data-driven content calendars that drive organic traffic and conversions.

INPUT:
- Product/Service: [WHAT YOU OFFER]
- Target Audience: [WHO ARE WE CREATING FOR?]
- Industry/Niche: [MARKET SPACE]
- Primary Keywords: [TOP TARGET KEYWORDS]
- Content Goals: [AWARENESS/CONSIDERATION/CONVERSION/RETENTION]
- Competitor Content: [WHAT'S WORKING FOR COMPETITORS?]
- Internal Expertise: [WHAT CAN WE SPEAK AUTHORITATIVELY ON?]
- Content Resources: [WRITERS, DESIGNERS, VIDEO CAPABILITY]
- Distribution Channels: [OWNED, EARNED, PAID CHANNELS]

TASK: Create a comprehensive content marketing plan:

## CONTENT STRATEGY OVERVIEW

### Goals & KPIs
**Primary Goal:** [e.g., "Increase organic traffic by 50%"]
**Secondary Goals:**
- [Goal 1]
- [Goal 2]

**Success Metrics:**
- Traffic: [Target]
- Leads: [Target]
- Engagement: [Target]
- Conversions: [Target]

### Audience Personas

#### Persona 1: [Name]
- **Role:** [Job title]
- **Pain Points:** [What keeps them up at night]
- **Content Preferences:** [Formats they consume]
- **Search Behavior:** [What they search for]
- **Buying Stage:** [Awareness/Consideration/Decision]

#### Persona 2: [Name]
[Same structure]

### Content Pillars
1. **[Pillar 1]** - [Theme and focus]
2. **[Pillar 2]** - [Theme and focus]
3. **[Pillar 3]** - [Theme and focus]
4. **[Pillar 4]** - [Theme and focus]

---

## KEYWORD STRATEGY

### Primary Keywords (High Priority)
| Keyword | Volume | Difficulty | Intent | Priority |
|---------|--------|------------|--------|----------|
| [Keyword 1] | [Number] | [Score] | [Type] | [High/Med/Low] |
| [Keyword 2] | [Number] | [Score] | [Type] | [High/Med/Low] |

### Secondary Keywords (Supporting)
| Keyword | Volume | Parent Topic | Content Type |
|---------|--------|--------------|--------------|
| [Keyword 1] | [Number] | [Topic] | [Blog/Guide/Video] |
| [Keyword 2] | [Number] | [Topic] | [Blog/Guide/Video] |

### Long-tail Opportunities
- [Keyword phrase 1]
- [Keyword phrase 2]
- [Keyword phrase 3]

### Keyword Gaps (vs Competitors)
- [Competitor ranks for X, we don't]
- [Opportunity to target Y]

---

## 30-DAY CONTENT CALENDAR

### Week 1

#### Content 1: [Title]
**Pillar:** [Which pillar this supports]
**Target Keyword:** [Primary keyword]
**Secondary Keywords:** [Supporting keywords]
**Format:** [Blog post/Video/Infographic/Podcast]
**Funnel Stage:** [Awareness/Consideration/Decision]
**Persona:** [Target audience]
**Objective:** [What this content should achieve]

**Outline:**
- H1: [Title]
- H2: [Section 1]
  - H3: [Subsection]
  - H3: [Subsection]
- H2: [Section 2]
- H2: [Section 3]
- CTA: [What action to take]

**SEO Elements:**
- Meta Title: [60 chars max]
- Meta Description: [155 chars max]
- URL Slug: [keyword-rich]
- Internal Links: [To these pages]
- External Links: [To these authorities]

**Distribution Plan:**
- **Owned:** [Website, email, app]
- **Social:** [LinkedIn, Twitter, etc.]
- **Earned:** [Guest posting, PR]
- **Paid:** [Promoted posts, ads]

**Promotion Checklist:**
- [ ] Publish on blog
- [ ] Share on social channels
- [ ] Include in newsletter
- [ ] Repurpose into social snippets
- [ ] Submit to aggregators

#### Content 2: [Title]
[Same structure]

### Week 2
[Same structure - 2-3 pieces]

### Week 3
[Same structure - 2-3 pieces]

### Week 4
[Same structure - 2-3 pieces]

---

## CONTENT FORMAT MIX

### Educational Content (40%)
- How-to guides
- Tutorials
- Explainers
- Best practices

### Thought Leadership (25%)
- Industry trends
- Original research
- Opinion pieces
- Predictions

### Product-Focused (20%)
- Case studies
- Use cases
- Feature highlights
- Comparison content

### Engaging/Interactive (15%)
- Quizzes
- Calculators
- Infographics
- Videos

---

## CONTENT DISTRIBUTION STRATEGY

### Owned Channels
**Website/Blog:**
- [Publishing schedule]
- [SEO optimization]
- [Internal linking strategy]

**Email:**
- [Newsletter frequency]
- [Segmentation strategy]
- [Automation workflows]

**Social Media:**
| Platform | Content Type | Frequency | Best Times |
|----------|--------------|-----------|------------|
| LinkedIn | [Type] | [X/week] | [Times] |
| Twitter | [Type] | [X/day] | [Times] |
| Instagram | [Type] | [X/week] | [Times] |

### Earned Channels
**Guest Posting:**
- [Target publications]
- [Pitch topics]
- [Outreach timeline]

**PR/Media:**
- [Target outlets]
- [Story angles]
- [Press release schedule]

**Community:**
- [Forums to engage]
- [Groups to share in]
- [Influencers to partner with]

### Paid Channels
**Content Promotion:**
- [Budget allocation]
- [Platforms to use]
- [Targeting strategy]

**Retargeting:**
- [Audience segments]
- [Content to promote]
- [Conversion goals]

---

## CONTENT REPURPOSING PLAN

### Pillar Content → Derivative Assets
**Long-form Blog Post:**
→ [X] Twitter threads
→ [X] LinkedIn posts
→ [X] Instagram carousels
→ [X] Email newsletter features
→ [X] Video scripts
→ [X] Podcast episode
→ [X] Infographic

### Content Refresh Schedule
- **Quarterly:** [Update top performers]
- **Bi-annually:** [Refresh evergreen content]
- **Annually:** [Major content audits]

---

## PERFORMANCE TRACKING

### Content Scorecard
| Content | Traffic | Engagement | Leads | Conversion | Action |
|---------|---------|------------|-------|------------|--------|
| [Title] | [Metric] | [Metric] | [Metric] | [Metric] | [Update/Keep/Remove] |

### Monthly Review Questions
1. What content performed best? Why?
2. What underperformed? How to improve?
3. What topics should we cover next?
4. What formats are working?
5. What distribution channels drive results?

### A/B Testing Ideas
- [Headline tests]
- [CTA tests]
- [Format tests]
- [Distribution timing tests]`
            }
        ],
        success_metrics: [
            'CAC (Customer Acquisition Cost)',
            'LTV (Lifetime Value)',
            'LTV:CAC Ratio (Target > 3:1)',
            'Churn Rate',
            'Viral Coefficient (K-factor)'
        ],
        failure_modes: [
            {
                problem: 'Vanity Metrics Focus',
                avoidance: 'Focus on "Active Users" or "Revenue", not just "Signups" or "Pageviews".'
            },
            {
                problem: 'Leaky Bucket',
                avoidance: 'Fix Retention before scaling Acquisition. Don\'t pour water into a bucket with holes.'
            },
            {
                problem: 'Growth Hacks vs Growth Loops',
                avoidance: 'Focus on sustainable loops (SEO, Virality) rather than one-off tricks.'
            }
        ]
    },
    scale: {
        id: 'scale',
        label: 'Scale',
        definition: 'Scale is about growing the business, team, and operations while maintaining quality and culture. It represents the transition from startup to scale-up.',
        objectives: [
            'Scale team structure and hiring',
            'Build operational excellence',
            'Establish processes without bureaucracy',
            'Maintain product quality at scale',
            'Preserve culture and values'
        ],
        tools: [
            'Notion',
            'Confluence',
            'Slack',
            'Microsoft Teams',
            'Lattice',
            'Greenhouse',
            'Workday',
            'Snowflake'
        ],
        frameworks: [
            'Spotify Model (Squads, Tribes, Chapters)',
            'OKRs (Objectives and Key Results)',
            'RACI Matrix (Responsible, Accountable, Consulted, Informed)',
            'Pyramid Principle (Communication)'
        ],
        ai_workflows: [
            {
                title: '👥 Hiring Plan Generator',
                description: 'Creates comprehensive hiring roadmaps with role definitions, timelines, and resource planning.',
                prompt_template: `ROLE: You are a talent acquisition strategist and organizational planning expert who builds scalable hiring plans.

INPUT:
- Team/Function: [e.g., "Engineering", "Product", "Sales"]
- Current Team Size: [X employees]
- Target Team Size: [Y employees]
- Growth Timeline: [e.g., "12 months", "Next 2 quarters"]
- Company Stage: [STARTUP/SERIES A/SERIES B/SERIES C/PUBLIC]
- Key Initiatives: [WHAT'S DRIVING THE HIRING?]
- Budget Constraints: [APPROXIMATE BUDGET RANGE]
- Geographic Constraints: [REMOTE/ONSITE/HYBRID, LOCATIONS]
- Diversity Goals: [SPECIFIC DIVERSITY OBJECTIVES]
- Critical Skills Needed: [MUST-HAVE CAPABILITIES]

TASK: Create a comprehensive hiring plan:

## HIRING OVERVIEW

### Growth Summary
- **Current Size:** [X] employees
- **Target Size:** [Y] employees
- **Net New Hires:** [Y-X] employees
- **Timeline:** [Duration]
- **Average Hires per Month:** [Number]

### Hiring Drivers
1. [Business reason 1 - e.g., "New product launch"]
2. [Business reason 2 - e.g., "International expansion"]
3. [Business reason 3 - e.g., "Replace attrition"]

### Resource Requirements
- **Recruiter Capacity:** [Internal recruiters needed]
- **Agency Budget:** [$ for external recruiters]
- **Time Investment:** [Hiring manager hours per week]
- **Tools/Systems:** [ATS, sourcing tools, etc.]

---

## ROLE BREAKDOWN

### Critical Roles (Hire First)

#### Role 1: [Job Title]
**Priority:** P0 (Critical path)
**Hire By:** [Date]
**Seniority:** [IC/Mid/Senior/Lead/Staff/Principal]
**Reports To:** [Hiring manager]
**Location:** [Remote/Office/Hybrid]

**Why This Role:**
[Business justification]

**Key Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

**Must-Have Skills:**
- [Skill 1]
- [Skill 2]
- [Skill 3]

**Nice-to-Have Skills:**
- [Skill 1]
- [Skill 2]

**Compensation Range:**
- Base: [$X - $Y]
- Equity: [X% - Y%]
- Total Comp: [$X - $Y]

**Sourcing Strategy:**
- [Where to find candidates]
- [Referral targets]
- [Diversity sourcing channels]

#### Role 2: [Job Title]
[Same structure]

### Important Roles (Hire Next)

#### Role 3: [Job Title]
**Priority:** P1 (Important)
**Hire By:** [Date]
[Same structure as above]

### Future Roles (Hire Later)

#### Role 4: [Job Title]
**Priority:** P2 (Nice to have)
**Hire By:** [Date]
[Same structure as above]

---

## HIRING TIMELINE

### Q1 [Year]
| Month | Roles | Hires Target | Focus |
|-------|-------|--------------|-------|
| Month 1 | [Role 1, Role 2] | [X] | [Priority] |
| Month 2 | [Role 3] | [X] | [Priority] |
| Month 3 | [Role 4] | [X] | [Priority] |

### Q2 [Year]
[Same structure]

### Q3 [Year]
[Same structure]

### Q4 [Year]
[Same structure]

---

## SENIORITY MIX

### Target Distribution
- **Entry-level (0-2 years):** [%] - [Number] hires
- **Mid-level (2-5 years):** [%] - [Number] hires
- **Senior (5-8 years):** [%] - [Number] hires
- **Staff/Principal (8+ years):** [%] - [Number] hires
- **Leadership:** [%] - [Number] hires

### Rationale
[Why this mix makes sense for the team/company stage]

---

## DIVERSITY & INCLUSION STRATEGY

### Diversity Goals
- **Gender:** [Target % representation]
- **Underrepresented Groups:** [Target %]
- **Geographic:** [Target regions/timezones]
- **Background:** [Non-traditional paths, etc.]

### Sourcing for Diversity
- [Partnerships with diverse orgs]
- [Job board postings]
- [Events and conferences]
- [Employee resource groups]

### Inclusive Hiring Practices
- [Blind resume review]
- [Diverse interview panels]
- [Structured interviews]
- [Bias training for interviewers]

---

## INTERVIEW PROCESS

### Standard Process
1. **Recruiter Screen** (30 min)
   - [What to assess]

2. **Hiring Manager Screen** (45 min)
   - [What to assess]

3. **Technical/Skills Assessment** (60-90 min)
   - [Format: take-home, live coding, case study, etc.]

4. **Team Interviews** (2-3 x 45 min)
   - [Who meets them]
   - [What to assess]

5. **Final Interview** (45 min)
   - [With leadership if applicable]

### Timeline per Candidate
- **Application to Offer:** [X days target]
- **Offer to Start:** [Y weeks typical]

---

## EMPLOYER BRANDING

### Value Proposition
[Why should candidates join?]

### Key Messages
1. [Message 1]
2. [Message 2]
3. [Message 3]

### Channels
- **Careers Page:** [Updates needed]
- **LinkedIn:** [Content strategy]
- **Glassdoor:** [Response strategy]
- **Social Media:** [Employee advocacy]

---

## RISK MITIGATION

### Potential Risks
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Strategy] |

### Contingency Plans
- **If hiring falls behind:** [What to do]
- **If budget is cut:** [Priority roles to protect]
- **If market is competitive:** [Differentiation strategy]

---

## SUCCESS METRICS

### Hiring Metrics
- **Time to Fill:** [Target days per role]
- **Offer Acceptance Rate:** [Target %]
- **Quality of Hire:** [How measured]
- **Diversity Metrics:** [Representation goals]

### Cost Metrics
- **Cost per Hire:** [Target $]
- **Agency Spend:** [Budget vs actual]
- **Recruiter Productivity:** [Hires per recruiter]

### Process Metrics
- **Candidate NPS:** [Target score]
- **Interview to Offer Ratio:** [Target %]
- **Drop-off by Stage:** [Where we lose candidates]`
            },
            {
                title: '📚 Process Documentation Agent',
                description: 'Transforms ad-hoc processes into comprehensive, repeatable playbooks.',
                prompt_template: `ROLE: You are an operations excellence specialist who creates clear, actionable process documentation and playbooks.

INPUT:
- Process Name: [e.g., "Incident Response", "Feature Launch", "Customer Onboarding"]
- Current State: [ROUGH DESCRIPTION OF HOW IT'S DONE NOW]
- Process Owner: [WHO OWNS THIS?]
- Stakeholders: [WHO ELSE IS INVOLVED?]
- Trigger Events: [WHEN DOES THIS PROCESS START?]
- Success Criteria: [HOW DO WE KNOW IT'S DONE WELL?]
- Common Issues: [WHAT USUALLY GOES WRONG?]
- Tools Used: [SYSTEMS/PLATFORMS INVOLVED]
- Compliance Requirements: [ANY REGULATORY NEEDS?]
- Frequency: [HOW OFTEN DOES THIS HAPPEN?]

TASK: Create a comprehensive process playbook:

## PROCESS OVERVIEW

### Process Summary
**Name:** [Process Name]
**Version:** [1.0]
**Last Updated:** [Date]
**Owner:** [Name/Role]
**Review Cadence:** [How often to update]

### Purpose
[Why this process exists and what it achieves]

### Scope
**In Scope:**
- [What's covered]
- [What's covered]

**Out of Scope:**
- [What's NOT covered]
- [What's NOT covered]

### Success Metrics
- [Metric 1]: [Target]
- [Metric 2]: [Target]
- [Metric 3]: [Target]

---

## TRIGGER & INITIATION

### When to Use This Process
- [Trigger condition 1]
- [Trigger condition 2]
- [Trigger condition 3]

### How to Initiate
1. [Step 1 to start the process]
2. [Step 2 to start the process]
3. [Step 3 to start the process]

### Information Needed at Start
- [Required input 1]
- [Required input 2]
- [Required input 3]

---

## PROCESS WORKFLOW

### Phase 1: [Name]
**Objective:** [What this phase achieves]
**Duration:** [Typical time]
**Owner:** [Role responsible]

#### Steps
1. **Step Name**
   - **Action:** [What to do]
   - **How:** [Detailed instructions]
   - **Tools:** [What systems to use]
   - **Output:** [What gets produced]
   - **SLA:** [Time expectation]

2. **Step Name**
   [Same structure]

#### Checkpoints
- [Decision point 1]
- [Decision point 2]

### Phase 2: [Name]
[Same structure as Phase 1]

### Phase 3: [Name]
[Same structure as Phase 1]

---

## ROLES & RESPONSIBILITIES

### RACI Matrix
| Task/Decision | Owner | Responsible | Consulted | Informed |
|---------------|-------|-------------|-----------|----------|
| [Task 1] | [Role] | [Role] | [Role] | [Role] |
| [Task 2] | [Role] | [Role] | [Role] | [Role] |
| [Task 3] | [Role] | [Role] | [Role] | [Role] |

### Role Definitions

#### [Role Name]
**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]

**Authority:**
- [What decisions they can make]
- [What approvals they need]

**Skills Required:**
- [Skill 1]
- [Skill 2]

---

## ESCALATION PATHS

### When to Escalate
- [Condition 1 - e.g., "SLA breach imminent"]
- [Condition 2 - e.g., "Budget exceeded"]
- [Condition 3 - e.g., "Stakeholder conflict"]

### Escalation Levels

#### Level 1: Team Lead
**Trigger:** [When to escalate here]
**Contact:** [How to reach]
**Response Time:** [Expected turnaround]

#### Level 2: Department Head
**Trigger:** [When to escalate here]
**Contact:** [How to reach]
**Response Time:** [Expected turnaround]

#### Level 3: Executive
**Trigger:** [When to escalate here]
**Contact:** [How to reach]
**Response Time:** [Expected turnaround]

---

## TOOLS & RESOURCES

### Required Tools
| Tool | Purpose | Access | Training |
|------|---------|--------|----------|
| [Tool 1] | [What it's for] | [How to get access] | [Training link] |
| [Tool 2] | [What it's for] | [How to get access] | [Training link] |

### Templates & Resources
- [Template 1]: [Link]
- [Template 2]: [Link]
- [Reference doc]: [Link]

---

## QUALITY ASSURANCE

### Quality Checkpoints
1. **[Checkpoint Name]**
   - **When:** [Phase/stage]
   - **What to Check:** [Criteria]
   - **Who Checks:** [Role]
   - **Pass Criteria:** [What qualifies]

2. **[Checkpoint Name]**
   [Same structure]

### Common Mistakes to Avoid
- [Mistake 1] → [How to avoid]
- [Mistake 2] → [How to avoid]
- [Mistake 3] → [How to avoid]

---

## EXCEPTION HANDLING

### Common Exceptions

#### Exception 1: [Scenario]
**When it occurs:** [Trigger]
**How to handle:** [Modified process]
**Who decides:** [Decision maker]
**Documentation:** [What to record]

#### Exception 2: [Scenario]
[Same structure]

### Emergency Procedures
**If [Emergency Scenario]:**
1. [Immediate action]
2. [Who to notify]
3. [How to document]
4. [Post-incident review]

---

## METRICS & REPORTING

### Key Performance Indicators
| Metric | Target | Measurement | Frequency |
|--------|--------|-------------|-----------|
| [Metric 1] | [Target] | [How measured] | [Daily/Weekly/Monthly] |
| [Metric 2] | [Target] | [How measured] | [Daily/Weekly/Monthly] |

### Reporting
- **Who receives reports:** [Roles]
- **Report frequency:** [How often]
- **Report format:** [Dashboard/Email/Meeting]
- **Key insights to highlight:** [What matters most]

---

## CONTINUOUS IMPROVEMENT

### Feedback Collection
- **How:** [Survey, retro, etc.]
- **When:** [Frequency]
- **From whom:** [Stakeholders]

### Review Process
- **Review cadence:** [How often]
- **Review owner:** [Who leads]
- **Change approval:** [Who approves updates]

### Version History
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | [Date] | [Initial creation] | [Name] |
| 1.1 | [Date] | [Changes made] | [Name] |

---

## QUICK REFERENCE

### Checklist Summary
- [ ] [Key checkpoint 1]
- [ ] [Key checkpoint 2]
- [ ] [Key checkpoint 3]
- [ ] [Key checkpoint 4]
- [ ] [Key checkpoint 5]

### Contact Directory
| Role | Name | Contact | Backup |
|------|------|---------|--------|
| [Role] | [Name] | [Email/Slack] | [Name] |
| [Role] | [Name] | [Email/Slack] | [Name] |

### Common Questions
**Q: [Question 1]**
A: [Answer]

**Q: [Question 2]**
A: [Answer]`
            },
            {
                title: '🎯 OKR Generator',
                description: 'Cascades company goals into team objectives with measurable key results.',
                prompt_template: `ROLE: You are an OKR (Objectives and Key Results) specialist who helps teams set ambitious, measurable goals aligned with company strategy.

INPUT:
- Company Objective: [TOP-LEVEL COMPANY GOAL]
- Team Name: [TEAM SETTING OKRS]
- Team Function: [WHAT DOES THIS TEAM DO?]
- Current Quarter: [Q1/Q2/Q3/Q4 YEAR]
- Previous Quarter Performance: [HOW DID LAST QUARTER GO?]
- Company Priorities: [TOP 3 FOCUS AREAS]
- Team Capacity: [RESOURCES/CONSTRAINTS]
- Dependencies: [OTHER TEAMS YOU RELY ON]
- Stakeholders: [WHO CARES ABOUT YOUR RESULTS?]
- Known Challenges: [WHAT MIGHT GET IN THE WAY?]

TASK: Create comprehensive OKRs for the team:

## CONTEXT & ALIGNMENT

### Company Objective
"[Company objective statement]"

### How This Team Contributes
[Explanation of team's role in achieving company goals]

### Strategic Priorities
1. [Priority 1 - why it matters]
2. [Priority 2 - why it matters]
3. [Priority 3 - why it matters]

### Lessons from Last Quarter
**What Worked:**
- [Success 1]
- [Success 2]

**What Didn't:**
- [Challenge 1]
- [Challenge 2]

**Adjustments for This Quarter:**
- [Change 1]
- [Change 2]

---

## OBJECTIVE 1: [Inspiring, Qualitative Goal]

### Objective Statement
[Clear, ambitious, qualitative statement of what we want to achieve]

**Why This Matters:**
[Connection to company goals and impact]

**Timeframe:** [Quarter/Year]
**Owner:** [Team Lead Name]

### Key Results

#### KR 1: [Measurable Outcome]
**Statement:** [Specific, measurable, time-bound result]

**Starting Value:** [Current baseline]
**Target Value:** [Where we want to be]
**Measurement:** [How we'll track]
**Data Source:** [Where the data comes from]

**Milestones:**
- Week 3: [X% complete]
- Week 6: [Y% complete]
- Week 9: [Z% complete]
- Week 12: [100% complete]

**Initiatives:**
- [Project/Initiative 1 to achieve this]
- [Project/Initiative 2 to achieve this]

#### KR 2: [Measurable Outcome]
[Same structure as KR 1]

#### KR 3: [Measurable Outcome]
[Same structure as KR 1]

### Health Metrics (Guardrails)
[Metrics that shouldn't degrade while pursuing OKRs]
- [Metric 1]: [Target range]
- [Metric 2]: [Target range]

---

## OBJECTIVE 2: [Inspiring, Qualitative Goal]

### Objective Statement
[Clear, ambitious, qualitative statement]

**Why This Matters:**
[Connection to company goals]

### Key Results

#### KR 1: [Measurable Outcome]
[Same structure as above]

#### KR 2: [Measurable Outcome]
[Same structure]

#### KR 3: [Measurable Outcome]
[Same structure]

---

## OBJECTIVE 3: [Inspiring, Qualitative Goal]

### Objective Statement
[Clear, ambitious, qualitative statement]

**Why This Matters:**
[Connection to company goals]

### Key Results

#### KR 1: [Measurable Outcome]
[Same structure]

#### KR 2: [Measurable Outcome]
[Same structure]

#### KR 3: [Measurable Outcome]
[Same structure]

---

## CROSS-FUNCTIONAL ALIGNMENT

### Dependencies
| Dependency | Team | What We Need | When | Status |
|------------|------|--------------|------|--------|
| [Dependency 1] | [Team] | [Deliverable] | [Date] | [Committed/At Risk] |
| [Dependency 2] | [Team] | [Deliverable] | [Date] | [Committed/At Risk] |

### Commitments to Other Teams
| Commitment | Team | What We'll Deliver | When |
|------------|------|-------------------|------|
| [Commitment 1] | [Team] | [Deliverable] | [Date] |
| [Commitment 2] | [Team] | [Deliverable] | [Date] |

### Shared OKRs
[OKRs that multiple teams contribute to]
- [Shared OKR 1]: [Teams involved]
- [Shared OKR 2]: [Teams involved]

---

## IMPLEMENTATION PLAN

### Resource Allocation
| OKR | Owner | Resources Needed | Risk Level |
|-----|-------|------------------|------------|
| [O1] | [Name] | [Resources] | [High/Med/Low] |
| [O2] | [Name] | [Resources] | [High/Med/Low] |
| [O3] | [Name] | [Resources] | [High/Med/Low] |

### Key Initiatives Roadmap

#### Month 1
- [Initiative 1]
- [Initiative 2]

#### Month 2
- [Initiative 3]
- [Initiative 4]

#### Month 3
- [Initiative 5]
- [Initiative 6]

### Risk Mitigation
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |
| [Risk 2] | High/Med/Low | High/Med/Low | [Strategy] |

---

## TRACKING & REPORTING

### Check-in Cadence
- **Weekly:** [Quick updates, blockers]
- **Bi-weekly:** [Detailed progress review]
- **Monthly:** [Leadership review]
- **Quarterly:** [Retrospective and scoring]

### Scorecard Template
| OKR | Week 1 | Week 4 | Week 8 | Week 12 | Final Score |
|-----|--------|--------|--------|---------|-------------|
| O1-KR1 | [%] | [%] | [%] | [%] | [0-1] |
| O1-KR2 | [%] | [%] | [%] | [%] | [0-1] |

### Scoring Guide
- **0.0 - 0.3:** [Red - significant miss]
- **0.4 - 0.6:** [Yellow - partial success]
- **0.7 - 1.0:** [Green - success/exceeded]

---

## COMMUNICATION PLAN

### Stakeholder Updates
| Stakeholder | Frequency | Format | Owner |
|-------------|-----------|--------|-------|
| [Group 1] | [Weekly] | [Slack/Email] | [Name] |
| [Group 2] | [Bi-weekly] | [Meeting] | [Name] |

### Success Celebration
- **How we'll celebrate wins:** [Recognition plan]
- **Learning from misses:** [Blameless post-mortems]

---

## APPENDIX

### OKR Best Practices
- [Best practice 1]
- [Best practice 2]
- [Best practice 3]

### Common Pitfalls to Avoid
- [Pitfall 1]
- [Pitfall 2]
- [Pitfall 3]

### Reference OKRs (Industry Benchmarks)
- [Benchmark 1]
- [Benchmark 2]`
            },
            {
                title: '🏢 Organizational Design Assistant',
                description: 'Models different organizational structures with pros, cons, and transition plans.',
                prompt_template: `ROLE: You are an organizational design consultant who helps companies structure teams for scale, collaboration, and execution.

INPUT:
- Department/Function: [e.g., "Engineering", "Product", "Marketing"]
- Current Size: [X people]
- Target Size (12 months): [Y people]
- Primary Challenges: [WHAT'S NOT WORKING NOW?]
- Work Type: [PROJECT-BASED/OPERATIONAL/MIXED]
- Collaboration Needs: [WHO DO THEY WORK WITH?]
- Geographic Distribution: [REMOTE/ONSITE/CO-LOCATED]
- Growth Trajectory: [FAST/MODERATE/STEADY]
- Cultural Values: [WHAT'S IMPORTANT TO THE COMPANY?]
- Key Initiatives: [MAJOR PROJECTS COMING UP]

TASK: Design optimal organizational structure:

## CURRENT STATE ASSESSMENT

### Current Structure
[Description of how the team is organized today]

### Current Pain Points
1. [Pain point 1 - e.g., "Slow decision making"]
2. [Pain point 2 - e.g., "Unclear ownership"]
3. [Pain point 3 - e.g., "Communication silos"]

### What's Working Well
1. [Strength 1]
2. [Strength 2]

### Team Composition
- **Total Headcount:** [X]
- **ICs:** [X] ([%])
- **Managers:** [X] ([%])
- **Seniority Mix:** [Junior/Mid/Senior breakdown]
- **Specializations:** [Skill areas represented]

---

## OPTION A: [Structure Name - e.g., "Functional/Departmental"]

### Structure Overview
[High-level description of this organizational model]

### Visual Representation
\`\`\`
[Department Head]
    |
    ├── [Function A Lead]
    |       ├── [Team A1]
    |       └── [Team A2]
    |
    ├── [Function B Lead]
    |       ├── [Team B1]
    |       └── [Team B2]
    |
    └── [Function C Lead]
            ├── [Team C1]
            └── [Team C2]
\`\`\`

### Role Definitions

#### [Function A Lead]
**Reports to:** [Department Head]
**Direct Reports:** [X] people
**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

**Success Metrics:**
- [Metric 1]
- [Metric 2]

#### [Function B Lead]
[Same structure]

### Pros
✅ **[Benefit 1]**
[Explanation of why this is good]

✅ **[Benefit 2]**
[Explanation]

✅ **[Benefit 3]**
[Explanation]

### Cons
❌ **[Drawback 1]**
[Explanation of the risk/challenge]

❌ **[Drawback 2]**
[Explanation]

❌ **[Drawback 3]**
[Explanation]

### Best For
- [Scenario where this works well]
- [Scenario where this works well]

### When to Use This
[Guidance on when this structure is optimal]

---

## OPTION B: [Structure Name - e.g., "Cross-functional/Pod-Based"]

### Structure Overview
[High-level description]

### Visual Representation
\`\`\`
[Department Head]
    |
    ├── [Squad/Pod A]
    |       ├── [Role 1]
    |       ├── [Role 2]
    |       └── [Role 3]
    |
    ├── [Squad/Pod B]
    |       ├── [Role 1]
    |       ├── [Role 2]
    |       └── [Role 3]
    |
    └── [Platform/Enablement Team]
            ├── [Role 1]
            └── [Role 2]
\`\`\`

### Role Definitions

#### [Squad A Lead]
**Reports to:** [Department Head]
**Squad Composition:** [X cross-functional members]
**Responsibilities:**
- [Responsibility 1]
- [Responsibility 2]

**Autonomy Level:** [High/Medium/Low]

#### [Platform Team Lead]
[Same structure]

### Pros
✅ **[Benefit 1]**
[Explanation]

✅ **[Benefit 2]**
[Explanation]

✅ **[Benefit 3]**
[Explanation]

### Cons
❌ **[Drawback 1]**
[Explanation]

❌ **[Drawback 2]**
[Explanation]

❌ **[Drawback 3]**
[Explanation]

### Best For
- [Scenario]
- [Scenario]

### When to Use This
[Guidance]

---

## COMPARATIVE ANALYSIS

### Side-by-Side Comparison
| Criteria | Option A | Option B | Winner |
|----------|----------|----------|--------|
| **Decision Speed** | [Rating] | [Rating] | [A/B/Tie] |
| **Cross-functional Collaboration** | [Rating] | [Rating] | [A/B/Tie] |
| **Career Growth Paths** | [Rating] | [Rating] | [A/B/Tie] |
| **Resource Efficiency** | [Rating] | [Rating] | [A/B/Tie] |
| **Scalability** | [Rating] | [Rating] | [A/B/Tie] |
| **Accountability** | [Rating] | [Rating] | [A/B/Tie] |
| **Communication Overhead** | [Rating] | [Rating] | [A/B/Tie] |
| **Specialization Depth** | [Rating] | [Rating] | [A/B/Tie] |
| **Flexibility** | [Rating] | [Rating] | [A/B/Tie] |
| **Cultural Fit** | [Rating] | [Rating] | [A/B/Tie] |

### Risk Assessment
| Risk | Option A | Option B |
|------|----------|----------|
| [Risk 1] | [Impact] | [Impact] |
| [Risk 2] | [Impact] | [Impact] |
| [Risk 3] | [Impact] | [Impact] |

---

## RECOMMENDATION

### Recommended Structure: [Option X]

**Rationale:**
[Why this is the best choice for the current situation]

**Confidence Level:** [High/Medium/Low]

### Implementation Roadmap

#### Phase 1: Preparation (Weeks 1-2)
- [ ] [Action item 1]
- [ ] [Action item 2]
- [ ] [Action item 3]

#### Phase 2: Pilot (Weeks 3-6)
- [ ] [Action item 1]
- [ ] [Action item 2]

#### Phase 3: Rollout (Weeks 7-12)
- [ ] [Action item 1]
- [ ] [Action item 2]

#### Phase 4: Optimization (Ongoing)
- [ ] [Action item 1]
- [ ] [Action item 2]

### Change Management

#### Communication Plan
- **Who to inform:** [Stakeholders]
- **Key messages:** [What to communicate]
- **Timeline:** [When to communicate]

#### Training Needs
- [Training 1 - who needs it]
- [Training 2 - who needs it]

#### Success Metrics
- [How we'll know the reorg worked]
- [Timeline for evaluation]

### Contingency Plan
**If [Option X] doesn't work:**
- [Fallback strategy]
- [Signs to watch for]
- [When to pivot]

---

## FUTURE CONSIDERATIONS

### Evolution Path (12-24 months)
[How this structure should evolve as the team grows]

### When to Re-evaluate
[Triggers for future org design reviews]

### Scaling Beyond [Target Size]
[How to adapt when team exceeds target size]`
            }
        ],
        success_metrics: [
            'Employee eNPS',
            'Revenue per Employee',
            'Time to Hire',
            'OKR Achievement Rate'
        ],
        failure_modes: [
            {
                problem: 'Bureaucracy creep',
                avoidance: 'Add process only when it hurts not to. "Minimum Viable Process".'
            },
            {
                problem: 'Hiring the wrong people',
                avoidance: 'Protect the culture. "Hire slow, fire fast". Use "Bar Raisers" in interviews.'
            },
            {
                problem: 'Silos and Communication breakdowns',
                avoidance: 'Invest in internal comms and "Town Halls". Ensure transparency.'
            }
        ]
    },
    optimization: {
        id: 'optimization',
        label: 'Optimization',
        definition: 'Optimization is about continuous improvement of the product, processes, and business. It is the stage of refinement, iteration, and achieving product-market fit excellence.',
        objectives: [
            'Improve key metrics systematically',
            'Refine product-market fit',
            'Increase operational efficiency',
            'Enhance user experience',
            'Maximize business outcomes'
        ],
        tools: [
            'FullStory',
            'Hotjar',
            'Statsig',
            'VWO'
        ],
        frameworks: [
            'HEART Framework (Google)',
            'Kaizen (Continuous Improvement)',
            'Lean Analytics (One Metric That Matters)',
            'Reforge Growth Frameworks'
        ],
        ai_workflows: [
            {
                title: '🧪 Experiment Hypothesis Generator',
                description: 'Creates data-driven hypotheses with experiment designs and success metrics.',
                prompt_template: `ROLE: You are a growth product manager and experimentation expert who designs rigorous A/B tests.

INPUT:
- Metric to Optimize: [e.g., "Checkout Conversion Rate"]
- Current Performance: [X%]
- Target Performance: [Y%]
- Historical Data: [ANY RELEVANT TRENDS]
- User Segments: [WHO ARE WE TESTING?]
- Past Experiments: [WHAT HAVE WE TRIED?]
- Business Context: [WHY THIS METRIC MATTERS]
- Constraints: [ENGINEERING/DESIGN RESOURCES]

TASK: Create comprehensive experiment hypotheses:

## METRIC ANALYSIS

### Current State
**Metric:** [Name]
**Current Value:** [X% or $X]
**Target Value:** [Y% or $Y]
**Gap:** [% or $ improvement needed]
**Industry Benchmark:** [% or $]

### Performance History
- [Trend 1]
- [Trend 2]
- [Seasonal patterns if any]

---

## HYPOTHESIS 1: [Primary Hypothesis]

### The Hypothesis
**"We believe that [intervention] for [audience] will result in [outcome], as measured by [metric]."**

### Root Cause Analysis
**Problem Statement:** [What user problem are we solving?]

**Evidence:**
- [Data point 1 supporting this]
- [Data point 2 supporting this]
- [User research finding]

### The Solution
**Intervention Description:**
[Detailed description of what will change]

**Design Mockup Description:**
[What it will look like]

**User Impact:**
[How this changes the user experience]

### Experiment Design

#### Primary Hypothesis
**Null Hypothesis:** [What we're testing against]
**Expected Direction:** [Increase/Decrease]

#### Success Metrics
| Metric | Type | Baseline | Target | Minimum Detectable Effect |
|--------|------|----------|--------|---------------------------|
| [Primary] | Primary | [X%] | [Y%] | [%] |
| [Secondary] | Secondary | [X] | [Y] | [%] |
| [Guardrail] | Guardrail | [X] | [Y] | [None/N/A] |

#### Sample Size & Duration
- **Sample Size:** [X users per variant]
- **Statistical Power:** [80%]
- **Significance Level:** [95%]
- **MDE:** [% minimum detectable effect]
- **Duration:** [X weeks]
- **Daily Traffic Required:** [X visitors/day]

#### Test Design
- **Control:** [Current experience]
- **Variant A:** [New experience]
- **Traffic Split:** [50/50 or 80/20 for holdout]

#### Implementation Requirements
- **Engineering:** [Development effort]
- **Design:** [Design effort]
- **Analytics:** [Tracking needed]

#### Risk Assessment
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| [Risk 1] | High/Med/Low | High/Med/Low | [Strategy] |

---

## HYPOTHESIS 2: [Secondary Hypothesis]

### The Hypothesis
**"We believe that [intervention]..."**

### Root Cause Analysis
[Same structure]

### The Solution
[Same structure]

### Experiment Design
[Same structure]

---

## HYPOTHESIS 3: [Tertiary Hypothesis]

[Same structure as above]

---

## PRIORITIZATION

### ICE Score for Each Hypothesis

| Hypothesis | Impact | Confidence | Ease | Total |
|------------|--------|------------|------|-------|
| [H1] | [1-10] | [1-10] | [1-10] | [Sum] |
| [H2] | [1-10] | [1-10] | [1-10] | [Sum] |
| [H3] | [1-10] | [1-10] | [1-10] | [Sum] |

### Recommended Priority
1. **[H1]** - [Why this is highest priority]
2. **[H2]** - [Why this is second]
3. **[H3]** - [Why this is third]

---

## EXPERIMENT PIPELINE

### This Sprint
- [Experiment to run now]
- [Prep work needed]

### Next Sprint
- [Experiment to prepare]

### Next Quarter
- [Strategic experiments]

---

## POST-EXPERIMENT ANALYSIS PLAN

### How to Analyze Results
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Segments to Analyze
- [Segment 1 - e.g., Mobile vs Desktop]
- [Segment 2 - e.g., New vs Returning]
- [Segment 3 - e.g., Traffic source]

### What If Scenarios

#### If Winner
- [Rollout plan]
- [Follow-up experiments]

#### If Loser
- [Blameless post-mortem questions]
- [Next hypotheses to try]

#### If Inconclusive
- [Extend test decision]
- [Iterate on hypothesis]

---

## TRACKING DOCUMENT
| Experiment | Status | Start Date | Duration | Sample Size | Result | Action |
|------------|--------|------------|----------|-------------|--------|--------|
| [H1] | [Planned/Running/Done] | [Date] | [Weeks] | [Number] | [Win/Loss/Inconclusive] | [Next] |
| [H2] | [Planned/Running/Done] | [Date] | [Weeks] | [Number] | [Win/Loss/Inconclusive] | [Next] |`
            },
            {
                title: '📊 Metric Anomaly Detector',
                description: 'Identifies anomalies in time-series data with root cause analysis and recommended actions.',
                prompt_template: `ROLE: You are a data analyst and product manager who specializes in metric analysis and anomaly detection.

INPUT:
- Metric Name: [e.g., "Daily Active Users", "Revenue"]
- Time Period: [Start Date to End Date]
- Anomaly Date: [When the anomaly occurred]
- Historical Baseline: [Normal range for this metric]
- Anomalous Value: [The spike/drop value]
- Related Events: [Deployments, campaigns, external events]
- User Reports: [Any qualitative reports from users]
- System Health: [Any technical incidents logged]

TASK: Conduct comprehensive anomaly analysis:

## ANOMALY OVERVIEW

### Metric Definition
**Name:** [Metric name]
**What It Measures:** [Explanation of the metric]
**Business Importance:** [Why this metric matters]
**Frequency:** [Daily/Weekly/Monthly]

### The Anomaly
| Attribute | Value |
|-----------|-------|
| **Date of Anomaly** | [Date] |
| **Expected Range** | [Min - Max] |
| **Actual Value** | [Value] |
| **Deviation from Expected** | [% or X standard deviations] |
| **Direction** | [Spike/Drop] |
| **Duration** | [Single day/Multiple days] |

### Impact Assessment
- **User Impact:** [High/Medium/Low]
- **Business Impact:** [High/Medium/Low]
- **Revenue Impact:** [Estimated $ impact]

---

## DATA ANALYSIS

### Historical Pattern
| Period | Average | Std Dev | Min | Max |
|--------|---------|---------|-----|-----|
| Last 30 days | [X] | [Y] | [Min] | [Max] |
| Last 90 days | [X] | [Y] | [Min] | [Max] |
| Same period last year | [X] | [Y] | [Min] | [Max] |

### Trend Analysis
- **Short-term trend (7 days):** [Up/Down/Flat]
- **Medium-term trend (30 days):** [Up/Down/Flat]
- **Long-term trend (90 days):** [Up/Down/Flat]

### Change Detection
- **Day-over-day change:** [%]
- **Week-over-week change:** [%]
- **Month-over-month change:** [%]

---

## ROOT CAUSE HYPOTHESES

### Hypothesis 1: [Technical Cause - e.g., "Infrastructure Issue"]

**Probability:** [High/Medium/Low]
**Evidence FOR this hypothesis:**
- [Evidence point 1]
- [Evidence point 2]

**Evidence AGAINST this hypothesis:**
- [Evidence point 1]

**How to validate:**
- [Check to perform]
- [Data to review]

**If confirmed:**
- [Root cause explanation]
- [Fix required]
- [Prevention measures]

### Hypothesis 2: [User Behavior - e.g., "Campaign Effect"]

**Probability:** [High/Medium/Low]
**Evidence FOR this hypothesis:**
- [Evidence point 1]
- [Evidence point 2]

**Evidence AGAINST this hypothesis:**
- [Evidence point 1]

**How to validate:**
- [Check to perform]
- [Data to review]

**If confirmed:**
- [Root cause explanation]
- [Implications]

### Hypothesis 3: [External Factor - e.g., "Market Event"]

**Probability:** [High/Medium/Low]
**Evidence FOR this hypothesis:**
- [Evidence point 1]
- [Evidence point 2]

**Evidence AGAINST this hypothesis:**
- [Evidence point 1]

**How to validate:**
- [Check to perform]

**If confirmed:**
- [Root cause explanation]
- [Response strategy]

### Hypothesis 4: [Data Quality Issue - e.g., "Tracking Error"]

**Probability:** [High/Medium/Low]
**Evidence FOR this hypothesis:**
- [Evidence point 1]

**Evidence AGAINST this hypothesis:**
- [Evidence point 1]

**How to validate:**
- [Check to perform]

**If confirmed:**
- [Root cause explanation]
- [Fix required]

---

## USER BEHAVIOR ANALYSIS

### Segment Breakdown
| Segment | Baseline | Anomaly Day | Change | Insight |
|---------|----------|-------------|--------|---------|
| [Segment 1] | [Value] | [Value] | [%] | [Analysis] |
| [Segment 2] | [Value] | [Value] | [%] | [Analysis] |

### Geographic Breakdown
| Region | Baseline | Anomaly Day | Change | Insight |
|--------|----------|-------------|--------|---------|
| [Region 1] | [Value] | [Value] | [%] | [Analysis] |

### Device Breakdown
| Device | Baseline | Anomaly Day | Change | Insight |
|--------|----------|-------------|--------|---------|
| [Device 1] | [Value] | [Value] | [%] | [Analysis] |

---

## EVENT TIMELINE

### Days Leading Up to Anomaly
| Date | Event | Impact |
|------|-------|--------|
| [Date -3] | [Event] | [High/Med/Low] |
| [Date -2] | [Event] | [High/Med/Low] |
| [Date -1] | [Event] | [High/Med/Low] |

### Anomaly Day
| Time | Event | Impact |
|------|-------|--------|
| [Time] | [Event] | [High/Med/Low] |

### Days After Anomaly
| Date | Recovery | Trend |
|------|----------|-------|
| [Date +1] | [Full/Partial/None] | [Up/Down/Flat] |

---

## RECOMMENDATIONS

### Immediate Actions (Next 24 Hours)
1. **[Action]**
   - **What:** [What to do]
   - **Who:** [Owner]
   - **Deadline:** [When]

2. **[Action]**
   - **What:** [What to do]
   - **Who:** [Owner]
   - **Deadline:** [When]

### Short-term Actions (This Week)
1. **[Action]**
   - **What:** [What to do]
   - **Owner:** [Who]
   - **Expected Outcome:** [Result]

### Long-term Actions (This Month)
1. **[Action]**
   - **What:** [What to do]
   - **Owner:** [Who]
   - **Resources Needed:** [What's needed]

### Monitoring Setup
| Metric | Alert Condition | Owner |
|--------|-----------------|-------|
| [Metric 1] | [Condition] | [Who] |
| [Metric 2] | [Condition] | [Who] |

---

## LESSONS LEARNED

### What Worked Well
- [Success 1]
- [Success 2]

### What Could Have Been Better
- [Improvement 1]
- [Improvement 2]

### Prevention Measures
- [Measure 1]
- [Measure 2]

---

## APPENDIX

### Data Sources
- [Source 1]: [Link/Description]
- [Source 2]: [Link/Description]

### People Consulted
- [Person 1]: [Role]
- [Person 2]: [Role]

### Related Incidents
- [Incident 1]: [Link]`
            },
            {
                title: '🎯 User Feedback Synthesizer',
                description: 'Aggregates and prioritizes qualitative user feedback into actionable insights.',
                prompt_template: `ROLE: You are a user research analyst and product manager who synthesizes qualitative feedback into actionable insights.

INPUT:
- Feedback Source: [App Store reviews, customer interviews, surveys, support tickets]
- Time Period: [Date range]
- Volume: [Number of feedback items]
- User Segments: [Who provided feedback]
- Product Area: [Which feature/product area]
- Sentiment Overview: [Overall positive/negative/neutral]
- Key Themes: [Any known themes]

TASK: Conduct comprehensive feedback synthesis:

## FEEDBACK OVERVIEW

### Collection Summary
| Metric | Value |
|--------|-------|
| **Total Feedback Items** | [Number] |
| **Time Period** | [Dates] |
| **Unique Users** | [Number] |
| **Sources** | [Where feedback came from] |
| **Overall Sentiment** | [Positive/Negative/Neutral %] |

### Sentiment Distribution
- **Positive:** [%] - [Number of items]
- **Neutral:** [%] - [Number of items]
- **Negative:** [%] - [Number of items]

### Volume Trend
- [Trend over the time period]
- [Notable spikes or drops]

---

## FEEDBACK CATEGORIES

### Category 1: [Bug Reports]

**Subtotal:** [Number of items] ([%] of total)

**Key Issues:**
1. **[Issue Name]**
   - **Frequency:** [Number of mentions]
   - **Severity:** [Critical/High/Med/Low]
   - **User Quotes:**
     > "[Quote 1]"
     > "[Quote 2]"
   - **Impact:** [Who is affected]
   - **Suggested Fix:** [Recommended solution]

2. **[Issue Name]**
   [Same structure]

### Category 2: [UX/Usability Issues]

**Subtotal:** [Number of items] ([%] of total)

**Key Issues:**
1. **[Issue Name]**
   - **Frequency:** [Number of mentions]
   - **User Quotes:**
     > "[Quote 1]"
   - **Current Experience:** [What's broken]
   - **Desired Experience:** [What users want]
   - **Priority Score:** [High/Med/Low based on frequency × severity]

2. **[Issue Name]**
   [Same structure]

### Category 3: [Feature Requests]

**Subtotal:** [Number of items] ([%] of total)

**Feature Requests (by frequency):**
1. **[Feature Name]**
   - **Frequency:** [Number of mentions]
   - **User Quotes:**
     > "[Quote 1]"
     > "[Quote 2]"
   - **Use Case:** [Why users want this]
   - **User Segment:** [Who wants this]
   - **Business Value:** [Strategic fit]
   - **Implementation Effort:** [Small/Medium/Large]
   - **Priority:** [High/Med/Low]

2. **[Feature Name]**
   [Same structure]

### Category 4: [Performance Issues]

**Subtotal:** [Number of items] ([%] of total)

**Key Issues:**
1. **[Issue Name]**
   - **Frequency:** [Number of mentions]
   - **User Quotes:**
     > "[Quote]"
   - **When It Occurs:** [Context]
   - **Impact on Experience:** [Severity]

### Category 5: [Pricing/Value Issues]

**Subtotal:** [Number of items] ([%] of total)

**Key Issues:**
1. **[Issue Name]**
   - **Frequency:** [Number of mentions]
   - **User Quotes:**
     > "[Quote]"
   - **Concern:** [What users are saying]

### Category 6: [Customer Support/Service]

**Subtotal:** [Number of items] ([%] of total)

**Key Issues:**
1. **[Issue Name]**
   - **Frequency:** [Number of mentions]
   - **User Quotes:**
     > "[Quote]"
   - **Concern:** [What users are saying]

---

## PRIORITIZED ACTION ITEMS

### Critical Priority (Fix Immediately)
| Issue | Category | Users Affected | Effort | Recommendation |
|-------|----------|----------------|--------|----------------|
| [Issue 1] | [Bug] | [%] | [Small] | [Fix immediately] |

### High Priority (Fix This Sprint)
| Issue | Category | Users Affected | Effort | Recommendation |
|-------|----------|----------------|--------|----------------|
| [Issue 1] | [UX] | [%] | [Medium] | [Add to sprint] |

### Medium Priority (This Quarter)
| Issue | Category | Users Affected | Effort | Recommendation |
|-------|----------|----------------|--------|----------------|
| [Issue 1] | [Feature] | [%] | [Large] | [Add to roadmap] |

### Low Priority (Backlog)
| Issue | Category | Users Affected | Effort | Recommendation |
|-------|----------|----------------|--------|----------------|
| [Issue 1] | [Feature] | [%] | [Large] | [Consider later] |

---

## SEGMENT ANALYSIS

### By User Tier/Plan
| Segment | Top Issue | Sentiment | Opportunity |
|---------|-----------|-----------|-------------|
| [Free users] | [Issue] | [Sentiment] | [Opportunity] |
| [Paid users] | [Issue] | [Sentiment] | [Opportunity] |

### By Tenure
| Segment | Top Issue | Insight |
|---------|-----------|---------|
| [New users] | [Issue] | [Analysis] |
| [Power users] | [Issue] | [Analysis] |

### By Geographic Region
| Region | Top Issue | Insight |
|--------|-----------|---------|
| [Region 1] | [Issue] | [Analysis] |

---

## USER PERSONAS IN FEEDBACK

### Persona 1: [Name - e.g., "Frustrated Power User"]
**Characteristics:**
- [Behavior/characteristic 1]
- [Behavior/characteristic 2]

**Feedback Summary:**
- [Summary of their feedback]

**Key Quotes:**
> "[Quote 1]"
> "[Quote 2]"

**Recommended Response:**
- [How to address their concerns]

### Persona 2: [Name - e.g., "New User Struggling Onboarding"]
[Same structure]

---

## COMPETITIVE COMPARISON

### How Users Compare Us
| Dimension | Our Strength | Our Weakness | Competitor Mentioned |
|-----------|--------------|--------------|---------------------|
| [Feature A] | [What users like] | - | - |
| [Feature B] | - | [What users want] | [Competitor] |

### Competitor Mentions
| Competitor | Mentions | Context |
|------------|----------|---------|
| [Competitor A] | [X] | [Context] |
| [Competitor B] | [X] | [Context] |

---

## RECOMMENDATIONS

### Quick Wins (This Sprint)
1. **[Fix Name]**
   - **Why:** [Rationale]
   - **Impact:** [Expected outcome]
   - **Owner:** [Who]

2. **[Communication]**
   - **Why:** [Rationale]
   - **Impact:** [Expected outcome]

### Strategic Initiatives (This Quarter)
1. **[Initiative Name]**
   - **Why:** [Rationale]
   - **Expected Outcome:** [Result]
   - **Resources Needed:** [What's needed]

2. **[Initiative Name]**
   - **Why:** [Rationale]
   - **Expected Outcome:** [Result]

### Longer-term (Next 6 Months)
1. **[Initiative Name]**
   - **Why:** [Rationale]
   - **Strategic Value:** [Why it matters]

---

## FEEDBACK TO SHARE

### Quotes for Internal Use
**Positive Feedback to Celebrate:**
- > "[Quote 1]"
- > "[Quote 2]"

**Negative Feedback to Address:**
- > "[Quote 1]"
- > "[Quote 2]"

### Quotes for Marketing/Sales
- > "[Quote - anonymized]"
- > "[Quote - anonymized]"

---

## APPENDIX

### Raw Data Location
- [Link to full dataset]

### Methodology
- [How feedback was collected]
- [How analysis was conducted]

### Limitations
- [Known limitations of this analysis]
- [Feedback not captured]`
            }
        ],
        success_metrics: [
            'Experiment Win Rate',
            'Experiment Velocity',
            'Marginal Gain per Optimization',
            'Return on Ad Spend (ROAS)'
        ],
        failure_modes: [
            {
                problem: 'Optimizing Local Maxima',
                avoidance: 'Don\'t just polish the turd. Sometimes you need a Step Change, not an optimization.'
            },
            {
                problem: 'Data Digging (P-hacking)',
                avoidance: 'Define success criteria *before* running the test. Don\'t look for patterns until you find one.'
            },
            {
                problem: 'Over-optimizing',
                avoidance: 'Diminishing returns. Know when good is good enough and move to the next thing.'
            }
        ]
    },
    'cross-cutting': {
        id: 'cross-cutting',
        label: 'Cross-Cutting',
        definition: 'Cross-cutting themes are skills, philosophies, and practices that apply across all stages of the product lifecycle, such as leadership, communication, and career development.',
        objectives: [
            'Master executive communication and presence',
            'Develop deep user empathy and "Product Sense"',
            'Build and lead high-performing, aligned teams',
            'Cultivate rituals for decision-making and productivity',
            'Manage and grow your PM career'
        ],
        tools: [
            'Decision Logs',
            'Pre-read Documents',
            'Flash Tags',
            '1:1 Templates',
            'Career Ladders / Rubrics'
        ],
        frameworks: [
            'SPADE (Decision Making)',
            'The 70/20/10 Rule',
            'Commander\'s Intent',
            'The Messy Middle'
        ],
        ai_workflows: [
            {
                title: 'Decision Logic Auditor',
                description: 'Critiques the logic and assumptions in a decision log or memo.',
                prompt_template: 'Review this decision log: [Content]. Identify: 1. Implicit biases. 2. Missing data points. 3. Potential second-order effects. 4. Confidence level assessment.'
            },
            {
                title: 'Executive Summary Generator',
                description: 'Compresses complex project updates for executive-level audiences.',
                prompt_template: 'Compress this detailed technical report into a 3-bullet executive summary. Focus on: 1. Binary decisions needed. 2. Critical risks. 3. Impact on North Star metric.'
            },
            {
                title: 'Career Development Advisor',
                description: 'Provides personalized growth recommendations based on PM career ladder.',
                prompt_template: 'Given this PMs current role [Role], strengths [Strengths], and growth areas [Areas], suggest: 1. Specific projects to pursue. 2. Skills to develop. 3. Mentors to seek.'
            },
            {
                title: '1:1 Meeting Prep Generator',
                description: 'Creates structured 1:1 agendas based on team member needs and recent context.',
                prompt_template: 'Generate a 30-min 1:1 agenda for [Team Member] who is working on [Current Project]. Include: 1. Blockers to address. 2. Career growth discussion. 3. Recognition items. 4. Feedback to give.'
            },
            {
                title: 'Stakeholder Communication Matrix',
                description: 'Maps out communication strategy for complex initiatives.',
                prompt_template: 'For initiative [Initiative Details], create a communication matrix: 1. Who needs what info. 2. What format (email, doc, meeting). 3. Frequency. 4. Key messages for each stakeholder group.'
            },
            {
                title: 'Team Retro Facilitator',
                description: 'Generates retrospective prompts and synthesizes team feedback.',
                prompt_template: 'Given this sprint retro feedback: [Feedback Data]. Generate: 1. Thematic grouping. 2. Top 3 action items. 3. Team health indicators to track next sprint.'
            }
        ],
        success_metrics: [
            'Decision Velocity',
            'Team Alignment Score',
            'Hiring Success Rate',
            'Promotion Velocity (Team)'
        ],
        failure_modes: [
            {
                problem: 'The "Update" Meeting',
                avoidance: 'Meetings are for decisions, not status updates. Use async channels for updates.'
            },
            {
                problem: 'Lack of "Commander\'s Intent"',
                avoidance: 'If the team doesn\'t know what success looks like, they can\'t be autonomous.'
            },
            {
                problem: 'Neglecting the "Messy Middle"',
                avoidance: 'Spend as much time on the bridge between vision and execution as on the vision itself.'
            }
        ]
    }
};
