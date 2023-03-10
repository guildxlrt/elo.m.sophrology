#!/bin/bash
node ace build --production --ignore-ts-errors

cd build
pnpm install -P --no-optional


cd ..
cp .env build/.env

node ace migration:run