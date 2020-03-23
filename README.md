# Redis GUI

A desktop GUI client (Mac, Windows & Linux) for Redis built using Electron, React & Rust.

**🚧This project is under development and is not ready for prime time use. 🚧**

## Motivation

There are some great free and open source Redis Desktop GUI clients like
[this](https://github.com/qishibo/AnotherRedisDesktopManager). But most of them uses JavaScript for
querying Redis server which is not performant for large collection. This project uses Rust for
querying and interop with JavaScript to provide performance close to the native driver.

## Running locally

### Prerequisites

- Node 12.12 or higher
- [Rust](https://www.rust-lang.org/tools/install) 1.41.1 or higher

### Running dev version

```bash
git clone https://github.com/Joel-Raju/redis-gui.git
yarn install
yarn neon-build # building the native modules (Rust)
yarn dev
```

### Packaging

```bash
yarn package # packages for the local platform
```

For more info see [docs](https://electron-react-boilerplate.js.org/docs/packaging).

## Screenshots

![screnshot 1](/screenshots/screenshot1.png)

![screnshot 2](/screenshots/screenshot2.png)

## Contributions

Contributions are welcome. Please head over to the
[projects](https://github.com/Joel-Raju/redis-gui/projects/1) to see whats in the current roadmap.
Feel free to open an issue for a missing feature or bug.

## Discussion

[Gitter](https://gitter.im/)

## Acknowledgements

- [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
- [neon-bindings](https://github.com/neon-bindings/neon)
- [redis-rs](https://github.com/mitsuhiko/redis-rs)
- [blueprintjs](https://github.com/palantir/blueprint)

## License

[MIT License](https://github.com/Joel-Raju/redis-gui/blob/master/LICENSE)
