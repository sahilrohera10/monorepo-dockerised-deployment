# Monorepo Deployment

A production-ready monorepo setup using Yarn workspaces with shared utilities and best practices.

## Structure

```
monorepo_deployment/
├── packages/              # Workspace packages
│   ├── example-package/   # Example/UI package (port 3000)
│   ├── core-package/      # Core business logic (port 3001)
│   └── shared/            # Shared utilities (database, config, etc.)
├── package.json           # Root package configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Monorepo Architecture

### Packages

1. **@monorepo/shared** - Shared utilities
   - Database connection singleton
   - Environment configuration
   - Common utilities used across packages

2. **@monorepo/example-package** - Example application
   - Express server on port 3000
   - Uses shared database connection

3. **@monorepo/core-package** - Core business logic
   - Express server on port 3001
   - Uses shared database connection

### Design Decisions

✅ **Shared Database Connection**: Singleton pattern ensures all packages share the same MongoDB connection
✅ **Configuration Management**: Centralized environment configuration in `@monorepo/shared`
✅ **Code Reusability**: No duplication of db/dbConnect.js across packages
✅ **Workspace Protocol**: Using `workspace:*` for internal dependencies

## Getting Started

1. Install dependencies:
```bash
yarn install
```

2. Start a specific package:
```bash
# Start example package
yarn start:example
# or
yarn workspace @monorepo/example-package start

# Start core package
yarn start:core
# or
yarn workspace @monorepo/core-package start
```

3. Start all packages:
```bash
yarn start:all
```

## Available Scripts

### Root Scripts

- `yarn start` - Start the example package (default)
- `yarn start:example` - Start example package on port 3000
- `yarn start:core` - Start core package on port 3001
- `yarn start:all` - Start all packages
- `yarn build` - Build all packages
- `yarn test:all` - Run tests in all packages
- `yarn clean` - Clean all packages

## Environment Configuration

Set environment variables in `.env` file (not committed):

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/monorepo_deployment

# Environment
NODE_ENV=development
```

Configuration is loaded from `@monorepo/shared/config/env.js`

## Working with Packages

### Using the Shared Package

All packages can import shared utilities:

```javascript
import { connectToDatabase, config } from '@monorepo/shared';

// Connect to database (singleton pattern)
const db = await connectToDatabase();

// Access configuration
console.log(config.nodeEnv);
console.log(config.db.connectionString);
```

### Install a dependency in a specific package:
```bash
yarn workspace @monorepo/example-package add <dependency>
```

### Add a dependency to the root:
```bash
yarn add -W <dependency>
```

### Add a shared dependency to all packages:
```bash
yarn workspace @monorepo/shared add <dependency>
```

## Adding a New Package

1. Create the package directory:
```bash
mkdir -p packages/my-package
cd packages/my-package
```

2. Initialize with yarn:
```bash
yarn init -w
```

3. Edit the generated `package.json`:
```json
{
  "name": "@monorepo/my-package",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "@monorepo/shared": "workspace:*",
    "express": "^5.1.0"
  }
}
```

4. Install dependencies:
```bash
yarn install
```

5. Use shared utilities in your package:
```javascript
import { connectToDatabase } from '@monorepo/shared';
```

## Workspaces

This monorepo uses **Yarn 4.10.3** workspaces with PnP (Plug'n'Play). All packages in the `packages/` directory are automatically linked together.

## Database Connection Pattern

The shared package implements a singleton pattern for database connections:

- **First connection**: Creates a new MongoDB connection
- **Subsequent connections**: Reuses the existing connection
- **No duplicate connections**: All packages share the same mongoose instance

This prevents connection pool exhaustion and ensures consistent database state.

## Best Practices Implemented

✅ Shared utilities in dedicated package
✅ Singleton database connection
✅ Centralized configuration management
✅ ES modules throughout
✅ Proper package naming with @monorepo/ namespace
✅ Workspace dependencies with `workspace:*` protocol
✅ Clear separation of concerns
