# imgmini

Image Minify with Gulp Image.

Fork of [Asikur22/npm-imgmini](https://github.com/Asikur22/npm-imgmini), update dependencies and command line.

Gulp 4 generates warning on usage of Chokidar v2, but we're not using this app for watch so it can be ignored.

[imagemin/imagemin-cli](https://github.com/imagemin/imagemin-cli) is a modern incarnation, but:

- it does not keep source's directory structure
- the default invocation is not optimized
- `Promise.all()` causes resource issue on low end machines (this app has concurrency limit)

## Install

```sh
$ npm install -g @leesei/imgmini
```

## Usage

```sh
$ imgmini image.jpg image2.png
# keep original files
$ imgmini -k image.jpg image2.png

# before globbing is suppported:
find $FOLDER -type f | xargs -P$(nproc) -- imgmini
```

### Show System Notification

```sh
$ imgmini -n image.jpg image2.png
```
