install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.json __tests__/__fixtures__/after.json

test:
	npm test

watch:
	npm run watch

lint:
	npx eslint .

publish:
	npm publish --dry-run
