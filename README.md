# Google Docs for the intranet!

![Demo EtherDocs Animated Jif](https://i.imgur.com/zYrGkg3.gif "EtherDocs in action")

# Things you should know, from Nikhil:

- etherpad-docker does not work on Nectar because it uses supervisor which is UNIX process control system. That's why we've rolled our own Dockerfile
- On Nectar, at build time, you are root user, but at runtime, you are a random user in the root group. This has important implications. Stuff like making directories or creating new files or even writing to files may not be possible any longer. For that reason, make sure to provide appropriate permissions, frontloading all the build steps, and preemptively creating the folders that might be needed
- Dockerfile's `chmod -R g+rwx /usr` is a very intensive operation. It has to modify every damn thing in th folder, and we have specified for it to happen recursively. If you have a lot of stuff in the directory (perhaps because, like myself, you have run the code on your machine instead of in a docker container, which creates a whole bunch of `node_modules` that bloats up your machine from 15MB to 80MB), it'll practically hang. Yes, you can create a .dockerignore file so that the Docker context is reduced, but I cannot be bothered. Run locally using docker because that's what happens in staging and prod.

## Getting started

`docker build -t ether . && docker run --user="12345678:0" -p 9001:9001 ether`

and then go to http://0.0.0.0:9001

I won't give instructions on how to start it on your machine because you're going to run into the problem stated above. If you are smart enough to solve that problem then you're smart enough to figure out how to run it on your local machine yourself.

To demo the product on the internet, use their implementation http://beta.etherpad.org. To demo the product on SOE, go to https://etherdocs.app.gov.sg. Don't forget the https! Especially when you're telling friends about it!

# Things you should know, from the original repository

Understand [git](https://training.github.com/) and watch this [video on getting started with Etherpad Development](https://youtu.be/67-Q26YH97E).

You can debug Etherpad using `bin/debugRun.sh`.

If you want to find out how Etherpad's `Easysync` works (the library that makes it really realtime), start with this [PDF](https://github.com/ether/etherpad-lite/raw/master/doc/easysync/easysync-full-description.pdf) (complex, but worth reading).

## HTTP API

Etherpad is designed to be easily embeddable and provides a [HTTP API](https://github.com/ether/etherpad-lite/wiki/HTTP-API)
that allows your web application to manage pads, users and groups. It is recommended to use the [available client implementations](https://github.com/ether/etherpad-lite/wiki/HTTP-API-client-libraries) in order to interact with this API.

## Plugins and themes

Etherpad is very customizable through plugins. Instructions for installing themes and plugins can be found in [the plugin wiki article](https://github.com/ether/etherpad-lite/wiki/Available-Plugins).

Etherpad offers a plugin framework, allowing you to easily add your own features. By default your Etherpad is extremely light-weight and it's up to you to customize your experience. Once you have Etherpad installed you should visit the plugin page and take control.

## Tweak the settings

You can modify the settings in `settings.json`.
If you need to handle multiple settings files, you can pass the path to a settings file to `bin/run.sh` using the `-s|--settings` option: this allows you to run multiple Etherpad instances from the same installation.
Similarly, `--credentials` can be used to give a settings override file, `--apikey` to give a different APIKEY.txt file and `--sessionkey` to give a non-default SESSIONKEY.txt.
Once you have access to your /admin section settings can be modified through the web browser.

## Helpful resources

The [wiki](https://github.com/ether/etherpad-lite/wiki) is your one-stop resource for Tutorials and How-to's.

Documentation can be found in `doc/`.

## Secure your installation

If you have enabled authentication in `users` section in `settings.json`, it is a good security practice to **store hashes instead of plain text passwords** in that file. This is _especially_ advised if you are running a production installation.

Please install [ep_hash_auth plugin](https://www.npmjs.com/package/ep_hash_auth) and configure it.
If you prefer, `ep_hash_auth` also gives you the option of storing the users in a custom directory in the file system, without having to edit `settings.json` and restart Etherpad each time.

# License

[Apache License v2](http://www.apache.org/licenses/LICENSE-2.0.html)
