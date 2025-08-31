import type { Section } from './types';

export const DEFAULT_SECTIONS: Section[] = [
  {
    id: 'title',
    title: 'Project Title',
    content: '# Project Title\n\nA brief description of your project.',
  },
  {
    id: 'description',
    title: 'Description',
    content: '## Description\n\nDetailed description of your project. What it does, why you built it, etc.',
  },
  {
    id: 'installation',
    title: 'Installation',
    content: '## Installation\n\nInstructions on how to install and set up your project.\n\n```bash\nnpm install my-project\n```',
  },
  {
    id: 'usage',
    title: 'Usage',
    content: '## Usage\n\nHow to use your project. Provide code examples if applicable.\n\n```javascript\nimport { something } from "my-project";\n\n// code example\nsomething();\n```',
  },
  {
    id: 'contributing',
    title: 'Contributing',
    content: '## Contributing\n\nGuidelines for how other developers can contribute to your project. Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.',
  },
  {
    id: 'license',
    title: 'License',
    content: '## License\n\nThis project is licensed under the MIT License - see the LICENSE.md file for details.',
  },
];

export const ALL_SECTIONS: Section[] = [
  ...DEFAULT_SECTIONS,
  { id: 'acknowledgements', title: 'Acknowledgements', content: '## Acknowledgements\n\n* Hat tip to anyone whose code was used\n* Inspiration\n* etc' },
  { id: 'api-reference', title: 'API Reference', content: '## API Reference\n\n#### `functionName()`\n\nDescription of the function.' },
  { id: 'appendix', title: 'Appendix', content: '## Appendix\n\nAny additional information.' },
  { id: 'authors', title: 'Authors', content: '## Authors\n\n* **[Your Name]** - *Initial work* - [Your Username](https://github.com/your-username)' },
  { id: 'badges', title: 'Badges', content: '## Badges\n\n[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)\n[![Build Status](https://travis-ci.org/user/repo.svg?branch=master)](https://travis-ci.org/user/repo)' },
  { id: 'color-reference', title: 'Color Reference', content: '## Color Reference\n\n| Color          | Hex                                                                |\n| -------------- | ------------------------------------------------------------------ |\n| Example Color  | ![#0a0a0a](https://via.placeholder.com/10/0a0a0a?text=+) `#0a0a0a` |' },
  { id: 'demo', title: 'Demo', content: '## Demo\n\nA link to a live demo or a GIF of the project in action.' },
  { id: 'deployment', title: 'Deployment', content: '## Deployment\n\nTo deploy this project run\n\n```bash\n  npm run deploy\n```' },
  { id: 'documentation', title: 'Documentation', content: '## Documentation\n\n[Link to full documentation](https://example.com)' },
  { id: 'environment-variables', title: 'Environment Variables', content: '## Environment Variables\n\nTo run this project, you will need to add the following environment variables to your `.env` file\n\n`API_KEY`\n\n`ANOTHER_API_KEY`' },
  { id: 'faq', title: 'FAQ', content: '## FAQ\n\n#### Question 1\n\nAnswer 1' },
  { id: 'features', title: 'Features', content: '## Features\n\n- Feature 1\n- Feature 2\n- Feature 3' },
  { id: 'feedback', title: 'Feedback', content: '## Feedback\n\nIf you have any feedback, please reach out to us at fake@fake.com' },
  { id: 'roadmap', title: 'Roadmap', content: '## Roadmap\n\n- Additional features\n- Upcoming changes' },
  { id: 'run-locally', title: 'Run Locally', content: '## Run Locally\n\nClone the project\n\n```bash\n  git clone https://link-to-project\n```\n\nGo to the project directory\n\n```bash\n  cd my-project\n```\n\nInstall dependencies\n\n```bash\n  npm install\n```\n\nStart the server\n\n```bash\n  npm run start\n```' },
  { id: 'support', title: 'Support', content: '## Support\n\nFor support, email fake@fake.com or join our Slack channel.' },
  { id: 'tech-stack', title: 'Tech Stack', content: '## Tech Stack\n\n**Client:** React, TailwindCSS\n\n**Server:** Node, Express' },
  { id: 'testing', title: 'Testing', content: '## Testing\n\nTo run tests, run the following command\n\n```bash\n  npm run test\n```' },
  { id: 'used-by', title: 'Used By', content: '## Used By\n\nThis project is used by the following companies:\n\n- Company 1\n- Company 2' },
];
