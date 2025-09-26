# Copilot Instructions for ioredis-mock

## Project Overview

ioredis-mock is a JavaScript library that emulates [ioredis](https://github.com/luin/ioredis) by performing all Redis operations in-memory. It's designed to provide a fast, reliable Redis mock for testing environments, CI/CD pipelines, and development where running a real Redis server is impractical or unnecessary.

This project offers a comprehensive Redis-compatible API with 63% command coverage, supporting strings, lists, sets, sorted sets, hashes, streams, pub/sub, transactions, and Lua scripting.

## Architecture

### Core Structure

- **`src/index.js`**: Main entry point, Redis class implementation
- **`src/commands/`**: Individual Redis command implementations (~150 command files)
- **`src/commands-stream/`**: Streaming command variants
- **`src/commands-utils/`**: Shared utilities for command processing
- **`src/data.js`**: In-memory data structure management
- **`src/expires.js`**: TTL and expiration handling
- **`src/lua.js`**: Lua scripting support via Fengari
- **`src/pipeline.js`**: Transaction and pipeline support
- **`src/context.js`**: Context management for multiple instances

### Key Design Patterns

- Each Redis command is implemented as a separate module in `src/commands/`
- Commands export both regular and "Buffer" variants (e.g., `get` and `getBuffer`)
- All operations are synchronous and in-memory
- Data persistence is simulated but not actual file I/O
- Event-driven architecture for keyspace notifications and pub/sub

## Development Workflow

### Setup

```bash
npm install
```

### Essential Commands

```bash
# Run all tests (main test suite)
npm test

# Run full test suite including builds and integration tests
npm run posttest

# Run specific test suites
npm run test:integration    # Integration tests with built lib
npm run test:browser.js     # Browser compatibility tests
npm run test:e2e           # End-to-end tests against real Redis

# Build the library
npm run build:lib          # Node.js build (ESM → CommonJS)
npm run build:browser.js   # Browser build with bundling

# Linting and formatting
npm run lint               # Check code style
npm run lint:fix           # Fix linting issues automatically

# Update compatibility data
npm run update-compat      # Update compat.md with latest command support
npm run update-data        # Fetch latest Redis command data
```

### Build Targets

- **Node.js** (`lib/`): Bundled CommonJS for npm distribution
- **Browser** (`browser.js`): Bundled ESM with polyfills for web usage

## Testing Strategy

### Test Organization

- **`test/functional/`**: Core functionality and utilities
- **`test/integration/`**: Full integration tests for each command
- **`test/integration/commands/`**: Individual command behavior tests

### Test Philosophy

- Tests compare ioredis-mock behavior against real ioredis/Redis
- Extensive use of snapshots for complex command outputs
- Browser compatibility testing with jsdom
- Integration testing with built artifacts

### Running Tests

- Regular tests run against source files (`src/`)
- Integration tests run against built library (`lib/`)
- Browser tests run against browser build (`browser.js`)

## Code Style & Standards

### ESLint Configuration

- **Base**: Airbnb style guide + Prettier
- **Import sorting**: Enforced via simple-import-sort plugin
- **Quotes**: Single quotes preferred, avoid escaping
- **Functions**: Prefer function expressions over arrow functions where appropriate

### Code Patterns

```javascript
// Command structure example
export function commandName(arg1, arg2) {
  // Implementation
  return result
}

export function commandNameBuffer(...args) {
  const val = commandName.apply(this, args)
  return convertStringToBuffer(val)
}
```

### File Naming

- Commands: lowercase with dashes (e.g., `zrevrangebyscore.js`)
- Utilities: camelCase (e.g., `convertStringToBuffer.js`)
- Tests: mirror source structure

## Redis Command Implementation

### Adding New Commands

1. Create `src/commands/commandname.js`
2. Export main function and Buffer variant
3. Add to `src/commands/index.js` exports
4. Create integration test in `test/integration/commands/`
5. Update compatibility table with `npm run update-compat`

### Command Patterns

- **String commands**: Direct value manipulation
- **List commands**: Array operations with Redis semantics
- **Hash commands**: Object property operations
- **Set commands**: Array with uniqueness constraints
- **Sorted sets**: Maintaining score-based ordering
- **Pub/Sub**: Event emitter based implementation

### Buffer Handling

- Every command should have a Buffer variant
- Use `convertStringToBuffer` utility for string→buffer conversion
- Buffer commands typically call regular command and convert result

## Key Features

### Lua Scripting

- Uses Fengari (Lua in JavaScript) for script execution
- Supports `EVAL`, `EVALSHA` commands
- Script caching and error handling

### Keyspace Notifications

- Event-driven notifications for key operations
- Configurable via `notifyKeyspaceEvents` option
- Supports pattern matching and filtering

### Multiple Instances

- Context isolation between Redis instances
- Shared utilities but separate data stores
- Proper cleanup and memory management

## Compatibility Management

### Compatibility Table (`compat.md`)

- Auto-generated via `scripts/update-compat.js`
- Shows Redis → ioredis → ioredis-mock support matrix
- Updated automatically in CI/CD

### Command Data

- `data/` directory contains Redis command metadata
- Updated via `scripts/update-data.js` from real Redis instance
- Used for compatibility checking and documentation

## Browser Support

### Polyfills Required

- Stream, crypto, buffer modules
- Process object simulation
- Custom build configuration in `browser-shims.js`

### Build Process

- ESBuild bundles with external dependencies
- Minification and source maps for production
- Separate test suite for browser compatibility

## Common Gotchas

1. **Async/Sync Mismatch**: All operations are synchronous, unlike real Redis
2. **Buffer Variants**: Always implement both string and buffer versions
3. **Context Isolation**: Ensure proper context handling for multiple instances
4. **Error Messages**: Match Redis error message formats exactly
5. **Type Coercion**: Redis-style string/number conversion rules apply

## Contributing Guidelines

- Run full test suite (`npm run posttest`) before submitting
- Update compatibility table if adding commands
- Follow existing code patterns and naming conventions
- Add comprehensive tests for new functionality
- Consider browser compatibility for new features
