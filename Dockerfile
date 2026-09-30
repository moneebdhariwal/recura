FROM node:20-alpine AS builder

WORKDIR /app

COPY src/package*.json ./

RUN npm install

COPY src/ .

RUN npm run build


FROM php:8.2-fpm-alpine AS php-fpm

RUN apk add --no-cache \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    oniguruma-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring gd xml exif zip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/src

COPY src/ .

COPY --from=builder /app/public/build ./public/build

RUN composer config --global policy.advisories.block false
RUN composer install --no-dev --prefer-dist --optimize-autoloader

RUN mkdir -p /var/www/src/storage/logs /var/www/src/storage/framework/sessions /var/www/src/storage/framework/views /var/www/src/storage/framework/cache \
    && chown -R www-data:www-data /var/www/src/storage /var/www/src/bootstrap/cache /var/www/src/database \
    && chmod -R 775 /var/www/src/storage /var/www/src/bootstrap/cache /var/www/src/database \
    && touch /var/www/src/database/database.sqlite && chown www-data:www-data /var/www/src/database/database.sqlite && chmod 775 /var/www/src/database/database.sqlite

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN sed -i 's/listen = 127.0.0.1:9000/listen = 9000/g' /usr/local/etc/php-fpm.d/www.conf

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["php-fpm"]


FROM nginx:alpine AS nginx

RUN apk add --no-cache curl

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=php-fpm /var/www/src /var/www/src

RUN chown -R nginx:nginx /var/www/src/storage /var/www/src/bootstrap/cache

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
