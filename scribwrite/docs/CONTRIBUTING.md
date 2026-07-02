# Contributing to ScribeWrite

Thank you for considering contributing to ScribeWrite! We welcome contributions from the community.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to keep our community approachable and respectable.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible
* Include details about your environment (OS, browser, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a detailed description of the suggested enhancement
* Explain why this enhancement would be useful
* List some examples of how this enhancement would be used

### Pull Requests

* Fill in the required template
* Follow the TypeScript style guide
* Include comments in your code where necessary
* Update documentation as needed
* Test your changes thoroughly

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/scribwrite.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Install dependencies:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```
5. Set up environment variables (copy `.env.example` to `.env`)
6. Run the development servers:
   ```bash
   npm run dev  # from root directory
   ```

## Coding Guidelines

### TypeScript

* Use TypeScript for all new code
* Follow strict mode settings
* Add proper type annotations
* Avoid using `any` type when possible

### Code Style

* Use Prettier for formatting
* Follow ESLint rules
* Use meaningful variable names
* Keep functions small and focused

### Commits

* Use clear and descriptive commit messages
* Follow conventional commits format when possible
* Reference issues in commit messages

Example:
```
feat: add real-time collaboration cursors
fix: resolve markdown rendering issue with code blocks
docs: update API documentation
```

## Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Aim for good test coverage

Running tests:
```bash
npm test          # Run all tests
npm run test:coverage  # Run with coverage
```

## Documentation

* Update README.md for user-facing changes
* Add inline comments for complex logic
* Update API documentation when changing endpoints

## Questions?

Feel free to open an issue for any questions or concerns about contributing.

Thank you for contributing to ScribeWrite! 🎉
