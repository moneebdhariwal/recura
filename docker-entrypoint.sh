#!/bin/sh
set -e

echo "Running Composer Install..."
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "Running NPM Install..."
npm install

echo "Building NPM assets..."
npm run build

echo "Setting permissions..."
chown -R www-data:www-data /var/www/src/storage /var/www/src/bootstrap/cache
chmod -R 775 /var/www/src/storage /var/www/src/bootstrap/cache

if [ ! -f /var/www/src/database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch /var/www/src/database/database.sqlite
    chown www-data:www-data /var/www/src/database/database.sqlite
    chmod 775 /var/www/src/database/database.sqlite
fi

chown -R www-data:www-data /var/www/src/database
chmod -R 775 /var/www/src/database

echo "Generating application key..."
php artisan key:generate --force

echo "Clearing config and cache..."
php artisan config:clear
php artisan cache:clear

echo "Creating Storage Link..."
php artisan storage:link --force

echo "Running Database Migrations..."
sleep 10
php artisan migrate --force

exec "$@"