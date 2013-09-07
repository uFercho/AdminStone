/*
 * Ext JS Library 2.0
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 *
 * http://extjs.com/license
 */

//Variables por defecto para mensajes y demás

var msgFailure="No se pudo establecer comunicaci&oacute;n con el Servidor.<br>Vuelva a intentarlo";


Ext.BLANK_IMAGE_URL = 'ext/resources/images/default/s.gif';

Ext.ns('Ext.ux.plugins');

/*!
 * MaskIt 1.0
 * Allan Brazute Alves (EthraZa)
 * http://www.ghsix.com.br/allan
 * 
 * ExtJs plugin to mask a form field
 */
Ext.ux.plugins.MaskIt = function(config) {
    this.addEvents({
        'mask' : true
    });
    Ext.apply(this, config);
};

Ext.extend(Ext.ux.plugins.MaskIt, Ext.util.Observable, {
    init: function(field){
        if (!field.isFormField)
            return false;
        
        // Defaults
        Ext.applyIf(field, {
            /**
             * @cfg {String}
             * Word characters are word characters, 
             * numbers limit the max number 
             * and non word, numbers or the placeholder char are the mask it self. 
             * Default is '(99) 9999-9999', Brazil 10 digit phone number 
             */
            mask: '(99) 9999-9999',
            /**
             * @cfg {Bool/String}
             * If set, it generally will be '_' and the field will be filled with the place holder plus the mask. 
             */
            placeholder: false,
            /**
             * @cfg {RegEx}
             * The RegExp to remove the mask and return the value only characters. 
             * Default is /(\W|_)/g that take out any non word or number char plus the underscore. 
             */
            unmaskRe: /(\W|_)/g,
            /**
             * @cfg {Bool}
             * If true, the getValue method will return the unmasked value. Default is true
             */
            getUnmasked: true,
            /**
             * @cfg {Bool}
             * If true, it applies the value plus the mask to the field, 
             * the function maskIt will just return the value masked and do nothing to the field. Default is true.
             */
            applyValue: true
        });
        
        // Apply
        Ext.apply(field, {
            validationDelay: 0,
            validateOnBlur: false,
            
            getCursor : function(oCom) {
                var elDom = oCom.getEl().dom;
                var s, e, r;
                if(elDom.createTextRange){
                    r = document.selection.createRange().duplicate();
                    r.moveEnd('character', elDom.value.length);
        
                    if(r.text === ''){
                        s = elDom.value.length;
                    } else {
                        s = elDom.value.lastIndexOf(r.text);
                    }
                    r = document.selection.createRange().duplicate();
                    r.moveStart('character', -elDom.value.length);
                    e = r.text.length;
                } else {
                    s = elDom.selectionStart;
                    e = elDom.selectionEnd;
                }
                return {start: isNaN(s)? 0 : s, end: isNaN(e)? 0 : e, range: r};
            },
            
            setCursor : function(cursorPosition, incPos) {
                var elDom = this.getEl().dom;
                var p = cursorPosition.start + incPos||0;
                p = (p > elDom.value.length)? elDom.value.length : p;
                
                if (elDom.createTextRange) {
                    cursorPosition.range.move('character', p);
                    cursorPosition.range.select();
                } else {
                    elDom.focus();
                    elDom.setSelectionRange(p,p);
                }
            },
            
            /**
             * @param {string} (optional) The string to be masked. Default to field raw value
             * @param {bool} (optional) If true the masked value will be set to the field, if false the masked value will be just returned
             * 
             * Apply the defined mask to a string.
             */
            maskIt : function(sValue, bApplyValue){
                bApplyValue = (!Ext.isEmpty(bApplyValue))? bApplyValue : this.applyValue||false;
                sValue = (sValue)? String(sValue) : this.unmaskIt(this.getRawValue());
                if (!sValue)
                    return false;
                
                var vp = 0; //value position
                var mp = 0; //mask position
                var cp = 0; //increase cursor position in
                try {
                    var pos = this.getCursor(this) || 0; //cursor position
                } catch(err) {
                    var pos = 0;
                }
                var r = ''; //return isValid
                
                if (typeof this.placeholder == 'string') {
                    while (sValue.length < this.mask.length) {
                        sValue += this.placeholder;
                    }
                }
                
                while (vp < sValue.length && r.length < this.mask.length) {
                    var mm = this.mask.charAt(mp); //get next mask char
                    var vv = sValue.charAt(vp); //get next val char
                    
                    if (/\W/.test(mm)) { // Non word char
                        var vreg = new RegExp('\\W')
                    } else if(isNaN(mm*1)) { // Word
                        var vreg = new RegExp('[A-Za-z]')    
                    } else { // Number
                        var vreg = new RegExp('\\d')
                    }
                    
                    if (/\W/.test(mm)) { // Mask char
                        r += mm;
                        ++mp;
                        if ((mp == pos.start+cp) || (mp >= pos.start && vreg.test(vv) && vv != this.placeholder)) ++cp;
                    } else if (vreg.test(vv) || vv == this.placeholder) { // Value char
                        if (isNaN(mm*1) || vv == this.placeholder) {
                            r += vv;
                        } else if (vv <= mm){
                            r += vv;
                        }
                        ++vp;
                        ++mp;
                    } else {
                        ++vp;
                    }
                }
                
                // Fire mask event passing scope, old value and new masked value
                this.fireEvent('mask', this, sValue, r);
                
                if (bApplyValue) {
                    try {
                        this.setRawValue(r);
                        this.setCursor(pos, cp);
                    } catch(err){}
                    return true
                } else {
                    return r
                }
            },
            
            /**
             * @param {string} The string to be unmasked
             * 
             * Replace a string mask characters with "" (empty) using the defined unmaskRe RegExp.
             */
            unmaskIt : function(sValue){
                return (Ext.isString(sValue))? sValue.replace(this.unmaskRe,'') : '';
            },
            
            extGetValue : field.getValue,
            
            getValue : function(){
                return (this.getUnmasked)? this.unmaskIt(this.extGetValue()) : this.extGetValue();
            },
            
            // Events
            validate : field.validate.createSequence(function(){
                this.maskIt();
            })
            
        });
        
    }
});
Ext.preg('maskit', Ext.ux.plugins.MaskIt);
//eo maskIt plugin  

