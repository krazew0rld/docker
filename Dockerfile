FROM wordpress:7.1.0-php8.5-apache

RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x wp-cli.phar \
    && mv wp-cli.phar /usr/local/bin/wp

RUN apt-get update \
    && apt-get install -y --no-install-recommends ssmtp mailutils \
    && apt-get clean

RUN apt install mariadb-client -y

RUN echo "hostname=localhost.localdomain" > /etc/ssmtp/ssmtp.conf
RUN echo "mailhub=maildev" >> /etc/ssmtp/ssmtp.conf
RUN echo "sendmail_path=sendmail -i -t" >> /usr/local/etc/php/conf.d/php-sendmail.ini
RUN mkdir /usr/local/etc/php/conf.d/custom
RUN touch  /usr/local/etc/php/conf.d/custom/custom-php.ini

COPY custom-docker-entrypoint.sh /usr/local/bin
RUN chmod +x /usr/local/bin/custom-docker-entrypoint.sh

COPY --chown=www-data:www-data theme/ /usr/src/theme/
COPY --chown=www-data:www-data plugins/ /usr/src/plugins/

WORKDIR /var/www/html

ENTRYPOINT [ "custom-docker-entrypoint.sh" ]
CMD [ "apache2-foreground" ]