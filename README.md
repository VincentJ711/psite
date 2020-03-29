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
After following the steps below, just
```
python -u deploy.py
```

### ssl
- download the domain key [here](https://zerossl.com/free-ssl/#csr). enter in the domains you want the ssl cert to be good for, ie `vincentjs.com www.vincentjs.com dman.vincentjs.com wmscraper.vincentjs.com` and select 2048 bit encryption. Don't forget to download/save the domain key file/certificate request file.
- Paste the certificate request [here](https://zerossl.com/free-ssl/#crt) leaving the lets encrypt key field blank. Accept the terms/SA and select DNS verification. Then hit next.
- Place the given TXT challenge records into your domain registrars dns records page.
- on the zero ssl page, it'll give u instructions on how to verify the TXT records have loaded. This should take about 5-10 minutes. Once you've confirmed they're uploaded with `nslookup`, hit next and download the certificate.
- place the cert/csr/key files in this directory, renaming them appropriately, see `src/server/env.ts` for their names. the request file should just be here for manual renewal every 3 months. its not a dependency.

### ssl renewal
- use the same domain key/csr as before but generate a new cert by pasting the csr [here](https://zerossl.com/free-ssl/#crt).

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
