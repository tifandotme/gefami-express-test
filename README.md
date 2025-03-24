# gefami-express-test

## Prerequisites

Make sure you have these programs installed:

- [bun](https://bun.sh)
- [xh](https://github.com/ducaale/xh) (optional, to test the APIs using below commands)

## Starting server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun index.ts
```

## Endpoints

### GET

```bash
# Success: With correct headers
xh -v GET http://localhost:3000/api/users user-id:ifabula scope:user

# Fail: Without required headers
xh -v GET http://localhost:3000/api/users
```

### POST

```bash
# Success: With correct headers
xh -v POST http://localhost:3000/api/users user-id:ifabula scope:user name=Test email=test@example.com

# Fail: Without required headers
xh -v POST http://localhost:3000/api/users name=Test email=test@example.com
```

## Demo

[![asciicast](https://asciinema.org/a/HWXveHmfodVFNYqEYRYLvzMdB.svg)](https://asciinema.org/a/HWXveHmfodVFNYqEYRYLvzMdB)
