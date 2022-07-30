# 🍎 Mirio Kanban

## What makes this project 🧙🏻‍♂️

 Helps people organize their work

## Setup

To run this project, install it locally

- Clone repository
- Navigate to the project directory
- Install and run:

### Using yarn

```bash
yarn install
yarn dev
```

or

### Using npm

```bash
npm install
npm run dev
```

## Tests

- Run tests

```bash
yarn test
```

- Clear jest cache

```bash
yarn test:clear
```

## Technology Stack

1. React Effector Typescript Firebase
2. Geist-ui Linaria
3. Webpack

## Structure

Project designed by [FeatureSliced](https://feature-sliced.design/)

- `app` - application initialization
- `entities` - business entities
- `pages` - application pages
- `features` - parts of the application functionality
- `shared` - reused infrastructure code

```sh
└── src/
    ├── app/
    ├── pages/
    ├── entities/
    ├── features/
    ├── shared/
    ├── widgets/
    └── index.tsx/
