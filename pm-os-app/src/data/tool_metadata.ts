export interface ToolMetadata {
    name: string;
    url: string;
    logoUrl: string;
    description?: string;
}

export const toolMetadata: Record<string, ToolMetadata> = {
    // Discovery
    'UserTesting': {
        name: 'UserTesting',
        url: 'https://www.usertesting.com',
        logoUrl: 'https://logo.clearbit.com/usertesting.com'
    },
    'Maze': {
        name: 'Maze',
        url: 'https://maze.co',
        logoUrl: 'https://logo.clearbit.com/maze.co'
    },
    'Typeform': {
        name: 'Typeform',
        url: 'https://www.typeform.com',
        logoUrl: 'https://logo.clearbit.com/typeform.com'
    },
    'SurveyMonkey': {
        name: 'SurveyMonkey',
        url: 'https://www.surveymonkey.com',
        logoUrl: 'https://logo.clearbit.com/surveymonkey.com'
    },
    'Crunchbase': {
        name: 'Crunchbase',
        url: 'https://www.crunchbase.com',
        logoUrl: 'https://logo.clearbit.com/crunchbase.com'
    },
    'Chorus': {
        name: 'Chorus',
        url: 'https://www.chorus.ai',
        logoUrl: 'https://logo.clearbit.com/chorus.ai'
    },
    'Gong': {
        name: 'Gong',
        url: 'https://www.gong.io',
        logoUrl: 'https://logo.clearbit.com/gong.io'
    },
    // Strategy
    'Productboard': {
        name: 'Productboard',
        url: 'https://www.productboard.com',
        logoUrl: 'https://logo.clearbit.com/productboard.com'
    },
    'Roadmunk': {
        name: 'Roadmunk',
        url: 'https://roadmunk.com',
        logoUrl: 'https://logo.clearbit.com/roadmunk.com'
    },
    'Aha!': {
        name: 'Aha!',
        url: 'https://www.aha.io',
        logoUrl: 'https://logo.clearbit.com/aha.io'
    },
    'Strategyzer': {
        name: 'Strategyzer',
        url: 'https://www.strategyzer.com',
        logoUrl: 'https://logo.clearbit.com/strategyzer.com'
    },
    // Design
    'Figma': {
        name: 'Figma',
        url: 'https://www.figma.com',
        logoUrl: 'https://logo.clearbit.com/figma.com'
    },
    'Sketch': {
        name: 'Sketch',
        url: 'https://www.sketch.com',
        logoUrl: 'https://logo.clearbit.com/sketch.com'
    },
    'Marvel': {
        name: 'Marvel',
        url: 'https://marvelapp.com',
        logoUrl: 'https://logo.clearbit.com/marvelapp.com'
    },
    'InVision': {
        name: 'InVision',
        url: 'https://www.invisionapp.com',
        logoUrl: 'https://logo.clearbit.com/invisionapp.com'
    },
    'Whimsical': {
        name: 'Whimsical',
        url: 'https://whimsical.com',
        logoUrl: 'https://logo.clearbit.com/whimsical.com'
    },
    'Miro': {
        name: 'Miro',
        url: 'https://miro.com',
        logoUrl: 'https://logo.clearbit.com/miro.com'
    },
    'Storybook': {
        name: 'Storybook',
        url: 'https://storybook.js.org',
        logoUrl: 'https://logo.clearbit.com/storybook.js.org'
    },
    'Zeplin': {
        name: 'Zeplin',
        url: 'https://zeplin.io',
        logoUrl: 'https://logo.clearbit.com/zeplin.io'
    },
    'Framerm': {
        name: 'Framer',
        url: 'https://www.framer.com',
        logoUrl: 'https://logo.clearbit.com/framer.com'
    },
    // Development
    'GitHub': {
        name: 'GitHub',
        url: 'https://github.com',
        logoUrl: 'https://logo.clearbit.com/github.com'
    },
    'GitLab': {
        name: 'GitLab',
        url: 'https://about.gitlab.com',
        logoUrl: 'https://logo.clearbit.com/gitlab.com'
    },
    'Linear': {
        name: 'Linear',
        url: 'https://linear.app',
        logoUrl: 'https://logo.clearbit.com/linear.app'
    },
    'Jira': {
        name: 'Jira',
        url: 'https://www.atlassian.com/software/jira',
        logoUrl: 'https://logo.clearbit.com/atlassian.com'
    },
    'Postman': {
        name: 'Postman',
        url: 'https://www.postman.com',
        logoUrl: 'https://logo.clearbit.com/postman.com'
    },
    'Sentry': {
        name: 'Sentry',
        url: 'https://sentry.io',
        logoUrl: 'https://logo.clearbit.com/sentry.io'
    },
    'Datadog': {
        name: 'Datadog',
        url: 'https://www.datadoghq.com',
        logoUrl: 'https://logo.clearbit.com/datadoghq.com'
    },
    'New Relic': {
        name: 'New Relic',
        url: 'https://newrelic.com',
        logoUrl: 'https://logo.clearbit.com/newrelic.com'
    },
    // Launch
    'Product Hunt': {
        name: 'Product Hunt',
        url: 'https://www.producthunt.com',
        logoUrl: 'https://logo.clearbit.com/producthunt.com'
    },
    'Intercom': {
        name: 'Intercom',
        url: 'https://www.intercom.com',
        logoUrl: 'https://logo.clearbit.com/intercom.com'
    },
    'Help Scout': {
        name: 'Help Scout',
        url: 'https://www.helpscout.com',
        logoUrl: 'https://logo.clearbit.com/helpscout.com'
    },
    'Mailchimp': {
        name: 'Mailchimp',
        url: 'https://mailchimp.com',
        logoUrl: 'https://logo.clearbit.com/mailchimp.com'
    },
    'ConvertKit': {
        name: 'ConvertKit',
        url: 'https://convertkit.com',
        logoUrl: 'https://logo.clearbit.com/convertkit.com'
    },
    'Buffer': {
        name: 'Buffer',
        url: 'https://buffer.com',
        logoUrl: 'https://logo.clearbit.com/buffer.com'
    },
    // Growth
    'Amplitude': {
        name: 'Amplitude',
        url: 'https://amplitude.com',
        logoUrl: 'https://logo.clearbit.com/amplitude.com'
    },
    'Mixpanel': {
        name: 'Mixpanel',
        url: 'https://mixpanel.com',
        logoUrl: 'https://logo.clearbit.com/mixpanel.com'
    },
    'Segment': {
        name: 'Segment',
        url: 'https://segment.com',
        logoUrl: 'https://logo.clearbit.com/segment.com'
    },
    'Optimizely': {
        name: 'Optimizely',
        url: 'https://www.optimizely.com',
        logoUrl: 'https://logo.clearbit.com/optimizely.com'
    },
    'VWO': {
        name: 'VWO',
        url: 'https://vwo.com',
        logoUrl: 'https://logo.clearbit.com/vwo.com'
    },
    'Braze': {
        name: 'Braze',
        url: 'https://www.braze.com',
        logoUrl: 'https://logo.clearbit.com/braze.com'
    },
    'Customer.io': {
        name: 'Customer.io',
        url: 'https://customer.io',
        logoUrl: 'https://logo.clearbit.com/customer.io'
    },
    // Scale
    'Workday': {
        name: 'Workday',
        url: 'https://www.workday.com',
        logoUrl: 'https://logo.clearbit.com/workday.com'
    },
    'Greenhouse': {
        name: 'Greenhouse',
        url: 'https://www.greenhouse.io',
        logoUrl: 'https://logo.clearbit.com/greenhouse.io'
    },
    'Confluence': {
        name: 'Confluence',
        url: 'https://www.atlassian.com/software/confluence',
        logoUrl: 'https://logo.clearbit.com/atlassian.com'
    },
    'Notion': {
        name: 'Notion',
        url: 'https://www.notion.so',
        logoUrl: 'https://logo.clearbit.com/notion.so'
    },
    'Lattice': {
        name: 'Lattice',
        url: 'https://lattice.com',
        logoUrl: 'https://logo.clearbit.com/lattice.com'
    },
    'Snowflake': {
        name: 'Snowflake',
        url: 'https://www.snowflake.com',
        logoUrl: 'https://logo.clearbit.com/snowflake.com'
    },
    'Slack': {
        name: 'Slack',
        url: 'https://slack.com',
        logoUrl: 'https://logo.clearbit.com/slack.com'
    },
    'Microsoft Teams': {
        name: 'Microsoft Teams',
        url: 'https://www.microsoft.com/en-us/microsoft-teams/group-chat-software',
        logoUrl: 'https://logo.clearbit.com/microsoft.com'
    },
    // Optimization
    'FullStory': {
        name: 'FullStory',
        url: 'https://www.fullstory.com',
        logoUrl: 'https://logo.clearbit.com/fullstory.com'
    },
    'Hotjar': {
        name: 'Hotjar',
        url: 'https://www.hotjar.com',
        logoUrl: 'https://logo.clearbit.com/hotjar.com'
    },
    'Statsig': {
        name: 'Statsig',
        url: 'https://statsig.com',
        logoUrl: 'https://logo.clearbit.com/statsig.com'
    },
    'Visual Website Optimizer': {
        name: 'VWO',
        url: 'https://vwo.com',
        logoUrl: 'https://logo.clearbit.com/vwo.com'
    }
};
