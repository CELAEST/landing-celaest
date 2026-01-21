// @ts-nocheck
const million = require('million/compiler');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
};

module.exports = million.next(nextConfig, {
  auto: { rsc: true },
});
