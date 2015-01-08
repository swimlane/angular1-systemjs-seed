var AssetGraph = require('assetgraph');

var outRoot = 'dist/app';

new AssetGraph({ root: 'app/app' })
	.loadAssets(['*.html', '*.js'])
	.queue(require('../')({
		bundle: true,
		outRoot: outRoot
	}))
	.writeAssetsToDisc({ url: /^file:/, isLoaded: true }, outRoot)
	.writeStatsToStderr()
	.run(function(err) {
		if (err) {
			console.log(err);
			throw err;
		}
	});