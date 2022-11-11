#!/bin/bash

cd_or_fail() { cd "$1" || exit 1; }

REPO_ROOT=$(cd_or_fail "$(dirname "$0")"; pwd -P)

cd_or_fail "$REPO_ROOT"
mkdir -p dist

(
    cd_or_fail src
    git ls-files . -z | tar --file - --create --null --files-from -
) | (
    cd_or_fail dist
    tar --file - --extract --verbose
)
