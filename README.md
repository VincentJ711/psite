# psite
This is the repo for my personal website which can be found [here](https://vincentjs.com/). It's a react app served by a node backend.

## prerequesites
You need node.js. I used v10 during development. Next, install the dependencies with npm and generate the vendor.js bundle file.
```
npm i
npm run gulp bvendor
```

You will also need python 3 if you want to deploy to a droplet.

## development
have gulp running in the background for your changes (files under `src`) to automatically take effect
```
npm run gulp
```
if you need to add a browser dependency, add its npm package name to the vendor array in `gulpfile.js` and regenerate the vendor bundle file.
```
npm run gulp bvendor
```

You'll also need to create a `.app.config.json` file that has the structure given in `.app.example-config.json`

Note, there will be some broken links to my personal projects if you don't have them running locally (likely as some are private repos).

## deployment
```
python -u deploy.py
```

### ssl setup
the server needs certbot installed
```
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot

# then follow the prompt for generating ssl via
sudo certbot certonly --webroot
```
the domains to include are: vincentjs.com,www.vincentjs.com,dman.vincentjs.com,wmscraper.vincentjs.com . it will ask where the webroots are for each domain.
you will have to select /root/psite/public for each. this is where the .well-known/acme-challenge directory is it uses to verify you own your domain.
see [here](https://letsencrypt.org/how-it-works/) and [here](https://certbot.eff.org/lets-encrypt/ubuntubionic-other) for reference on lets encrypt/cerbot usage.

### digital ocean setup
I'm using digital ocean because the droplets are cheaper than Compute Engine/AWS vms and are more than sufficient.
- create the droplet (ubuntu)
- `ssh root@<ip>` pasting the password emailed to you
- `passwd` to update roots password
- install nvm/node
  - `curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | sh`
  - exit the shell then re ssh in
  - `nvm install 10.16.0`
- exit session and setup passwordless ssh for each dev machine
  - `cd ~/.ssh`
  - `mkdir ~/.ssh/keys`
  - `ssh-keygen -t rsa -b 2048 -C root@<ip>` using keys/psite for the keyfile
  - add to `~/.ssh/config` the following
    ```
    Host psite
    HostName <ip>
    IdentityFile ~/.ssh/keys/psite
    User root
    ```
  - `ssh-copy-id -i ~/.ssh/keys/psite.pub psite`
  - now try to ssh in w/o a pass
- paste the droplets public ip into `.serverip`
