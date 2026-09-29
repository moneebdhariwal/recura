#!/bin/sh

echo "Setting permissions..."
chown -R www-data:www-data /var/www/src/storage /var/www/src/bootstrap/cache 2>/dev/null || true
chmod -R 775 /var/www/src/storage /var/www/src/bootstrap/cache

if [ ! -f /var/www/src/database/database.sqlite ]; then
    echo "Creating SQLite database..."
    touch /var/www/src/database/database.sqlite
    chown www-data:www-data /var/www/src/database/database.sqlite 2>/dev/null || true
    chmod 775 /var/www/src/database/database.sqlite
fi

chown -R www-data:www-data /var/www/src/database 2>/dev/null || true
chmod -R 775 /var/www/src/database

echo "Generating application key..."
php artisan key:generate --force

echo "Clearing config and cache..."
php artisan config:clear
php artisan cache:clear

echo "Creating Storage Link..."
php artisan storage:link --force 2>/dev/null || true

echo "Running Database Migrations..."
for i in 1 2 3 4 5; do
    if php artisan migrate --force; then
        break
    fi
    echo "Migration attempt $i failed, retrying in 5s..."
    sleep 5
done

echo "Starting php-fpm..."
exec "$@"