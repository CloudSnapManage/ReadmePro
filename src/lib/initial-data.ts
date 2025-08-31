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