Ext.utiles = function(){
    var msgCt;

    function createBox(t, s){
        return ['<div class="msg">',
                '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
                '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
                '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
                '</div>'].join('');
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            msgCt.alignTo(document, 't-t');
            var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s)}, true);
            m.slideIn('t').pause(3).ghost("t", {remove:true});
        },

        init : function(){
            var t = Ext.get('exttheme');
            if(!t){ // run locally?
                return;
            }
            var theme = Cookies.get('exttheme') || 'aero';
            if(theme){
                t.dom.value = theme;
                Ext.getBody().addClass('x-'+theme);
            }
            t.on('change', function(){
                Cookies.set('exttheme', t.getValue());
                setTimeout(function(){
                    window.location.reload();
                }, 250);
            });

            var lb = Ext.get('lib-bar');
            if(lb){
                lb.show();
            }
        }
    };
}();

Ext.utiles.shortBogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.';
Ext.utiles.bogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.</p>';

Ext.util.MD5 = function(s,raw,hexcase,chrsz) {
	raw = raw || false;	
	hexcase = hexcase || false;
	chrsz = chrsz || 8;

	function safe_add(x, y){
		var lsw = (x & 0xFFFF) + (y & 0xFFFF);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return (msw << 16) | (lsw & 0xFFFF);
	}
	function bit_rol(num, cnt){
		return (num << cnt) | (num >>> (32 - cnt));
	}
	function md5_cmn(q, a, b, x, s, t){
		return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
	}
	function md5_ff(a, b, c, d, x, s, t){
		return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
	}
	function md5_gg(a, b, c, d, x, s, t){
		return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
	}
	function md5_hh(a, b, c, d, x, s, t){
		return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}
	function md5_ii(a, b, c, d, x, s, t){
		return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
	}

	function core_md5(x, len){
		x[len >> 5] |= 0x80 << ((len) % 32);
		x[(((len + 64) >>> 9) << 4) + 14] = len;
		var a =  1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d =  271733878;
		for(var i = 0; i < x.length; i += 16){
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
			d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
			c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
			b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
			a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
			d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
			c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
			b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
			a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
			d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
			c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
			b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
			a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
			d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
			c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
			b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
			a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
			d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
			c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
			b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
			a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
			d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
			c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
			b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
			a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
			d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
			c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
			b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
			a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
			d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
			c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
			b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
			a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
			d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
			c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
			b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
			a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
			d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
			c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
			b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
			a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
			d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
			c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
			b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
			a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
			d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
			c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
			b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
			a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
			d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
			c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
			b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
			a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
			d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
			c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
			b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
			a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
			d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
			c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
			b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
			a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
			d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
			c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
			b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);
			a = safe_add(a, olda);
			b = safe_add(b, oldb);
			c = safe_add(c, oldc);
			d = safe_add(d, oldd);
		}
		return [a, b, c, d];
	}
	function str2binl(str){
		var bin = [];
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < str.length * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
		}
		return bin;
	}
	function binl2str(bin){
		var str = "";
		var mask = (1 << chrsz) - 1;
		for(var i = 0; i < bin.length * 32; i += chrsz) {
			str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
		}
		return str;
	}
	
	function binl2hex(binarray){
		var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
		var str = "";
		for(var i = 0; i < binarray.length * 4; i++) {
			str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) + hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
		}
		return str;
	}
	return (raw ? binl2str(core_md5(str2binl(s), s.length * chrsz)) : binl2hex(core_md5(str2binl(s), s.length * chrsz))	);
};

