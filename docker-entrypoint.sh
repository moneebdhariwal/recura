#!/bin/sh
set -e

echo "Running Composer Install..."
composer install --no-interaction --prefer-dist --optimize-autoloader

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi

echo "Creating Storage Link..."
php artisan storage:link --force

echo "Running Database Migrations..."
sleep 10
php artisan migrate --force

exec "$@"