#!/bin/sh

set -e

host="$1"
shift

echo "Waiting for database at $host..."

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "$POSTGRES_USER" -c '\q' >/dev/null 2>&1; do
  sleep 1
done

echo "Database is ready!"
exec "$@"