function constructTest(test){
	QUnit.test(test.url + " (" + test.size + " bytes)", function (assert){
		assert.timeout( 30000 );
		assert.expect(3);
		var done = assert.async();
		$.ajax(
			{
				url: test.url, 
				cache: false,
				success: function(response){
					assert.ok( response, "Download " + test.url );
					assert.equal(response.length, test.size, "Size check");
					assert.equal(CryptoJS.SHA1(response).toString(), test.hash, "Hash check");
					done();
					}
			}
		);
	});
}

QUnit.module("HTTP File transfer");

tests = [
	{url:"http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.js", size:293430, hash:"433836da7e015f2eb3fc386817de88b78248f6ef"},
	{url:"http://ajax.googleapis.com/ajax/libs/d3js/5.7.0/d3.js", size:496693, hash:"900742800801cbb9d25201c7540e93adb1449fa8"},
	{url:"http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css", size:207465, hash:"dbd7cecde2284ba55a79bc2a2de7626baf8a9694"},
	{url:"http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/images/icons-png/action-black.png", size:214, hash:"6bb793e4262d0b801e6c220c69c64bff4951211d"},
	{url:"http://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/images/ajax-loader.gif", size:6045, hash:"b3e425a211b90ede7c7a0e2b803f58ff7b457d88"},
	{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", size:2136225, hash:"d07c329b9cfc3d56e205f784e890f13a095fdf0e"},
	{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg", size:15034, hash:"34882e5684481ec66dadf23f6ec59d36cc83d387"},
	{url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4", size:45585618, hash:"5cec06e49a268d0b64177238de552ebb965f6c56"}
]

tests.forEach(constructTest);