function roundNumber(rnum, rlength) {
  var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
  return newnumber; 
};

function formatNumber(num,prefix){
	prefix = prefix || '';
	num += '';
	var splitStr = num.split('.');
	var splitLeft = splitStr[0];
	var splitRight = splitStr.length > 1 ? '.' + splitStr[1] : '';
	var regx = /(\d+)(\d{3})/;
	while (regx.test(splitLeft)) {
		splitLeft = splitLeft.replace(regx, '$1' + ',' + '$2');
	}
	return splitLeft + splitRight + prefix;
};

function unformatNumber(num) {
	return num.replace(/([^0-9\.\-])/g,'')*1;
};

// Función modulo, regresa el residuo de una división 
function mod(dividendo , divisor) 
{ 
  resDiv = dividendo / divisor ;  
  parteEnt = Math.floor(resDiv);            // Obtiene la parte Entera de resDiv 
  parteFrac = resDiv - parteEnt ;      // Obtiene la parte Fraccionaria de la división
  //modulo = parteFrac * divisor;  // Regresa la parte fraccionaria * la división (modulo) 
  modulo = Math.round(parteFrac * divisor)
  return modulo; 
}; // Fin de función mod

// Función ObtenerParteEntDiv, regresa la parte entera de una división
function ObtenerParteEntDiv(dividendo , divisor) 
{ 
  resDiv = dividendo / divisor ;  
  parteEntDiv = Math.floor(resDiv);
  return parteEntDiv; 
}; // Fin de función ObtenerParteEntDiv

// function fraction_part, regresa la parte Fraccionaria de una cantidad
function fraction_part(dividendo , divisor) 
{ 
  resDiv = dividendo / divisor ;  
  f_part = Math.floor(resDiv); 
  return f_part; 
}; // Fin de función fraction_part


