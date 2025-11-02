# @monorepo/shared

Shared utilities and configurations for the monorepo.

## Usage

### Database Connection

```javascript
import { connectToDatabase } from '@monorepo/shared';

const db = await connectToDatabase();
```

### Multiple packages sharing same connection

The database connection is singleton, so multiple packages importing this will share the same connection instance.

## Features

- Singleton database connection
- Automatic connection reuse
- Proper cleanup methods
- Error handling

