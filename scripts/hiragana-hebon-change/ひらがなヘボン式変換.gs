var spretsheetId = ''
var spretsheetTargetSheetName = ''

function myFunction() {

  var textList = []
  var textOutPutList = []

  var spreadsheet = SpreadsheetApp.openById(spretsheetId);
  var sheet = spreadsheet.getSheetByName(spretsheetTargetSheetName);

  var range = sheet.getRange(1,1,sheet.getLastRow(),1)
  textList = range.getValues()
  Hebon()
  for(i in textList){
    var text = textList[i][0]
    textOutPutList[i] = text.toHebon()
  }
  for(index in textOutPutList){
    sheet.getRange(Number(index)+1, 2).setValue(textOutPutList[index])
  }
}

function Hebon() {
  this.map = [];
        var sss = [ ["あ","a" ], ["い","i" ], ["う","u" ],
                ["え","e" ], ["お","o" ], ["か","ka" ],
                ["き","ki" ], ["く","ku" ], ["け","ke" ],
                ["こ","ko" ], ["さ","sa" ], ["し","shi" ],
                ["す","su" ], ["せ","se" ], ["そ","so" ],
                ["た","ta" ], ["ち","chi" ], ["つ","tsu" ],
                ["て","te" ], ["と","to" ], ["な","na" ],
                ["に","ni" ], ["ぬ","nu" ], ["ね","ne" ],
                ["の","no" ], ["は","ha" ], ["ひ","hi" ],
                ["ふ","fu" ], ["へ","he" ], ["ほ","ho" ],
                ["ま","ma" ], ["み","mi" ], ["む","mu" ],
                ["め","me" ], ["も","mo" ], ["や","ya" ],
                ["ゆ","yu" ], ["よ","yo" ], ["ら","ra" ],
                ["り","ri" ], ["る","ru" ], ["れ","re" ],
                ["ろ","ro" ], ["わ","wa" ], ["ゐ","i" ],
                ["う","u" ], ["ゑ","e" ], ["を","o" ],
                ["ん","n" ], ["が","ga" ], ["ぎ","gi" ],
                ["ぐ","gu" ], ["げ","ge" ], ["ご","go" ],
                ["ざ","za" ], ["じ","ji" ], ["ず","zu" ],
                ["ぜ","ze" ], ["ぞ","zo" ], ["だ","da" ],
                ["ぢ","ji" ], ["づ","zu" ], ["で","de" ],
                ["ど","do" ], ["ば","ba" ], ["び","bi" ],
                ["ぶ","bu" ], ["べ","be" ], ["ぼ","bo" ],
                ["ぱ","pa" ], ["ぴ","pi" ], ["ぷ","pu" ],
                ["ぺ","pe" ], ["ぽ","po" ], ["きゃ","kya" ],
                ["きゅ","kyu" ], ["きょ","kyo" ], ["しゃ","sha" ],
                ["しゅ","shu" ], ["しょ","sho" ], ["ちゃ","cha" ],
                ["ちゅ","chu" ], ["ちょ","cho" ], ["にゃ","nya" ],
                ["にゅ","nyu" ], ["にょ","nyo" ], ["ひゃ","hya" ],
                ["ひゅ","hyu" ], ["ひょ","hyo" ], ["みゃ","mya" ],
                ["みゅ","myu" ], ["みょ","myo" ], ["りゃ","rya" ],
                ["りゅ","ryu" ], ["りょ","ryo" ], ["ぎゃ","gya" ],
                ["ぎゅ","gyu" ], ["ぎょ","gyo" ], ["じゃ","ja" ],
                ["じゅ","ju" ], ["じょ","jo" ], ["びゃ","bya" ],
                ["びゅ","byu" ], ["びょ","byo" ], ["ぴゃ","pya" ],
                ["ぴゅ","pyu" ], ["ぴょ","pyo" ], 
                /* この二文字は特別あつかい */
                ["ー",""],["っ","っ"]];
        for(i = 0; i<sss.length ;i++) {
            this.map[sss[i][0]] = sss[i][1];
        }

        function toHebon(text) {
            hebon = ""
            var pos = 0;
            var len = text.length;
            var lastConvert = null;
            loop: while (pos < len) {
                c ="";

                convert: {

                    c2: if (pos + 2 <= len) {
                        c = map[text.substring(pos, pos + 2)];
                        if (!(typeof c === "undefined")) {
                            pos += 2;
                            break convert;
                        }
                    }
                    c1: if (pos < len) {
                        c = map[text.substring(pos, pos + 1)];
                        if (!(typeof c === "undefined")) {
                            pos += 1;
                            break convert;
                        }
                    }
                    c_nothing: {
                        c = text.substring(pos, pos + 1);
                        pos += 1;
                    }
                } // convert

                convert_another_rule: {
                    isLastConvert_Xtu ="っ" == (lastConvert);
                    isCH = c.startsWith("ch");
                    isLastConvert_N ="n" == lastConvert;
                    isBMP = c.match(/[b|m|p].*/);

                    if (isLastConvert_Xtu && isCH) {
                        hebon += "t";
                        break convert_another_rule;
                    }

                    if (isLastConvert_Xtu && !isCH) {
                        hebon += c.substring(0, 1);
                        break convert_another_rule;
                    }

                    if (isLastConvert_N && isBMP) {
                        hebon += "m";
                        break convert_another_rule;
                    }

                    if (isLastConvert_N && !isBMP) {
                        hebon += "n";
                        break convert_another_rule;
                    }
                }

                append: {
                    isBoon = (lastConvert + c).match(/.*(aa|ii|uu|ee|oo|ou)$/);
                    isLastLetter = !(pos < len);
                    isXtuOrN = c.match(/っ/) || c == "n";

                    if (!isBoon && (!isXtuOrN || isLastLetter)) {
                        hebon += c;
                    }

                    if (isBoon) {
                        lastConvert ="";
                        continue;
                    }
                } // end append

                lastConvert = c;
            } // end loop

            return hebon;
        }

 if (typeof String.prototype.startsWith != 'function') {
    // see below for better implementation!
    String.prototype.startsWith = function (str){
      return this.indexOf(str) == 0;
    };
 }

 String.prototype.toHebon = function() {
        return toHebon(this);
    }
}
