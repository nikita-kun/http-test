function constructTest(test, negate = false) {

    QUnit.test(test.url + " (" + test.size + " bytes)", function(assert) {
        assert.timeout(30000);
        assert.expect(5);
        var done = assert.async();
        $.ajax({
            url: test.url,
            cache: false,
            success: function(response) {
                assert.ok(response, "Download " + test.url);
                assert.ok(true, "First 300 characters: " + response.slice(0, 300));
                assert.ok(true, "Last 300 characters: " + response.slice(-300));


                if (negate === true) {
                    assert.notEqual(response.length, test.size, "Size check: NOT " + test.size);
                    assert.notEqual(CryptoJS.SHA1(response).toString(), test.hash, "Hash check: NOT " + test.hash);
                } else {
                    assert.equal(response.length, test.size, "Size check: " + test.size);
                    assert.equal(CryptoJS.SHA1(response).toString(), test.hash, "Hash check: " + test.hash);
                }

                done();
            }
        });
    });
}

function constructEndingTest(test) {

    QUnit.test(test.url, function(assert) {
        assert.timeout(30000);
        assert.expect(3);
        var done = assert.async();
        $.ajax({
            url: test.url,
            cache: false,
            success: function(response) {
                assert.ok(response, "Download " + test.url);
                assert.ok(true, "Last 300 characters: " + response.slice(-300));
                assert.equal(CryptoJS.SHA1(response.slice(-300)).toString(), test.hash, "Hash check: " + test.hash);


                done();
            }
        });
    });
}


function constructNegativeTest(test) {
    constructTest(test, true);
}


QUnit.module("HTTP File transfer");

tests = [{
        url: "http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.js",
        size: 293430,
        hash: "433836da7e015f2eb3fc386817de88b78248f6ef"
    },
    {
        url: "http://ajax.googleapis.com/ajax/libs/d3js/5.7.0/d3.js",
        size: 496693,
        hash: "900742800801cbb9d25201c7540e93adb1449fa8"
    },
    {
        url: "http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css",
        size: 207465,
        hash: "dbd7cecde2284ba55a79bc2a2de7626baf8a9694"
    },
    {
        url: "http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/images/icons-png/action-black.png",
        size: 214,
        hash: "6bb793e4262d0b801e6c220c69c64bff4951211d"
    },
    {
        url: "http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/images/ajax-loader.gif",
        size: 6045,
        hash: "b3e425a211b90ede7c7a0e2b803f58ff7b457d88"
    },
    {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
        size: 15034,
        hash: "34882e5684481ec66dadf23f6ec59d36cc83d387"
    },
]

tests.forEach(constructTest);

QUnit.module("HTTP Big file ending");

tests = [{
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        hash: "3f0829a97c389f436f26eabf6499e135fafcd9df"
    },
    {
        url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        hash: "0eb9d2e6feea1da5206731660db14af5a0853587"
    }
]

tests.forEach(constructEndingTest);


QUnit.module("HTTP URL filtering*");
constructNegativeTest({
    url: "files/" + "spon" + "geb" + "ob-url.txt",
    size: 140,
    hash: "8e7fbfa21478e0bb07702cd62138c3f0f356402d"
});

QUnit.module("HTTP Content filtering*");
tests = [{
        url: "files/keyword-append-1m.txt",
        size: 1029143,
        hash: "c30b5e8ea9607ae3ae86c9139fd76904e4f93410"
    },
    {
        url: "files/keyword-append-16k.txt",
        size: 16104,
        hash: "f3b199a7fff77184d6e4c08f2bebce7a64340302"
    },
    {
        url: "files/keyword-append-16m.txt",
        size: 16465944,
        hash: "5d8cd9e10c1804a38ef05c9670a463e19b153bf7"
    },
    {
        url: "files/keyword-append-24b.txt",
        size: 23,
        hash: "45cc6a3d0159878706f0b1944aef08a0377a77f0"
    },
    {
        url: "files/keyword-append-64m.txt",
        size: 65863704,
        hash: "227df2d538b5cce39ee922ff6be54032b7bd7f8b"
    },
    {
        url: "files/keyword-append-256k.txt",
        size: 257305,
        hash: "1a8c0822f08d76fde1172295382881508b4a5441"
    },
    {
        url: "files/keyword-prepend-1m.txt",
        size: 1029143,
        hash: "0f78a092f991cf6a4b57a9c7c37ec4adf4e9cb0e"
    },
    {
        url: "files/keyword-prepend-16k.txt",
        size: 16104,
        hash: "56fdefa488838a704c62350bb3751c89cc92d186"
    },
    {
        url: "files/keyword-prepend-16m.txt",
        size: 16465944,
        hash: "5b68210d23e17c01d5fe0967e0af4a1531fe5332"
    },
    {
        url: "files/keyword-prepend-64m.txt",
        size: 65863704,
        hash: "e91f89fcea3adb2e81f5a1663aa8553a0175879e"
    },
    {
        url: "files/keyword-prepend-256k.txt",
        size: 257305,
        hash: "bc144819325cf10c078d9ea11939ae104626364a"
    },
]

tests.forEach(constructNegativeTest);

QUnit.module("HTTP response consistency*");
tests = [{
        url: "files/normal-24b.txt",
        size: 24,
        hash: "6d52ce30581556a10b81384a557a0e375d533062"
    },
    {
        url: "files/normal-16k.txt",
        size: 16084,
        hash: "d18f0db0199c85f8165e45027f307229fa361d9e"
    },
    {
        url: "files/normal-256k.txt",
        size: 257285,
        hash: "8e6a35bf2b12d876044656b874c88b3b642e0ff9"
    },
    {
        url: "files/normal-1m.txt",
        size: 1029123,
        hash: "16f2fe5ad20f1f8bf4f9e7c4c008996b4a8b33ff"
    },
    {
        url: "files/normal-16m.txt",
        size: 16465924,
        hash: "af1822fb60428eb03a42f603482a5e83248c25c8"
    },
    {
        url: "files/normal-64m.txt",
        size: 65863684,
        hash: "b8793132974f7a1cba4ecc3677e5adc5beea6be8"
    },
    {
        url: "files/32m.bin",
        size: 32000000,
        hash: "c08ceef7edbb4a9bcb0a425deca30bafb75d5c8b"
    },
]

tests.forEach(constructTest);