// function string_literal conversion is the core of this program 
// converts numbers to spanish strings, handling the general special 
// cases in spanish language. 
function string_literal_conversion(number) 
{   
   // first, divide your number in hundreds, tens and units, cascadig 
   // trough subsequent divisions, using the modulus of each division 
   // for the next. 

   centenas = ObtenerParteEntDiv(number, 100); 
   
   number = mod(number, 100); 

   decenas = ObtenerParteEntDiv(number, 10); 
   number = mod(number, 10); 

   unidades = ObtenerParteEntDiv(number, 1); 
   number = mod(number, 1);  
   string_hundreds="";
   string_tens="";
   string_units="";
   // cascade trough hundreds. This will convert the hundreds part to 
   // their corresponding string in spanish.
   if(centenas == 1){
      string_hundreds = "ciento ";
   } 
   
   
   if(centenas == 2){
      string_hundreds = "doscientos ";
   }
    
   if(centenas == 3){
      string_hundreds = "trescientos ";
   } 
   
   if(centenas == 4){
      string_hundreds = "cuatrocientos ";
   } 
   
   if(centenas == 5){
      string_hundreds = "quinientos ";
   } 
   
   if(centenas == 6){
      string_hundreds = "seiscientos ";
   } 
   
   if(centenas == 7){
      string_hundreds = "setecientos ";
   } 
   
   if(centenas == 8){
      string_hundreds = "ochocientos ";
   } 
   
   if(centenas == 9){
      string_hundreds = "novecientos ";
   } 
   
 // end switch hundreds 

   // casgade trough tens. This will convert the tens part to corresponding 
   // strings in spanish. Note, however that the strings between 11 and 19 
   // are all special cases. Also 21-29 is a special case in spanish. 
   if(decenas == 1){
      //Special case, depends on units for each conversion
      if(unidades == 1){
         string_tens = "once";
      }
      
      if(unidades == 2){
         string_tens = "doce";
      }
      
      if(unidades == 3){
         string_tens = "trece";
      }
      
      if(unidades == 4){
         string_tens = "catorce";
      }
      
      if(unidades == 5){
         string_tens = "quince";
      }
      
      if(unidades == 6){
         string_tens = "dieciseis";
      }
      
      if(unidades == 7){
         string_tens = "diecisiete";
      }
      
      if(unidades == 8){
         string_tens = "dieciocho";
      }
      
      if(unidades == 9){
         string_tens = "diecinueve";
      }
   } 
   //alert("STRING_TENS ="+string_tens);
   
   if(decenas == 2){
      string_tens = "veinti";

   }
   if(decenas == 3){
      string_tens = "treinta";
   }
   if(decenas == 4){
      string_tens = "cuarenta";
   }
   if(decenas == 5){
      string_tens = "cincuenta";
   }
   if(decenas == 6){
      string_tens = "sesenta";
   }
   if(decenas == 7){
      string_tens = "setenta";
   }
   if(decenas == 8){
      string_tens = "ochenta";
   }
   if(decenas == 9){
      string_tens = "noventa";
   }
   
    // Fin de swicth decenas


   // cascades trough units, This will convert the units part to corresponding 
   // strings in spanish. Note however that a check is being made to see wether 
   // the special cases 11-19 were used. In that case, the whole conversion of 
   // individual units is ignored since it was already made in the tens cascade. 

   if (decenas == 1) 
   { 
      string_units="";  // empties the units check, since it has alredy been handled on the tens switch 
   } 
   else 
   { 
      if(unidades == 1){
         string_units = "un";
      }
      if(unidades == 2){
         string_units = "dos";
      }
      if(unidades == 3){
         string_units = "tres";
      }
      if(unidades == 4){
         string_units = "cuatro";
      }
      if(unidades == 5){
         string_units = "cinco";
      }
      if(unidades == 6){
         string_units = "seis";
      }
      if(unidades == 7){
         string_units = "siete";
      }
      if(unidades == 8){
         string_units = "ocho";
      }
      if(unidades == 9){
         string_units = "nueve";
      }
       // end switch units 
   } // end if-then-else 
   

	//final special cases. This conditions will handle the special cases which 
	//are not as general as the ones in the cascades. Basically four: 
	
	// when you've got 100, you dont' say 'ciento' you say 'cien' 
	// 'ciento' is used only for [101 >= number > 199] 
	if (centenas == 1 && decenas == 0 && unidades == 0) 
	{ 
	   string_hundreds = "cien " ; 
	}  
	
	// when you've got 10, you don't say any of the 11-19 special 
	// cases.. just say 'diez' 
	if (decenas == 1 && unidades ==0) 
	{ 
	   string_tens = "diez " ; 
	} 
	
	// when you've got 20, you don't say 'veinti', which is used 
	// only for [21 >= number > 29] 
	if (decenas == 2 && unidades ==0) 
	{ 
	  string_tens = "veinte " ; 
	} 
	
	// for numbers >= 30, you don't use a single word such as veintiuno 
	// (twenty one), you must add 'y' (and), and use two words. v.gr 31 
	// 'treinta y uno' (thirty and one) 
	if (decenas >=3 && unidades >=1) 
	{ 
	   string_tens = string_tens+" y "; 
	} 
	
	// this line gathers all the hundreds, tens and units into the final string 
	// and returns it as the function value.
	final_string = string_hundreds+string_tens+string_units;
	
	
	return final_string ; 

}; //end of function string_literal_conversion()================================ 

