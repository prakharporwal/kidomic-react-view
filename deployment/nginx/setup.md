https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04

## Certbot to setup ssl cert

- https://www.codementor.io/@mstspr1155/how-to-create-an-ssl-self-signed-certificate-on-ubuntu-with-nginx-12yl9ic17x

- sudo apt install python3-certbot-nginx instead of python-certbot-nginx
- `sudo certbot --nginx`

- setup non www to www
```
server {
    listen 80;
    listen [::]:80;
    server_name example.com;

    return 301 https://www.example.com$request_uri;
}
```

then use certbot for https