# @involvexs/flutter-dev-cli

A CLI that helps with Flutter development. Built with Bun, TypeScript, and Ink (React for terminal UI).

## Overview

This is an interactive command-line tool that provides a menu-driven interface for common Flutter development tasks. It allows you to:

- Create new Flutter projects
- Execute Flutter and Dart commands
- Access Flutter documentation
- Manage project settings

## Requirements

- **Bun** (latest) - Required runtime
- **Node.js** v16+ - Required for the built binary

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/involvex/flutter-dev-cli.git
cd flutter-dev-cli

# Install dependencies
bun install

# Build the CLI
bun run build

# Run directly
bun run start
```

### Global Installation

```bash
# Build first, then link globally
bun run build
npm link

# Or use bun link
bun run build
bun link
```

### Running with npx

```bash
npx @involvexs/flutter-dev-cli
```

## Usage

### Interactive Mode

Run the CLI without arguments to enter interactive menu mode:

```bash
bun run start
# or after building
./dist/cli.js
```

Navigate using:

- `↑/↓` - Navigate menu
- `Enter` - Select option
- `Esc` - Go back

### Command Line Flags

```bash
# Show help
flutter-dev-cli --help

# Show version
flutter-dev-cli --version

# Show about info
flutter-dev-cli --about

# Open settings
flutter-dev-cli --settings

# Show demo
flutter-dev-cli --demo
```

## Available Commands

| Command              | Description                                 |
| -------------------- | ------------------------------------------- |
| **New Project**      | Create a new Flutter project with templates |
| **Flutter Create**   | Run `flutter create` with options           |
| **Flutter Commands** | Execute common Flutter commands             |
| **Dart Commands**    | Execute Dart commands                       |
| **Flutter Docs**     | Browse Flutter documentation                |
| **Help**             | Show help information                       |
| **Settings**         | Configure CLI settings                      |
| **About**            | About this CLI                              |
| **Version**          | Show version info                           |
| **Exit**             | Exit the application                        |

## Development

### Project Structure

```
src/
├── cli.tsx           # Entry point
├── app.tsx           # Main app component
├── commands/         # CLI command implementations
│   ├── new-project.tsx
│   ├── flutter-create.tsx
│   ├── flutter-commands.tsx
│   ├── dart-commands.tsx
│   ├── flutter-docs.tsx
│   ├── help.tsx
│   ├── settings.tsx
│   ├── version.tsx
│   ├── about.tsx
│   └── exit.tsx
├── components/       # Reusable UI components
│   └── select-input.tsx
├── data/             # Data models/types
│   └── templates.ts
└── utils/            # Utility functions
    └── execute.tsx
```

### Build Commands

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `bun run dev`      | Run in hot reload development mode       |
| `bun run start`    | Run CLI directly with Bun                |
| `bun run build`    | Build to `dist/` (production)            |
| `bun run prebuild` | Format, lint, and typecheck before build |

### Code Quality

```bash
# Format code
bun run format

# Lint
bun run lint

# Fix lint issues
bun run lint:fix

# Type check
bun run typecheck
```

## Technology Stack

- **Runtime**: Bun
- **Language**: TypeScript
- **UI Framework**: Ink (React for CLI)
- **Package Manager**: Bun
- **Linter**: ESLint
- **Formatter**: Prettier

## License

MIT - See [LICENSE](LICENSE) for details.

## Author

[involvex](https://github.com/involvex)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.