// handle some external special cases. Specially the millions, thousands 
// and hundreds descriptors. Since the same rules apply to all number triads 
// descriptions are handled outside the string conversion function, so it can 
// be re used for each triad. 


function covertirNumLetras(number)
{
   
  //number = number_format (number, 2);
   number1=number; 
   //settype (number, "integer");
   cent = number1.split(".");   
   centavos = cent[1];
   //Mind Mod
   number=cent[0];
   
   if (centavos == 0 || centavos == undefined)
   {
	centavos = "00";
   }

   if (number == 0 || number == "") 
   { // if amount = 0, then forget all about conversions, 
      centenas_final_string=" cero "; // amount is zero (cero). handle it externally, to 
      // function breakdown 
  } 
   else 
   { 
   
     millions  = ObtenerParteEntDiv(number, 1000000); // first, send the millions to the string 
      number = mod(number, 1000000);           // conversion function 
      
     if (millions != 0)
      {                      
      // This condition handles the plural case 
         if (millions == 1) 
         {              // if only 1, use 'millon' (million). if 
            descriptor= " millon ";  // > than 1, use 'millones' (millions) as 
            } 
         else 
         {                           // a descriptor for this triad. 
              descriptor = " millones "; 
            } 
      } 
      else 
      {    
         descriptor = " ";                 // if 0 million then use no descriptor. 
      } 
      millions_final_string = string_literal_conversion(millions)+descriptor; 
          
      
      thousands = ObtenerParteEntDiv(number, 1000);  // now, send the thousands to the string 
        number = mod(number, 1000);            // conversion function. 
      //print "Th:".thousands;
     if (thousands != 1) 
      {                   // This condition eliminates the descriptor 
         thousands_final_string =string_literal_conversion(thousands) + " mil "; 
       //  descriptor = " mil ";          // if there are no thousands on the amount 
      } 
      if (thousands == 1)
      {
         thousands_final_string = " mil "; 
     }
      if (thousands < 1) 
      { 
         thousands_final_string = " "; 
      } 
  
      // this will handle numbers between 1 and 999 which 
      // need no descriptor whatsoever. 

     centenas  = number;                     
      centenas_final_string = string_literal_conversion(centenas) ; 
      
   } //end if (number ==0) 

   /*if (ereg("un",centenas_final_string))
   {
     centenas_final_string = ereg_replace("","o",centenas_final_string); 
   }*/
   //finally, print the output. 

   /* Concatena los millones, miles y cientos*/
   cad = millions_final_string+thousands_final_string+centenas_final_string; 
   
   /* Convierte la cadena a Mayúsculas*/
   cad = cad.toUpperCase();       

   if (centavos.length>2)
   {  
	
      if(centavos.substring(2,3)>= 5){
         centavos = centavos.substring(0,1)+(parseInt(centavos.substring(1,2))+1).toString();
      }   else{
	  
        centavos = centavos.substring(0,1);
      }
   }

   /* Concatena a los centavos la cadena "/100" */
   if (centavos.length==1)
   {
      centavos = centavos+"0";
   }
   centavos = centavos+ "/100"; 


   /* Asigna el tipo de moneda, para 1 = PESO, para distinto de 1 = PESOS*/
   if (number == 1)
   {
      moneda = " BOLIVAR FUERTE ";  
   }
   else
   {
      moneda = " BOLIVARES FUERTES ";  
   }
   /* Regresa el número en cadena entre paréntesis y con tipo de moneda y la fase M.N.*/
   //Mind Mod, si se deja MIL pesos y se utiliza esta función para imprimir documentos
   //de caracter legal, dejar solo MIL es incorrecto, para evitar fraudes se debe de poner UM MIL pesos
   if(cad == '  MIL ')
   {
	cad=' UN MIL ';
   }
   
   return cad+moneda+'CON '+centavos/*+" M.N."*/;
};

