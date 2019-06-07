install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js __tests__/__fixtures__/before.ini __tests__/__fixtures__/after.ini

test:
	npm test

watch:
	npm run watch

lint:
	npx eslint .

publish:
	npm publish --dry-run
