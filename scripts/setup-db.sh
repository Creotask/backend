#!/bin/bash

# Exit on error
set -e

echo "🔄 Setting up database..."

# Generate Prisma client
echo "📦 Generating Prisma client..."
pnpm prisma generate

# Push schema changes to the database
echo "🚀 Applying schema to the database..."
pnpm prisma db push

echo "✅ Database setup complete!"