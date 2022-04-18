var Fontmin = require('fontmin');
var fs = require("fs");
var path = require('path');
var _ = require('lodash');

const files = fs.readdirSync('./');
console.log(files);

const textFiles = files.filter(file => {
    return path.extname(file).toLowerCase() === '.txt';
});
console.log(textFiles);

const fontFiles = files.filter(file => {
    return path.extname(file).toLowerCase() === '.ttf';
});
console.log(fontFiles);

var basicText = ' 　 　'; //space

//"!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}"
basicText += String.fromCharCode.apply(this, _.range(33, 126));

textFiles.forEach(textPath => {
    
    var mintext = fs.readFileSync(textPath);
    mintext += basicText;
    console.log(mintext);

    var outputDir = textPath.substring(0, textPath.lastIndexOf('.'));
    
    fontFiles.forEach(fontPath => {
        var fontmin = new Fontmin()
            .src(fontPath)
            .use(Fontmin.glyph({        // 字型提取插件
                text: mintext,          // 所需文字
                //basicText: true,
                hinting: false          // keep ttf hint info (fpgm, prep, cvt). default = true
            }))
            .dest(outputDir);

        fontmin.run(function (err, files) {
            if (err) {
                 throw err;
            }
            console.log('Finished   ' + outputDir + '/' + fontPath);
        }); 
    });
});
