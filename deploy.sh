#!/bin/bash

node ace build --production --ignore-ts-errors

cd build
pnpm install -P