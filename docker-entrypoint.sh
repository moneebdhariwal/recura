cat << 'EOF' > docker-entrypoint.sh
#!/bin/sh
set -e

echo "Running Composer Install..."
composer install --no-interaction --prefer-dist --optimize-autoloader

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    php artisan key:generate
fi

echo "Running Database Migrations..."
# DB container ke ready hone ka thoda wait
sleep 10
php artisan migrate --force

exec "$@"
EOF

chmod +x docker-entrypoint.sh
