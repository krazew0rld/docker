#!/bin/bash

if [ ! -e wp-includes/version.php ] && [ ! -e index.php ]; then

    echo "Wordpress not installed, installing..."

    chown -R www-data:www-data /var/www

    # echo "Create SSL certificate..."

    # openssl req -x509 -nodes -days 365 -newkey rsa:2048 -out /etc/ssl/certs/mycert.crt -keyout /etc/ssl/private/mycert.key -utf8 -nameopt multiline,utf8 -subj "/C=FR/ST=Normandie/L=Saint-lô/O=Conseil département de la Manche/OU=DSIM/CN=$WORDPRESS_URL" -addext "subjectAltName = DNS:localhost,DNS:$WORDPRESS_URL"

    # sed -i '/SSLCertificateFile.*snakeoil\.pem/c\SSLCertificateFile \/etc\/ssl\/certs\/mycert.crt' /etc/apache2/sites-available/default-ssl.conf
    # sed -i '/SSLCertificateKeyFile.*snakeoil\.key/cSSLCertificateKeyFile /etc/ssl/private/mycert.key\' /etc/apache2/sites-available/default-ssl.conf
    
    # echo "Configurig apache..."

    # a2enmod ssl && a2ensite default-ssl

    if [ ! $(grep -c "ServerName" /etc/apache2/apache2.conf) -eq 1 ]; then
        echo "ServerName $WORDPRESS_URL" >> /etc/apache2/apache2.conf
    fi
    echo "Installing Wordpress..."

    runuser -u www-data -- wp core download --version=$WORDPRESS_VERSION --skip-content
    runuser -u www-data -- wp config create --dbname=$WORDPRESS_DB_NAME --dbuser=$WORDPRESS_DB_USER --dbpass=$WORDPRESS_DB_PASSWORD --dbhost=$WORDPRESS_DB_HOST  --dbprefix=$WORDPRESS_TABLE_PREFIX
    runuser -u www-data -- wp core install --url=http://$WORDPRESS_URL --title="$WORDPRESS_SITE_TITLE" --admin_user=admin --admin_password=admin --admin_email=admin@dev.com --locale=fr_FR --skip-email
    runuser -u www-data -- wp language core install fr_FR --activate
    mkdir /var/www/html/wp-content/themes/$WORDPRESS_THEME_DIRECTORY
    mv /usr/src/theme/* /var/www/html/wp-content/themes/$WORDPRESS_THEME_DIRECTORY/
    rm -Rf /usr/src/theme
    echo '' >> /var/www/html/wp-config.php
    echo "define( 'ACF_PRO_LICENSE', 'b3JkZXJfaWQ9MTQ0MzU1fHR5cGU9ZGV2ZWxvcGVyfGRhdGU9MjAxOC0xMS0xMiAwOToxMjo1NA==' );" >> /var/www/html/wp-config.php
    echo "define( 'GF_LICENSE_KEY', '7903303516d4fd34f3435e510ff07342' );" >> /var/www/html/wp-config.php
        mv /usr/src/plugins/* /var/www/html/wp-content/plugins/
    rm -Rf /usr/src/plugins
    sed -i "s/nomCompletDuTheme/$WORDPRESS_THEME_NAME/" /var/www/html/wp-content/themes/$WORDPRESS_THEME_DIRECTORY/style.css
    runuser -u www-data -- wp theme activate $WORDPRESS_THEME_DIRECTORY
    runuser -u www-data -- wp post delete $(runuser -u www-data -- wp post list --post_type=page --format=ids) --force
    runuser -u www-data -- wp post delete $(runuser -u www-data -- wp post list --post_type=post --format=ids) --force
    runuser -u www-data -- wp post create --post_title="Accueil" --post_status=publish --post_type=page
    runuser -u www-data -- wp option update page_on_front $(runuser -u www-data -- wp post list --post_type=page --format=ids)
    runuser -u www-data -- wp option update show_on_front page
    runuser -u www-data -- wp rewrite structure '/%postname%/'
    runuser -u www-data -- wp plugin activate advanced-custom-fields-pro gravityforms
    runuser -u www-data -- wp plugin update advanced-custom-fields-pro
    runuser -u www-data -- wp plugin update gravityforms

    mv /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini
    sed -i "s/memory_limit = 128M/memory_limit = 2048M/" /usr/local/etc/php/php.ini
    sed -i "s/upload_max_filesize = 2M/upload_max_filesize = 10M/" /usr/local/etc/php/php.ini
    sed -i "s/post_max_size = 8M/post_max_size = 10M/" /usr/local/etc/php/php.ini
    sed -i "s/max_execution_time = 30/max_execution_time = 600/" /usr/local/etc/php/php.ini

    if [ ! -e .htaccess ]; then
        cp /usr/src/wordpress/.htaccess .
    fi

    if [ -e /usr/src/wordpress ]; then
       rm -Rf /usr/src/wordpress
    fi
    
    chown -R www-data:www-data /var/www/html
    chmod -R 775 /var/www/html
    chmod g+s /var/www/html/wp-content/themes/$WORDPRESS_THEME_DIRECTORY

else
    echo "Wordpress already installed, skipping installation..."
fi

exec "$@"