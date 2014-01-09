var config = require('konphyg')(__dirname + '/config');
var conf = config('watchCss');


var compressor = require('node-minify');

require('chokidar').watch(conf.watchPath, {ignored: /[\/\\]\./, persistent: true}).on('all', function(event, path) {
  console.log(event, path);
	//Compress if should be 	
	if(event == 'add' || event == 'change' || event == 'unlink')
	{
		compress(path);
	}
});

//compressJsFile("/var/njs/compress/testFolder/lib.js");

function compressCssFile(filePath)
{
	new compressor.minify({
		type: 'sqwish',
		fileIn: filePath,
		fileOut: getMinName(filePath),
		callback: function(err, min){

		}
	});
}

function getMinName(filePath)
{
	var s = filePath.split('.');
	var ext = s[s.length-1];
	s[s.length-1] = "min";
	s.push(ext);
	return s.join("."); 
}

function compress(file, event)
{
	var ext = getExtension(file);
	if(ext == "css")
	{
		if(!isCompressed(file))
		{
			compressCssFile(file);
			console.log("Compressing " + file);
		}
	}

}

function isCompressed(filename)
{
	var ext = (filename||'').split('.');
    	if(ext[ext.length - 2] == "min")
	{
		return true;
console.log("Is a compressed File");
	}
	return false;

}

function getExtension(filename) {
    var ext = (filename||'').split('.');
    return ext[ext.length - 1];
}