function doJSON(stringData) {
	try {
		stringData = stringData.split('\r').join('\\r');
		stringData = stringData.split('\n').join('\\n');
		var jsonData = Ext.util.JSON.decode(stringData);
		return jsonData;
	}
	catch (err) {
		//Ext.MessageBox.alert('ERROR', 'No es posible interpretar los datos recibidos.<br>Vuelva a intentarlo' + stringData);
		//Variables de la excepcion serian, err.message, err.description
		Ext.MessageBox.alert('ERROR', 'No es posible interpretar los datos recibidos.<br>Vuelva a intentarlo. '+err.description);
	}
};

//Método utilizado para pasar una cadena de texto a HTML y sustituir los \n por <br>
function Text2Html(cadena){
	var result = Ext.util.Format.htmlEncode(cadena);
	result = cadena.split('\n').join('<br/>');
	return result;
};



//Método utlilizado para cambiar caracteres especiales de para acentos
/*function SustituirCadena(Cadena){
	console.debug(Cadena);
	Cadena = Cadena.replace(/&aacute;/g, 'á');
	Cadena = Cadena.replace(/&eacute;/g, 'é');
	Cadena = Cadena.replace(/&iacute;/g, 'í');
	Cadena = Cadena.replace(/&oacute;/g, 'ó');
	Cadena = Cadena.replace(/&uacute;/g, 'ú');
	Cadena = Cadena.replace(/&Aacute;/g, 'Á');
	Cadena = Cadena.replace(/&Eacute;/g, 'É');
	Cadena = Cadena.replace(/&Iacute;/g, 'Í');
	Cadena = Cadena.replace(/&Oacute;/g, 'Ó');
	Cadena = Cadena.replace(/&Uacute;/g, 'Ú');
	console.debug(Cadena);
	return Cadena;
};*/

//Método utlilizado para obtener el parametro con clave determinada de entre una array de parametros
function getParametro(array, clave){
	for(i=0; i<array.length; i++){
		var param=array[i];
		if(param.clave==clave)
			return param;
	}
	return null;
};

function reFresh(){
	location.reload(true);
};

//Ext.onReady(Ext.example.init, Ext.example);

// old school cookie functions grabbed off the web
var Cookies = {};
Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;

     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");

};

Cookies.get = function(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while(i < clen){
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0)
			break;
	}
	return null;
};

Cookies.clear = function(name) {
  if(Cookies.get(name)){
    document.cookie = name + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
};

Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};