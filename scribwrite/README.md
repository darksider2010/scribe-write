# ScribeWrite 🚀

**Real-Time Markdown Editor with AI-Powered Summarization**

A modern, full-stack markdown editor featuring live collaboration, context-aware AI summarization, and developer-focused productivity tools. Built to solve real-world documentation challenges with automated workflows.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18-green.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)

## ✨ Features

### Core Functionality
- **Real-Time Editing**: Live markdown preview with instant synchronization
- **AI Summarization**: Context-aware document summarization using LLM APIs
- **Collaborative Cursors**: See where others are editing in real-time
- **Version History**: Automatic snapshots with rollback capabilities
- **Export Options**: PDF, HTML, and plain text export

### Developer Tools
- **CLI Integration**: Command-line tool for batch processing markdown files
- **API Hooks**: Webhook support for CI/CD pipeline integration
- **Custom Themes**: Extensible theming system with CSS variables
- **Plugin Architecture**: Add custom functionality via plugins

### AI-Powered Features
- **Smart Summaries**: Generate concise summaries of long documents
- **Context Suggestions**: AI-powered writing suggestions based on content
- **Auto-Formatting**: Intelligent markdown formatting and structure
- **Grammar Enhancement**: Real-time grammar and style improvements

## 🏗️ Architecture

```
scribwrite/
├── client/          # React frontend with WebSocket support
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── services/    # API and WebSocket clients
│   │   └── utils/       # Helper functions
├── server/          # Node.js backend with Express
│   ├── routes/      # API endpoints
│   ├── middleware/  # Authentication, rate limiting
│   ├── models/      # Database schemas
│   └── services/    # Business logic, AI integration
├── docs/            # Documentation and guides
└── .github/         # CI/CD workflows
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **WebSocket** for real-time communication
- **CodeMirror 6** for markdown editing
- **TailwindCSS** for styling
- **Zustand** for state management

### Backend
- **Node.js** with Express
- **Socket.IO** for WebSocket handling
- **PostgreSQL** for data persistence
- **Redis** for caching and session management
- **OpenAI API** for AI features

### DevOps
- **Docker** for containerization
- **GitHub Actions** for CI/CD
- **Jest** for testing
- **ESLint** & **Prettier** for code quality

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18
- PostgreSQL >= 14
- Redis >= 6
- OpenAI API key (optional for AI features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/scribwrite.git
cd scribwrite
```

2. **Install dependencies**
```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

3. **Set up environment variables**
```bash
# Copy example env files
cp client/.env.example client/.env
cp server/.env.example server/.env
```

4. **Start development servers**
```bash
# From root directory
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000

## 📖 Usage

### Basic Editing
1. Create a new document or open an existing one
2. Write markdown in the left panel
3. View live preview in the right panel
4. Use toolbar for common formatting options

### AI Summarization
1. Write or paste your content
2. Click the "Summarize" button in the toolbar
3. Choose summary length (short, medium, long)
4. Review and edit the generated summary

### CLI Tool
```bash
# Install globally
npm install -g @scribwrite/cli

# Process markdown files
scribwrite summarize input.md --output summary.md

# Batch process directory
scribwrite batch ./docs --format pdf
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suite
npm run test:client
npm run test:server
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) and [Code of Conduct](docs/CODE_OF_CONDUCT.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern documentation tools
- Built with love for the developer community
- Thanks to all contributors and supporters

---

**Made with ❤️ by the ScribeWrite Team**
