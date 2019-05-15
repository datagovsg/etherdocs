# Lightweight real-time collaborative editing on the Intranet!

[![Greenkeeper badge](https://badges.greenkeeper.io/datagovsg/etherdocs.svg)](https://greenkeeper.io/)

The project has been archived. No further development work is being done on it

## The etherdocs journey

Etherdocs, a fork from etherpad, comes with a huge codebase. It's all Javascript, frontend and backend. Work done so far that makes etherdocs different from beta.etherpad.org include:

Etherdocs is a huge codebase. Thankfully, it’s all javascript, so we’re familiar with it, but making changes to it is difficult. It is difficult to navigate. Despite that, work done so far that makes etherdocs different from beta.etherpad.org include:

- Allowing for line breaks between numbered lists
- Dockerizing for use on Nectar
- Changed icons for most icons on toolbar based on artylope/etherdocs-prototype
- Using MySQL data store
- Settings in setting.json
- Landing page overhaul, thanks to @artylope
- Plugins in package.json
- modifying ep_font_size to allow for only even sizes and for up to size 32
- modifying ep_headings2 to disallow heading 5 and 6
- modifying ep_push2delete to hide it away from the toolbar in settings dropdown

Some of the things we tried that were not successful include:
- Using etherpad-docker, because it uses OS level commands that are not permitted by Nectar
- Ep_bookmark, because it is very unintuitive for the user to enter a pad in order to see their other pads
- Ep_mypads, because it is huge and slowing us down
- Removing strikethrough functionality because we thought it was unused, only to add it back in a week later
- Using nodemon locally; kept giving “No module named ‘log4js’” no matter how I tried to npm install, remove cache, or uninstall
- Ep_copy_paste_images; buggy

## Getting started

`docker-compose up --build`

give it a whole bunch of time and then go to http://0.0.0.0:9001. When you are building it for something and you want it to run quicker, comment out the following lines in the `Dockerfile`:

```bash
RUN chmod -R g+rwx /usr
RUN mkdir /.npm
RUN chmod -R g+rwx /.npm
```

and the following line from the `docker-compose.yml` file:

```bash
    user: "12345678:0"
```

I apologize but hot reloading is not available. You will need to stop the entire thing and restart it. It's very inefficient, I realize that :(

Those are included in here so that you are able to simulate the reduced permissions provided by Nectar when you are running your container

## Things to take note of as a developer

- On Nectar, at build time, you are root user, but at runtime, you are a random user in the root group. This has important implications. Stuff like making directories or creating new files or even writing to files may not be possible any longer. For that reason, make sure to provide appropriate permissions, frontloading all the build steps, and preemptively creating the folders that might be needed
- Dockerfile's `chmod -R g+rwx /usr` is a very intensive operation. It has to modify every damn thing in th folder, and we have specified for it to happen recursively. If you have a lot of stuff in the directory (perhaps because, like myself, you have run the code on your machine instead of in a docker container, which creates a whole bunch of `node_modules` that bloats up your machine from 15MB to 80MB), it'll practically hang. Yes, you can create a .dockerignore file so that the Docker context is reduced, but I cannot be bothered. Run locally using docker because that's what happens in staging and prod.

## Acknowledgements
Many thanks to the creators of [etherpad](https://github.com/ether/etherpad-lite) for their work