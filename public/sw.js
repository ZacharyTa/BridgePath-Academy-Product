if (!self.define) {
  let e,
    a = {};
  const s = (s, i) => (
    (s = new URL(s + ".js", i).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const t =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (a[t]) return;
    let n = {};
    const r = (e) => s(e, t),
      o = { module: { uri: t }, exports: n, require: r };
    a[t] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (c(...e), n));
  };
}
define(["./workbox-f1770938"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "/_next/static/HQPLmTBjwpcaqBqvb-00d/_buildManifest.js",
          revision: "2ec694eb52ae4f523f265a46bae4d768",
        },
        {
          url: "/_next/static/HQPLmTBjwpcaqBqvb-00d/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/150.85c3cdcb8d134f8c.js",
          revision: "85c3cdcb8d134f8c",
        },
        {
          url: "/_next/static/chunks/231-5a74c792f7a051e0.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/244-a6cfd2955b6d3acb.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/35.03ae917f238a8966.js",
          revision: "03ae917f238a8966",
        },
        {
          url: "/_next/static/chunks/375-6bbecfacb478bbdd.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/3975359d.cb1a418f55a805d4.js",
          revision: "cb1a418f55a805d4",
        },
        {
          url: "/_next/static/chunks/433-0522a78656b26363.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/435-fdee03691ad37350.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/599-eeeab671fb94a6ed.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/726-52ea8e0dc83e0a43.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/781.9783b676f8050744.js",
          revision: "9783b676f8050744",
        },
        {
          url: "/_next/static/chunks/84.1929b06b6c102146.js",
          revision: "1929b06b6c102146",
        },
        {
          url: "/_next/static/chunks/863-80f1e2844bc6753f.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/865.72d297612860ea63.js",
          revision: "72d297612860ea63",
        },
        {
          url: "/_next/static/chunks/912-c0b0a57f6683f276.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-b439ed0df4adaeec.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/dashboard/layout-680a56e399e7095b.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/dashboard/page-b2db78946143e6ea.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/error-bf65563652a67a0f.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/layout-e5177216c6b0f49c.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/not-found-35261d989610811d.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/page-a3429ee1c2552463.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/privacy-policy/page-a1bae657a6fc9ed9.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/profile/layout-ac32e30339289d7c.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/profile/page-1789089832dd8661.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/recover-password/layout-d96c54184fb81853.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/recover-password/page-b8c0323970da96f5.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/reset-password/layout-e74b45de53b72cdc.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/reset-password/page-e75069539f8d5846.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/settings/layout-e2caedac29080aa9.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/settings/page-3ec4acbfe94af152.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/signin/layout-5fe6823138b69c73.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/signin/page-218f7ae54edf5476.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/tables/layout-09e1372439627b21.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/tables/page-66c5fe1595aa1157.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/tos/page-cff9ff59a551ba59.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/ui/alerts/page-667107b83ff73448.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/ui/buttons/page-afaf5f9c120cccab.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/app/ui/layout-6567cde069a60146.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/fd9d1056-ac3d4cc82bf607b5.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/framework-aec844d2ccbe7592.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/main-app-ce9419e1672dbf8f.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/main-b00f621943f57669.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/pages/_app-6a626577ffa902a4.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/pages/_error-1be831200e60c5c0.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-e2aaa09a2a6c88ae.js",
          revision: "HQPLmTBjwpcaqBqvb-00d",
        },
        {
          url: "/_next/static/css/919343303a812523.css",
          revision: "919343303a812523",
        },
        {
          url: "/_next/static/css/c05077209acf5b7a.css",
          revision: "c05077209acf5b7a",
        },
        {
          url: "/_next/static/css/ce317755feabf9f7.css",
          revision: "ce317755feabf9f7",
        },
        {
          url: "/_next/static/css/f4d6ad08b65bf28a.css",
          revision: "f4d6ad08b65bf28a",
        },
        {
          url: "/_next/static/media/Satoshi-Black.12d5a2e3.ttf",
          revision: "12d5a2e3",
        },
        {
          url: "/_next/static/media/Satoshi-Black.28873509.woff",
          revision: "28873509",
        },
        {
          url: "/_next/static/media/Satoshi-Black.c6d20a6b.woff2",
          revision: "c6d20a6b",
        },
        {
          url: "/_next/static/media/Satoshi-BlackItalic.22c3e8d9.woff",
          revision: "22c3e8d9",
        },
        {
          url: "/_next/static/media/Satoshi-BlackItalic.33bc16b8.ttf",
          revision: "33bc16b8",
        },
        {
          url: "/_next/static/media/Satoshi-BlackItalic.5400951d.woff2",
          revision: "5400951d",
        },
        {
          url: "/_next/static/media/Satoshi-Bold.12084922.woff2",
          revision: "12084922",
        },
        {
          url: "/_next/static/media/Satoshi-Bold.b28a04c4.woff",
          revision: "b28a04c4",
        },
        {
          url: "/_next/static/media/Satoshi-Bold.c60efc8f.ttf",
          revision: "c60efc8f",
        },
        {
          url: "/_next/static/media/Satoshi-BoldItalic.b59cf06f.woff",
          revision: "b59cf06f",
        },
        {
          url: "/_next/static/media/Satoshi-BoldItalic.c1d97e57.ttf",
          revision: "c1d97e57",
        },
        {
          url: "/_next/static/media/Satoshi-BoldItalic.e51fcc53.woff2",
          revision: "e51fcc53",
        },
        {
          url: "/_next/static/media/Satoshi-Italic.3eb4bb53.woff2",
          revision: "3eb4bb53",
        },
        {
          url: "/_next/static/media/Satoshi-Italic.43440d31.woff",
          revision: "43440d31",
        },
        {
          url: "/_next/static/media/Satoshi-Italic.84cd9c1d.ttf",
          revision: "84cd9c1d",
        },
        {
          url: "/_next/static/media/Satoshi-Light.121b151d.ttf",
          revision: "121b151d",
        },
        {
          url: "/_next/static/media/Satoshi-Light.ce217c5d.woff",
          revision: "ce217c5d",
        },
        {
          url: "/_next/static/media/Satoshi-Light.d3f699ab.woff2",
          revision: "d3f699ab",
        },
        {
          url: "/_next/static/media/Satoshi-LightItalic.0d87c97a.woff2",
          revision: "0d87c97a",
        },
        {
          url: "/_next/static/media/Satoshi-LightItalic.51efbee6.woff",
          revision: "51efbee6",
        },
        {
          url: "/_next/static/media/Satoshi-LightItalic.58b0e971.ttf",
          revision: "58b0e971",
        },
        {
          url: "/_next/static/media/Satoshi-Medium.22539d17.woff2",
          revision: "22539d17",
        },
        {
          url: "/_next/static/media/Satoshi-Medium.8217b72e.ttf",
          revision: "8217b72e",
        },
        {
          url: "/_next/static/media/Satoshi-Medium.f3941e68.woff",
          revision: "f3941e68",
        },
        {
          url: "/_next/static/media/Satoshi-MediumItalic.14c46485.ttf",
          revision: "14c46485",
        },
        {
          url: "/_next/static/media/Satoshi-MediumItalic.17afee50.woff2",
          revision: "17afee50",
        },
        {
          url: "/_next/static/media/Satoshi-MediumItalic.5450477c.woff",
          revision: "5450477c",
        },
        {
          url: "/_next/static/media/Satoshi-Regular.a12eb4fb.ttf",
          revision: "a12eb4fb",
        },
        {
          url: "/_next/static/media/Satoshi-Regular.b1dca2a5.woff2",
          revision: "b1dca2a5",
        },
        {
          url: "/_next/static/media/Satoshi-Regular.bb2accee.woff",
          revision: "bb2accee",
        },
        {
          url: "/blog/introducing-supabase/header.png",
          revision: "235c9c94640bd410841ebff6931d2a44",
        },
        {
          url: "/icons/icon-1200x1200.png",
          revision: "517cef1f798464c0a602ef34fca597d8",
        },
        {
          url: "/images/best-value-banner.png",
          revision: "1e1854f4717f25136115ed095d37273e",
        },
        {
          url: "/images/brand/brand-01.svg",
          revision: "2dd59410e0a65ce7183c0edb82d51cec",
        },
        {
          url: "/images/brand/brand-02.svg",
          revision: "1cd9b0680cbfb78805420659bc1e077d",
        },
        {
          url: "/images/brand/brand-03.svg",
          revision: "0eca25adef3e8225d50860ec9e935082",
        },
        {
          url: "/images/brand/brand-04.svg",
          revision: "7dc6ac3b2da4adea0f941e472486a4bc",
        },
        {
          url: "/images/brand/brand-05.svg",
          revision: "3ebe4ebf55a7faa2aa74ce775c7340fb",
        },
        {
          url: "/images/cards/cards-01.png",
          revision: "bee503d28d650dc258b6376511f5facd",
        },
        {
          url: "/images/cards/cards-02.png",
          revision: "704f58c328ebb8c091643b238bd1c62b",
        },
        {
          url: "/images/cards/cards-03.png",
          revision: "36a3fa394039239a716caf01970174ca",
        },
        {
          url: "/images/cards/cards-04.png",
          revision: "4443f6a85e3b7e775afc640584f866da",
        },
        {
          url: "/images/cards/cards-05.png",
          revision: "2d0223d89e31b56459d147647db3a7f0",
        },
        {
          url: "/images/cards/cards-06.png",
          revision: "080a048d0d862ef60ae4e67db3caf930",
        },
        {
          url: "/images/country/country-01.svg",
          revision: "59c5ae713308034a1e0a8f138682b2a3",
        },
        {
          url: "/images/country/country-02.svg",
          revision: "d5f66a93a4ade95ad2a72eb195f85028",
        },
        {
          url: "/images/country/country-03.svg",
          revision: "8bd9f1d0cdad554fbb6551e0e2316493",
        },
        {
          url: "/images/country/country-04.svg",
          revision: "47978f51b9a5e565cdf220612aaa4170",
        },
        {
          url: "/images/country/country-05.svg",
          revision: "b5a8a2f9422c1b8846dabbcf149a673e",
        },
        {
          url: "/images/country/country-06.svg",
          revision: "f39891596b6c5eeee69d2a02df9f4142",
        },
        {
          url: "/images/cover/cover-01.png",
          revision: "972c64bf2ce84e837c5b3a2094281e16",
        },
        {
          url: "/images/favicon.ico",
          revision: "94e47f5dcf4e91b704f169ebcb4c9390",
        },
        {
          url: "/images/icon/icon-arrow-down.svg",
          revision: "ab3cd915ffa427d34a5e89d864631b04",
        },
        {
          url: "/images/icon/icon-calendar.svg",
          revision: "b0baecc0aa9c16ead9a856fe58647914",
        },
        {
          url: "/images/icon/icon-copy-alt.svg",
          revision: "ccc6b1e6fd056d7d25978a064d6b68de",
        },
        {
          url: "/images/icon/icon-moon.svg",
          revision: "f0c56a1b9282024a7c210588a79dc8a3",
        },
        {
          url: "/images/icon/icon-sun.svg",
          revision: "99bd84f8192219382166d3264cf6bf8d",
        },
        {
          url: "/images/illustration/illustration-01.svg",
          revision: "fafb329f9d07ab161111f0c949468496",
        },
        {
          url: "/images/illustration/illustration-02.svg",
          revision: "51cd787b205a6ec6957af69bd27b5e75",
        },
        {
          url: "/images/illustration/illustration-03.svg",
          revision: "5929bc478f2aab9cb10aaa65a64f6064",
        },
        {
          url: "/images/illustration/illustration-04.svg",
          revision: "c37d18bb983e5d6e29d404c6690b7efb",
        },
        {
          url: "/images/logo/logo-dark.svg",
          revision: "c276d13c01ebc7286a6153935e8efa80",
        },
        {
          url: "/images/logo/logo-icon.svg",
          revision: "42501f0dc1f98ffbe699ba8a15777e12",
        },
        {
          url: "/images/logo/logo.svg",
          revision: "8493d27b89070d57f004ac0369be1c92",
        },
        {
          url: "/images/product/product-01.png",
          revision: "34be8cdb4dbf696fb0a39b39c5d94c4a",
        },
        {
          url: "/images/product/product-02.png",
          revision: "1a4633cb19e391dd753743d62b4a790b",
        },
        {
          url: "/images/product/product-03.png",
          revision: "2c213e5c10b79de985f7691ad21ca1e6",
        },
        {
          url: "/images/product/product-04.png",
          revision: "f45c5f8c16c8db472e6b6d7c16cdae9b",
        },
        {
          url: "/images/product/product-thumb.png",
          revision: "9cb86c53190c3026fb88dd00c232dd57",
        },
        {
          url: "/images/task/task-01.jpg",
          revision: "557544c08de1aba4220b710b03d999b0",
        },
        {
          url: "/images/user/user-01.png",
          revision: "c8ed34fe5094d3b127bb9c94633d6371",
        },
        {
          url: "/images/user/user-02.png",
          revision: "de3bd868997d3f445348922df73d8226",
        },
        {
          url: "/images/user/user-03.png",
          revision: "93b7c0c394b231732ebe8806448a95a8",
        },
        {
          url: "/images/user/user-04.png",
          revision: "118e66657a14921a61abc7d21261188b",
        },
        {
          url: "/images/user/user-05.png",
          revision: "d74bb3c54d3e3c32c73829d652d0d6f4",
        },
        {
          url: "/images/user/user-06.png",
          revision: "975408d09dc079b97f4ae46480af7ef5",
        },
        {
          url: "/images/user/user-07.png",
          revision: "e3058df7afaaf5b2dedd732445cfea5b",
        },
        {
          url: "/images/user/user-08.png",
          revision: "960cd052c95c75462fae0c9930a202db",
        },
        {
          url: "/images/user/user-09.png",
          revision: "15693dc3edc4775c384585aa757f2421",
        },
        {
          url: "/images/user/user-10.png",
          revision: "8bbed9cfd9a9e8a7d5ab3e1a43737380",
        },
        {
          url: "/images/user/user-11.png",
          revision: "11f4a43c10ec710e5e41f261a629ca82",
        },
        {
          url: "/images/user/user-12.png",
          revision: "8530b9ec54e0b67cb52b44bcbae5482c",
        },
        {
          url: "/images/user/user-13.png",
          revision: "cdb3cc59c44f18a8029a032a3952663d",
        },
        { url: "/manifest.json", revision: "7b5504c7ceaf1fd3cfd87676db920811" },
        {
          url: "/punchy-taps-ui-12.mp3",
          revision: "56236f1db16a80d11b12edbf8f291749",
        },
        { url: "/stop.mp3", revision: "1ed29636231464bcd45d97c3f3678e59" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith("/api/auth/callback") || !a.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") &&
        "1" === e.headers.get("Next-Router-Prefetch") &&
        s &&
        !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && s && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      "GET",
    );
});
