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
    && docker-php-ext-install pdo_mysql mbstring gd xml

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# Install NPM dependencies & Build Vue assets
RUN cd src && npm install && npm run build

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]
