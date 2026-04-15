# AGENTS.md - involvexs-flutter-cli

This file provides guidelines for agentic coding agents operating in this repository.

## Project Overview

This is a **Bun/TypeScript CLI** project (not Flutter - despite the name). It uses React with Ink for building interactive CLI applications.

## Build Commands

```bash
# Development
bun run dev          # Hot reload development server
bun run start        # Run CLI directly with bun

# Building
bun run build        # Build to dist/ (production)
bun run prebuild     # Format, lint, and typecheck before build

# Code Quality
bun run format       # Format with Prettier
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues automatically
bun run typecheck    # TypeScript type checking
```

## Running Single Test

TODO: No test framework is currently set up. To add tests:

1. Add a test script to package.json (e.g., `"test": "bun test"`)
2. Create test files with `.test.ts` or `.test.tsx` extension
3. Run single test: `bun test <path-to-test-file>`

## Code Style Guidelines

### Formatting

- **Indentation**: Tabs (see `.editorconfig`)
- **Line endings**: LF (Unix-style)
- **File encoding**: UTF-8
- **Trailing whitespace**: Trimmed
- **Final newline**: Required
- Use **Prettier** with `@involvex/prettier-config` for all formatting

### TypeScript Configuration

- **Target**: ESNext
- **Module**: ESNext
- **JSX**: react-jsx (automatic runtime)
- **Strict mode enabled**: Do not disable strict checks
- **Avoid `any`**: Use `unknown` or proper typing instead

### Import Ordering

Use Prettier plugins for automatic import sorting:

- `prettier-plugin-organize-imports`
- `prettier-plugin-sort-imports`
- `prettier-plugin-packagejson`

### ESLint Rules

The project uses TypeScript ESLint with React plugins. Key rules:

- **Unused variables**: Error (except variables starting with `_`)
  ```typescript
  const _unusedVar = 'ok' // Allowed
  ```
- **`any` type**: Warn - avoid when possible
- **Console.log**: Warn - use proper logging instead

### Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent`)
- **Functions/variables**: camelCase (e.g., `myFunction`, `myVariable`)
- **Constants**: UPPER_SNAKE_CASE or camelCase with prefix (e.g., `MAX_RETRIES`)
- **Files**: kebab-case for utilities, PascalCase for components

### React/JSX Guidelines

- Use **automatic JSX runtime** - no need to import React
- Use **functional components** with arrow functions or `function` keyword
- Use **React hooks** for state management (`useState`, `useEffect`, etc.)
- Props should be typed with interfaces or types

```typescript
interface MyComponentProps {
  name: string;
  onAction: () => void;
}

const MyComponent = ({ name, onAction }: MyComponentProps) => {
  return <Box>{name}</Box>;
};
```

### Error Handling

- Use **try/catch** for async operations
- Handle errors and provide user-friendly messages
- Use **typed errors** when possible
- Log errors appropriately for debugging

```typescript
try {
	await riskyOperation()
} catch (error) {
	if (error instanceof SpecificError) {
		// Handle specific error
	}
	// Log or re-throw
}
```

### Ink CLI Patterns

This project uses Ink for CLI UI. Key patterns:

- Use `<Box>` and `<Text>` for layout
- Use `<TextInput>` and `<SelectInput>` for user input
- Handle exit with process.exit()
- Support `--help` and `--version` flags

```typescript
import { Box, Text } from 'ink';

const MyCLI = () => (
  <Box flexDirection="column">
    <Text>Hello World</Text>
  </Box>
);
```

## Directory Structure

```
src/
  cli.tsx       # Entry point
  app.tsx       # Main app component
  commands/     # CLI command implementations
  components/   # Reusable UI components
  data/         # Data models/types
  utils/        # Utility functions
```

## Important Notes

1. **Prebuild step**: `bun run build` automatically runs format, lint:fix, and typecheck via `prebuild` script
2. **Type checking**: Always run `bun run typecheck` before committing
3. **No Flutter**: Despite the project name, this is a pure Node/Bun CLI project
4. **.agents/skills**: Contains Flutter-related skills that are not used by this project
