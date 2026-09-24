FROM php:8.2-fpm-alpine

# Install system dependencies, Node.js, npm, & PHP extensions
RUN apk add --no-cache \
    zip \
    unzip \
    git \
    curl \
    nodejs \
    npm \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring gd xml exif zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/src

COPY src/ .

# Install NPM dependencies & Build Vue assets
RUN npm install
RUN npm run build

RUN composer config --global policy.advisories.block false

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]
