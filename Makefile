install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/json/before-nested.json __tests__/__fixtures__/json/after-nested.json

test:
	npm test

watch:
	npm run watch

lint:
	npx eslint .

publish:
	npm publish --dry-run
