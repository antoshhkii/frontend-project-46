git: 
	git add .
	git commit -m 'minor fixes'
	git push

link:
	npm link

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

fix:
	npx eslint . --fix

publish:
	npm publish --dry-run

.PHONY: test