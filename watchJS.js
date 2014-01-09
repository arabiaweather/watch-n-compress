var config = require('konphyg')(__dirname + '/config');
var conf = config('watchJs');

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

function compressJsFile(filePath)
{
	new compressor.minify({
		type: 'gcc',
		fileIn: filePath,
		fileOut: getMinName(filePath),
		callback: function(err, min){
			console.log(err);
			//console.log(min);
			}
		});
}

function compress(file, event)
{
	var ext = getExtension(file);
	if(ext == "js")
	{
		if(!isCompressed(file))
		{
			compressJsFile(file);
			console.log("Compressing " + file);
		}
	}

}

function getMinName(filePath)
{
        var s = filePath.split('.');
        var ext = s[s.length-1];
        s[s.length-1] = "min";
        s.push(ext);
        return s.join(".");
}


function isCompressed(filename)
{
	var ext = (filename||'').split('.');
    	if(ext[ext.length - 2] == "min")
	{
		return true;
	}
	return false;

}

function getExtension(filename) {
    var ext = (filename||'').split('.');
    return ext[ext.length - 1];
}
