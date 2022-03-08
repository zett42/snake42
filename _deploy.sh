#!/bin/bash

# abort on errors
set -e

RED=$'\e[1;31m'; NOCOLOR=$'\e[0m'

read -p "${RED}Are you sure to deploy current build to GitHub Pages (y/n)? ${NOCOLOR} " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	# navigate into the build output directory
	cd app
	
	rm -rf .git

	git init
	git add -A
	git commit -m 'deploy'

	echo "Deploying to https://zett42.github.io/snake42"
	git push -f git@github.com:zett42/snake42.git master:gh-pages

	cd -
fi

