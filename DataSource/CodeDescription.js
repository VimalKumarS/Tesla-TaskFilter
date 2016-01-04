/**
 * Created by vimalkumar on 10/18/2015.
 */

/**
 * Created by vimalkumar on 10/18/2015.
 */

var $= require('jquery');
var parseString =require('xml2js').parseString;
var Code_Step_Name = function ($) {
    var codeData = '<codes> \
                     <code>14456</code> \
                     <code>13225</code> \
                     <code>13236</code> \
                     <code>55237</code> \
                </codes>';

    var codeDepndency = function (code) {
        var codeDep = "";
        switch (code) {
            case 14456:
                codeDep = '<codeDepedencies> \
                            <code>14456</code>\
                             <children>\
                                 <code>13225</code>\
                                <code>13236</code>\
                                <code>1</code>\
                                <code>2</code>\
                            </children>\
                            </codeDepedencies>';
                break;
            case 13225:
                codeDep = '<codeDepedencies> \
                            <code>13225</code> \
                                 <children> \
                                  </children> \
                            </codeDepedencies>';
                break;
            case 13236:
                codeDep = ' <codeDepedencies> \
                            <code>13236</code>\
                                <children>\
                                <code>55237</code>\
                                </children>\
                            </codeDepedencies>'

                break;
            case 55237:
                codeDep = '<codeDepedencies>\
                            <code>55237</code>\
                                <children>\
                                </children>\
                            </codeDepedencies>'
                break;
            default:
                break;

        }
        return codeDep;
    };

    var jsonData={};
    var fetchCompleteList=function(code,jsonData){


        var data =codeDepndency(code);
        var nodetext = [];

        parseString(data, function (err, result) {
            xmlobj=result;
        });

        if(xmlobj !=null) {
            if(Array.isArray(jsonData))
            {
                jsonData.push({text:code});
            }
            else{
                //  var temp=[jsonData];
                // jsonData=temp;
            }
            if (xmlobj.codeDepedencies.children && xmlobj.codeDepedencies.children[0].code && xmlobj.codeDepedencies.children[0].code.length > 0) {
                var len = xmlobj.codeDepedencies.children[0].code.length;
                for (var i = 0; i < len; i++) {

                    nodetext.push({text: xmlobj.codeDepedencies.children[0].code[i]});
                }

            }

            if(nodetext.length>0) {
                jsonData['nodes']=nodetext;
            }
            else{
                jsonData=jsonData[0];
            }
            for (var i = 0; i < nodetext.length; i++) {
                var val=fetchCompleteList(parseInt(nodetext[i].text), jsonData['nodes'][i]);
                if(val !=  null) {
                    jsonData['nodes'][i] =val;
                }
            }
            return jsonData;
        }
        else
        {
            return null;
        }
    };

    return {
        data: codeData,
        codeDepndency: codeDepndency,
        fetchCompleteList:fetchCompleteList,
        jsonData:jsonData

    }

}($);

module.exports = Code_Step_Name;