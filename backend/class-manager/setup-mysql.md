### MySQL setup
- Run the following commands to install mysql server
```
sudo apt-get update
sudo apt-get install mysql-server -y
```
- To create a new user, first login into mysql as root by running the following command:
```
sudo mysql
```
- Now run the following commands to create new user
```
CREATE USER 'user_name'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON * . * TO 'user_name'@'localhost';
flush privileges;
quit;
```
- Restart mysql service
```
sudo systemctl restart mysql.service
```

Please note that the same credentials should be saved in application.properties
