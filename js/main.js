/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

//
// This is the main layout definition.
//


Ext.onReady(function(){
	//Ext.BLANK_IMAGE_URL = '../ext/resources/images/default/s.gif';
	
    Ext.QuickTips.init(true);

//	Ext.QuickTips.init();
	
	var detailEl;	
	
	var idUsuario = '1';
	var tipoUsuario = 'Administrador';
	
	var contentPanel = new Ext.Panel({
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		layout: 'card',	
		margins:'0 5 5 5',
		cmargins:'0 5 5 5',
		activeItem: 0,
		border: false,
		//xtype:	"panel",
		items:[/*start*/{
			//region    : 'center',
			border    : false,
			//anchor:'right -150',
			contentEl : 'start-div'  // pull existing content from the page
		}, absolute]//<--- dentro de la región central normalmente va el contenido principal, así que poner ahi los cards tiene mucho sentido.
	});	
	
	var menuPanel = new Ext.Panel({
		id: 'menu-panel',
		region: 'north', // this is what makes this panel into a region within the containing layout	
		margins:'35 5 5 5',
		cmargins:'35 5 5 5',
		border: false,
		tbar: [{
            xtype: 'buttongroup',
            title: '<p style="font:normal 17px arial,tahoma, helvetica, sans-serif;">M&oacute;dulos</p>',
            defaults: {
                scale: 'medium'
            },
            items: [{
				text: 'Contratista',
				iconCls: 'icon-menu-contratistas', 
				handler: function(){
					loadData("Contratista");
				}
			},{xtype: 'tbseparator'},{
				text: 'Relaciones', 
				iconCls: 'icon-menu-relaciones', 
				handler: function(){
					loadData("Relaciones");
				}
			},{xtype: 'tbseparator'},{
				text: 'Cuentas por Cobrar', 
				iconCls: 'icon-menu-cobros', 
				handler: function(){
					loadData("Cuentas por Cobrar");
				}
			},{xtype: 'tbseparator'},{
				text: 'Emisi&oacute;n de Pagos', 
				iconCls: 'icon-menu-pagos', 
				handler: function(){
					loadData("Emisión de Pagos");
				}
			}]
        },'->',{
            xtype: 'buttongroup',
            title: '<p style="font:normal 17px arial,tahoma, helvetica, sans-serif;">Opciones</p>',
            defaults: {
                scale: 'medium'
            },
            items: [{
				text: 'Gesti&oacute;n de Usuario', 
				iconCls: 'icon-user', 
				handler: function(){
					loadData("Gestión de Usuario");
				}
			}/*,{xtype: 'tbseparator'},{
				text: 'Ajustes', 
				iconCls: 'icon-menu-ajustes', 
				handler: function(){
					Ext.Msg.alert('Relaciones','Modulo en Construccion');
				}
			}*/,{xtype: 'tbseparator'},{
				text: 'Herramientas', 
				iconCls: 'icon-menu-ayuda',     
	            menu:{ // <--- add a menu to the button  
					items: [  
						{
							text:'Manual de Usuario',
							handler: function(){openwin('documentos/Manual de Usuario Andrea Britoo.pdf');}
						}, // <--- This is an item for the menu  
						{
							text:'Respaldo de la BD',
							handler: function(){
								
								var maskView = new Ext.LoadMask(document.body);
								maskView.show();	
								
								Ext.Ajax.request({
									url : 'php/database_backup/backup.php' , 
									method: 'POST',
									success: function ( result, request ) { 
																				
										maskView.hide();
										Ext.MessageBox.alert('', result.responseText);
									},
									failure: function ( result, request) { 
										Ext.MessageBox.alert('Failed', result.responseText); 
										maskView.hide();
									} 
								});	
								
							}
						}, // <--- This is an item for the menu  
						{
							text:'Restauraci&oacute;n de la BD',
							handler: function(){
								var maskView = new Ext.LoadMask(document.body);
								maskView.show();			
								
								Ext.Ajax.request({
									url : 'php/database_backup/restore.php' , 
									method: 'POST',
									success: function ( result, request ) { 
										maskView.hide();
										Ext.MessageBox.alert('', result.responseText);
									},
									failure: function ( result, request) { 
										Ext.MessageBox.alert('Failed', result.responseText); 
										maskView.hide();
									} 
								});	
							}
						}
					]  
				},  // assign menu by instance
				handler: function(){
					
				}
			},{xtype: 'tbseparator'},{
				text: 'Acerca de...', 
				iconCls: 'icon-menu-info', 
				handler: function(){
					new Ext.Window({
						id : 'win-acerca',
						title : 'Acerca de AdminStone',
						layout : 'border',
						bodyStyle :'padding:5x 5px 5px 5px;',
						width       : 450,
						height      : 300,
						resizable : false,
						modal : true,
						//autoDestroy : true,
						closable : true,
						closeAction : 'close',
						plain : true,
						buttonAlign :'center',
						items:[{
							border: false,
							region: 'center',
							html:	'<div class="acerca-de" style=" background-image:url(images/logo_gm.png);">'+
										'<h1>AdminStone</h1> <br> '+
										'<p>versi&oacute;n: 1.1.0</p><br><br> '+
									'</div>'
						},{
							border: false,
							region: 'south',
							plain: true,
							height: 120,
							html:	'<div class="acerca-de-desc">'+
										'<p>&copy; Copyright 2011 - Granitmar C.A. Todos los derechos reservados.</p> <br> '+
										'<p>AdminStone fue desarrollado gracias a PHP, Extjs y a otros programas </p> '+
										'<p>de c&oacute;digo Abierto.</p><br> '+
										'<p>Autor: Andrea Brito G. </p> '+
									'</div>'
						}]
						
					}).show();
				}
			}]
        }],
		items:[]//<--- dentro de la región central normalmente va el contenido principal, así que poner ahi los cards tiene mucho sentido.
	});
	
	// This is the Details panel that contains the description for each example layout.	
	
	Ext.apply(Ext.form.VTypes,{
		numbers: function(value,field){
			return value.replace(/[ \-]/g,'').length <= 11;
		},
		numbersText: 'Este campo debe tener solo digitos',
		numbersMask: /[ \d]/  
	});
	
	var camposContratista=[
		{  
			id:'ct-id',
			xtype:'hidden',//<-- campo oculto (hidden)  
			name:'txt-id', //el nombre con que se envia al servidor  
			value:'developer'//el valor que contendrá  
		},{
			id:'ct-nombre',
			xtype : 'textfield',
			fieldLabel:'Nombre',
			name:'txt-nombre',
			emptyText:'Nombres...'
		},{
			id:"ct-apellido",
			xtype : 'textfield',
			fieldLabel:'Apellido', // creamos un campo
			name:'txt-apellido', // a partir de una
			emptyText:'Apellidos...'
		},{
			id:"ct-cedula",
			xtype : 'textfield',
			fieldLabel:'C&eacutedula', // creamos un campo
			name:'txt-cedula', // a partir de una
			vtype:'numbers',
			mask: '99999999',
			emptyText: '',
			plugins: new Ext.ux.plugins.MaskIt()
		},{
			id:"ct-sexo",
			xtype:'combo',
			fieldLabel:'Sexo',  
			name:'cmb-sexo',  
			forceSelection:true,
			store:['Masculino','Femenino'],  
			emptyText:'Seleccione sexo...',  
			triggerAction:'all',   
			editable:false
		},{
			id:"ct-civil",
			xtype:'combo',
			fieldLabel:'Estado Civil',  
			name:'cmb-civil',  
			forceSelection:true,
			store:['Soltero','Casado','Viudo'],  
			//emptyText:'Seleccione edo...',  
			triggerAction:'all',   
			editable:false,
			allowBlank:true
		},{
			id:"ct-fnacimiento",
			xtype:'datefield',
			fieldLabel:'Fecha Nacimiento',
			name:'dat-fnacimiento',  
			editable:false,  
			emptyText:'Inserte fecha...',
			format:'d/m/Y',
			maxValue:new Date()
		},{
			id:"ct-lnacimiento",
			xtype : 'textfield',
			fieldLabel:'Lugar Nacimiento', // creamos un campo
			name:'txt-lnacimiento', // a partir de una
			//emptyText:'Ciudad y Estado...',
			allowBlank:true
		},{
			id:"ct-fijo",
			xtype : 'textfield',
			fieldLabel:'Telf. (Fijo)', // creamos un campo
			name:'txt-fijo', // a partir de una
			vtype:'numbers',
			mask: '9999 999 9999',
			emptyText: '____ ___ ____',
			plugins: new Ext.ux.plugins.MaskIt()
		},{
			id:"ct-movil",
			xtype : 'textfield',
			fieldLabel:'Telf. (M&oacutevil)', // creamos un campo
			name:'txt-movil', // a partir de una
			vtype:'numbers',
			mask: '9999 999 9999',
			emptyText: '____ ___ ____',
			plugins: new Ext.ux.plugins.MaskIt()
		},{
			id:"ct-direc",
			xtype:'textarea',
			fieldLabel:'Direcci&oacuten', // creamos un campo
			name:'txt-direc', // a partir de una
			//emptyText:'Direccion',
			allowBlank:true
		},{       
			id:"ct-email",
			xtype : 'textfield',
			fieldLabel:'Email', // creamos un campo
			name:'txt-email', // a partir de una
			emptyText:'usuario@dominio...',
			vtype:'email'
		},{
			id:"ct-ingreso",
			xtype:'datefield',
			fieldLabel:'Fecha Ingreso',
			name:'dat-ingreso',  
			editable:false,  
			emptyText:'Inserte fecha...',
			format:'d/m/Y',
			maxValue:new Date() // <-- max date,
		}
	];
	
	
	function save_cont(){
		if (Ext.getCmp('form-cont').form.isValid()) {
			//Ext.getCmp('form-cont').setValue();
			Ext.getCmp('form-cont').form.submit({
				waitTitle : "Validando",			
				url       : 'php/contratista/saveCont.php',
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
				},
				success: function(sender,action) {
					Ext.Msg.alert('',action.result.msg);
					Ext.getCmp('win-addCont').close();
				}
			});
		}else{
			/*console.debug('Formulario invalido');*/
		}
	}
	
	function edit_cont(){
		if (Ext.getCmp('form-cont').form.isValid()) {
			//Ext.getCmp('form-cont').setValue();
			Ext.getCmp('form-cont').form.submit({
				waitTitle : "Validando",			
				url       : 'php/contratista/editCont.php',
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
				},
				success: function(sender,action) {
					Ext.Msg.alert('',action.result.msg);
					Ext.getCmp('win-editCont').close();
				}
			});
		}else{
			/*console.debug('Formulario invalido');*/
		}
	};
	
	function delete_cont(){
		if (Ext.getCmp('form-cont').form.isValid()) {
			//Ext.getCmp('form-cont').setValue();
			Ext.getCmp('form-cont').enable();
			Ext.getCmp('form-cont').form.submit({
				waitTitle : "Validando",			
				url       : 'php/contratista/deleteCont.php',
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
					Ext.getCmp('form-cont').disable();
				},
				success: function(sender,action) {
					Ext.Msg.alert('',action.result.msg);
					Ext.getCmp('win-deleteCont').close();
				}
			});
		}else{
			/*console.debug('Formulario invalido');*/
		}
	};
	
	function openwin(url){
		var ventana = window.open(url,'popup','width=600,height=800');
	};
	
	function roundNumber(rnum, rlength) {
	  var newnumber = Math.round(rnum*Math.pow(10,rlength))/Math.pow(10,rlength);
	  return newnumber; 
	};
	
	var moduleContratista = {
					id:'printer',
					title:'Gesti&oacute;n de Contratista',					
					cls:'inner-tab-custom', // custom styles in layout-browser.css
					//layout   : 'border',
					hideMode:Ext.isIE ? 'offsets' : 'display',
					tbar: [{
						text: 'Agregar', 
						iconCls: 'icon-user-add', 
                		scale: 'medium',
						handler: function(){							
							
							var setContratista = new Ext.form.FormPanel({
								id : 'form-cont',
								bodyStyle :'padding: 10px',
								border : false,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Datos del Contratista ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposContratista]
								}]
							});
							
							new Ext.Window({
								id : 'win-addCont',
								title : 'Agregar Contratista',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 400,
								height : 500,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[setContratista],
								buttons: [{
									text:'Aceptar',
									align:'center',
									handler: function (){
										save_cont();
										//Ext.getCmp('add-cvs').enable();
										//Ext.getCmp('add-txt').enable();
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-addCont').close();
									}
								}]
							}).show();
						}
					},'-',{
						text: 'Editar', 
						iconCls: 'icon-user-edit',
                		scale: 'medium', 
						handler: function(){
							
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							storeContra.on("load",function(Store,records,options,groups){
								//panelView.doLayout();
								Ext.getCmp('ct-nombre').reset();
								Ext.getCmp('ct-apellido').reset();
								Ext.getCmp('ct-cedula').reset();
								Ext.getCmp('ct-sexo').reset();
								Ext.getCmp('ct-civil').reset();
								Ext.getCmp('ct-fnacimiento').reset();
								Ext.getCmp('ct-lnacimiento').reset();
								Ext.getCmp('ct-fijo').reset();
								Ext.getCmp('ct-movil').reset();
								Ext.getCmp('ct-direc').reset();
								Ext.getCmp('ct-email').reset();
								Ext.getCmp('ct-ingreso').reset();
								Ext.getCmp('form-cont').disable();
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect
									
									var maskView = new Ext.LoadMask(Ext.getCmp('form-cont').getEl());
									maskView.show();	
									
									Ext.Ajax.request({
										url : 'php/contratista/getCont.php' , 
										params : {id:record.data.id},
										method: 'POST',
										success: function ( result, request ) { 
											Ext.getCmp('ct-id').setValue(result.responseText.split(';')[0].trim());
											Ext.getCmp('ct-nombre').setValue(result.responseText.split(';')[1].trim());
											Ext.getCmp('ct-apellido').setValue(result.responseText.split(';')[2].trim());
											Ext.getCmp('ct-cedula').setValue(result.responseText.split(';')[3].trim());
											Ext.getCmp('ct-sexo').setValue(result.responseText.split(';')[4].trim());
											Ext.getCmp('ct-civil').setValue(result.responseText.split(';')[5].trim());
											Ext.getCmp('ct-fnacimiento').setValue(result.responseText.split(';')[6].trim());
											Ext.getCmp('ct-lnacimiento').setValue(result.responseText.split(';')[7].trim());
											Ext.getCmp('ct-fijo').setValue(result.responseText.split(';')[8].trim());
											Ext.getCmp('ct-movil').setValue(result.responseText.split(';')[9].trim());
											Ext.getCmp('ct-direc').setValue(result.responseText.split(';')[10].trim());
											Ext.getCmp('ct-email').setValue(result.responseText.split(';')[11].trim());
											Ext.getCmp('ct-ingreso').setValue(result.responseText.split(';')[12].trim());
											
											maskView.hide();
											Ext.getCmp('form-cont').enable();
											Ext.getCmp('btn-acep').enable();
										},
										failure: function ( result, request) { 
											Ext.MessageBox.alert('Failed', result.responseText); 
											maskView.hide();
										} 
									});	
								}
							});							
							
							var setContratista = new Ext.form.FormPanel({
								id : 'form-cont',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'center',
								disabled  :true,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Datos del Contratista ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposContratista]
								}]
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'form-busca',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'west',
								width : 275,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								}]
							});
								
							new Ext.Window({
								id : 'win-editCont',
								title : 'Editar Contratista',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 675,
								height : 500,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[{
									layout:'border',
									items:[busContratista,setContratista]
								}],
								buttons: [{
									id:'btn-acep',
									text:'Aceptar',
									align:'center',
									disabled:true,
									handler: function (){
										edit_cont();
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-editCont').close();
									}
								}]
							}).show();
							
						}
					},'-',{
						text: 'Eliminar', 
						iconCls: 'icon-user-delete',
                		scale: 'medium', 
						handler: function(){
							
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							storeContra.on("load",function(Store,records,options,groups){
								//panelView.doLayout();
								Ext.getCmp('ct-nombre').reset();
								Ext.getCmp('ct-apellido').reset();
								Ext.getCmp('ct-cedula').reset();
								Ext.getCmp('ct-sexo').reset();
								Ext.getCmp('ct-civil').reset();
								Ext.getCmp('ct-fnacimiento').reset();
								Ext.getCmp('ct-lnacimiento').reset();
								Ext.getCmp('ct-fijo').reset();
								Ext.getCmp('ct-movil').reset();
								Ext.getCmp('ct-direc').reset();
								Ext.getCmp('ct-email').reset();
								Ext.getCmp('ct-ingreso').reset();
								Ext.getCmp('form-cont').disable();
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect
									
									var maskView = new Ext.LoadMask(Ext.getCmp('form-cont').getEl());
									maskView.show();	
									
									Ext.Ajax.request({
										url : 'php/contratista/getCont.php' , 
										params : {id:record.data.id},
										method: 'POST',
										success: function ( result, request ) { 
											Ext.getCmp('ct-id').setValue(result.responseText.split(';')[0].trim());
											Ext.getCmp('ct-nombre').setValue(result.responseText.split(';')[1].trim());
											Ext.getCmp('ct-apellido').setValue(result.responseText.split(';')[2].trim());
											Ext.getCmp('ct-cedula').setValue(result.responseText.split(';')[3].trim());
											Ext.getCmp('ct-sexo').setValue(result.responseText.split(';')[4].trim());
											Ext.getCmp('ct-civil').setValue(result.responseText.split(';')[5].trim());
											Ext.getCmp('ct-fnacimiento').setValue(result.responseText.split(';')[6].trim());
											Ext.getCmp('ct-lnacimiento').setValue(result.responseText.split(';')[7].trim());
											Ext.getCmp('ct-fijo').setValue(result.responseText.split(';')[8].trim());
											Ext.getCmp('ct-movil').setValue(result.responseText.split(';')[9].trim());
											Ext.getCmp('ct-direc').setValue(result.responseText.split(';')[10].trim());
											Ext.getCmp('ct-email').setValue(result.responseText.split(';')[11].trim());
											Ext.getCmp('ct-ingreso').setValue(result.responseText.split(';')[12].trim());
											
											maskView.hide();
											//Ext.getCmp('form-cont').enable();
											Ext.getCmp('btn-acep').enable();
										},
										failure: function ( result, request) { 
											Ext.MessageBox.alert('Failed', result.responseText); 
											maskView.hide();
										} 
									});	
								}
							});
							
							var setContratista = new Ext.form.FormPanel({
								id : 'form-cont',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'center',
								disabled: true,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Datos del Contratista ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposContratista]
								}]
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'form-busca',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'west',
								width : 275,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								}]
							});
								
							new Ext.Window({
								id : 'win-deleteCont',
								title : 'Eliminar Contratista',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 675,
								height : 500,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[{
									layout:'border',
									items:[busContratista,setContratista]
								}],
								buttons: [{
									id:'btn-acep',
									text:'Aceptar',
									align:'center',
									disabled:true,
									handler: function (){
										delete_cont();
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-deleteCont').close();
									}
								}]
							}).show();
						}
					},'->',{
						text: 'Reporte - Contratista', 
						iconCls: 'icon-report',
                		scale: 'medium', 
						handler: function(){openwin('php/contratista/reportCont.php');}
					}],
					html: '<div id="contratista-div"> <div id="fondoestirado"> <img src="images/background.jpg" alt="" /> </div>  </div> '	
				};	  
	
	var moduleRelaciones = {
					title:'Gesti&oacute;n de Relaciones',					
					cls:'inner-tab-custom', // custom styles in layout-browser.css
					//layout   : 'border',
					hideMode:Ext.isIE ? 'offsets' : 'display',
					tbar: [{
						text: 'Fabricaci&oacute;n', 
						iconCls: 'icon-add-relaciones_fab', 
                		scale: 'medium',
						handler: function(){
							
						/******** variables locales ********/
							var idCont = null;
							var nomCont = null;
							index = new Number();
						/***********************************/
						
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect
								
									idCont = record.data.id;
									nomCont = record.data.name+' '+record.data.apel;
									var maskView = new Ext.LoadMask(Ext.getCmp('getConRel').getEl());	
									
									var storeContra = new Ext.data.JsonStore({
										url : 'php/relaciones/getCont.php'
									});
									
									storeContra.on("load",function(Store,records,options,groups){
										var tplRelCont = new Ext.XTemplate(
											'<div id="reg-detalles">',
												'<p style=" padding:0   5px 0;"><b>Nombre: </b>{nombres}</p>',
												'<p style=" padding:5px 5px 0;"><b>C&eacutedula: </b>{cedula}</p>',
												'<p style=" padding:5px 5px 0;"><b>Telf. m&oacutevil: </b>{tlf_movil}</p>',
												'<p style=" padding:5px 5px 0;"><b>Email: </b>{email}</p>',
												'<p style=" padding:5px 5px 0;"></p>',
											'</div>'
										);			
										tplRelCont.overwrite(Ext.get('cont-datos'), storeContra.data.items[0].data);
									});
									
									nextBtn.enable();
									
									maskView.show();		
									storeContra.load({
										params:{id:record.data.id},
										callback: function(){maskView.hide();}
									});
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConRel',
								bodyStyle :'padding: 10px',
								border : false,
							    //region : 'west',
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista. "+
										  "Y haga clic en siguiente.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								},{
									html : "<br><br><br>", border: false
								},{
									xtype: 'fieldset',
									title: 'Datos del Contratista',
									height: 150,
									html: '<div id="cont-datos" style="font-size:14px;"></div>'
								}]
							});
							
							var camposCliente = [
							{
								id:"re-fecha",
								xtype:'datefield',
								fieldLabel:'Fecha',
								name:'dat-fecha',  
								editable:false,  
								emptyText:'Inserte fecha...',
								format:'d/m/Y',
								//allowBlank:true,
								minValue:new Date(),
								value:new Date(),
								maxValue:new Date() // <-- max date,
							},{
								id:"re-orden",
								xtype : 'textfield',
								fieldLabel:'Num. Orden', // creamos un campo
								name:'txt-orden', // a partir de una
								emptyText:'Numero de orden',
								//allowBlank:true,
								vtype: 'numbers'
							},{
								id:'re-cliente',
								xtype : 'textfield',
								fieldLabel:'Cliente',
								name:'txt-cliente',
								emptyText:'Nombre del Cliente...'
							},{
								id:"re-direc",
								xtype:'textarea',
								fieldLabel:'Direcci&oacuten', // creamos un campo
								name:'txt-direc'/*, // a partir de una
								//emptyText:'Direccion',
								//allowBlank:true*/
							},{
								id:"re-material",
								xtype : 'textfield',
								fieldLabel:'Material', // creamos un campo
								name:'txt-material', // a partir de una
								emptyText:'material...'
							}
							];
							
							
							var getCliente = new Ext.form.FormPanel({
								id: 'formCliete',
								//region: 'east',	
								margins:'35 5 5 5',
								cmargins:'35 5 5 5',
								bodyStyle :'padding: 10px',
								border: false,
								items: [{
									html: "<h1>Datos del Cliente y N&uacutemero de Orden</h1> <br> <p>A continuaci&oacuten por favor coloque el n&uacutemero de orden y los datos del cliente. "+
										  "Y haga clic en siguiente.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%',
										allowBlank: false
									},
									items : [camposCliente]
								}]
							});							
							
							var storeFab = new Ext.data.JsonStore({
								url: 'php/relaciones/fabricacion/getFabricacion.php',								
								root: 'data',
								fields: [{name:'fabrica'},
										 {name:'cantidad',type:'float'},
										 {name:'costo',type:'float'},
										 {name:'subtotal',type:'float'},
										 {name:'id'}]
							});		
							
							function changeSub(val, x, store){	 
								store.data.subtotal = roundNumber(val * store.data.costo, 3); 
								tplRelSub.overwrite(Ext.get('sub-total'), { subTotal: formatNumber(roundNumber(storeFab.sum('subtotal'),3),' BsF.') });
								Ext.getCmp('panel-sub').doLayout();
								tplRelTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(storeFab.sum('subtotal')+servEspecial.getValue(),3),' BsF.') });
								Ext.getCmp('panel-total').doLayout();	
							  	return val;
							};
							
							var numberField = new Ext.form.NumberField({
								decimalPrecision: 3,
								selectOnFocus: true,
								minValue: 0,
								allowBlank: false
							});
							
							var gridFab = new Ext.grid.EditorGridPanel({ 
								id: 'gridFab', 
								store: storeFab,
								columns: [
									{header:'Fabricaci&oacute;n', dataIndex:'fabrica',sortable: false, width:150, menuDisabled: true},
									{header:'Cantidad', dataIndex:'cantidad',sortable: false, align: 'right', editor: numberField, menuDisabled: true, renderer: changeSub},
									{header:'Costo BsF.', dataIndex:'costo',sortable: false, align: 'right', menuDisabled: true},
									{header:'Sub-total BsF.', dataIndex:'subtotal',sortable: false, align: 'right', menuDisabled: true/*, editor: numberField*/}
								],   
								viewConfig: {
									forceFit : true//, autoFill : true
								},
								stripeRows: true,
								region: 'center',
								border : false
							});
							
							var tplRelSub = new Ext.XTemplate(
								'<div id="sub-detalles">',/*text-align:right;*/
									'<p style=" padding:0   5px 0; "><b>Sub-Total: </b>{subTotal}</p>',
									'<p style=" padding:5px 5px 0;"></p>',
								'</div>'
							);
							
							var calRela = {
								layout: 'border',
								border: false,
								items: [gridFab,
								{
									id: 'panel-sub',
									height: 50,
									region: 'south',
									border: false,
									html: '<div id="sub-total" style="font-size:14px;"></div>'
								}]
							};
							
							var servEspecial = new Ext.form.NumberField({
								id:"re-servEsp",
								fieldLabel:'Num. Orden', // creamos un campo
								name:'txt-orden', // a partir de una
								emptyText:'Monto',
								fieldLabel:'Otros Servicios',
								decimalPrecision: 3,
								selectOnFocus: true,
								width: 200,
								minValue: 0,
								value: 0,
								enableKeyEvents: true,
								allowBlank: false
							});
							
							servEspecial.on("change",function(/*field, newValue, oldValue*/){
								tplRelTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(storeFab.sum('subtotal')+servEspecial.getValue(),3),' BsF.') });
								Ext.getCmp('panel-total').doLayout();	
							});
							
							var tplRelTotal = new Ext.XTemplate(
								'<div id="total-detalles">',/*text-align:right;*/
									'<p style=" padding:5px 5px 0;"></p>',
									'<p style=" padding:0; "><b>Total: </b>{Total}</p>',
								'</div>'
							);
							
							var totalRela = new Ext.Panel({
								id: 'total-panel',
								//region: 'east',	
								margins:'35 5 5 5',
								cmargins:'35 5 5 5',
								bodyStyle :'padding: 10px',
								border: false,
								items: [{
									html: "<h1>Otros Servicios</h1> <br> <p>A continuaci&oacuten por favor coloque el monto de otros servicios. "+
										  "Y haga clic en finalizar.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Total ]',
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [servEspecial,{
										id: 'panel-total',
										height: 50,
										//region: 'south',
										border: false,
										html: '<div id="total" style="font-size:14px;">Prueba</div>'
									}]
								}]
							});
							
							var index = 0;
							
							formFab = new Ext.FormPanel({
								layout: 'card',
								border: false,
								activeItem  : 0,/*index,*/
								items       : [busContratista, getCliente, calRela, totalRela]
							});
							
							function next(){
								backBtn.show();
								if(index < formFab.items.length-1){
									index++;
									var cardlayout = formFab.getLayout();
									cardlayout.setActiveItem(index);
									
									if(index == formFab.items.length-1){ //si esta en el ultima carta
										nextBtn.hide();
										finishBtn.show();
									}
								}
							};
						
							function back(){
								if(index>0){
									index--;
									var cardlayout = formFab.getLayout();
									cardlayout.setActiveItem(index);
								}
								
								if(index == 0){    //si esta en la primera carta
									backBtn.hide();    
									finishBtn.hide();
									nextBtn.show();
								}else{
									finishBtn.hide();
									nextBtn.show();
								}
							};
						
							function finish(){
								//save changes in the grid
								if (!Ext.getCmp('getConRel').form.isValid()) {
									Ext.Msg.alert('Fabricaci&oacute;n','Debe seleccionar un contratista');
									index = 0+1;
									back();
									return;
								}
								if (!Ext.getCmp('formCliete').form.isValid()) {
									Ext.Msg.alert('Fabricaci&oacute;n','Debe especificar los datos del cliente y el n&uacutemero de orden');
									index = 1+1;
									back();
									return;
								}
								var modified = Ext.getCmp('gridFab').getStore().getModifiedRecords();//step 1
								if(Ext.isEmpty(modified)){
									Ext.Msg.alert('Fabricaci&oacute;n','Debe especificar por lo menos un item');
									index = 2+1;
									back();
									return;
								}
								
								var recordsToSend = [];								
								Ext.each(modified, function(record) { //step 2
									recordsToSend.push(Ext.apply(record.data));
								});
								recordsToSend = Ext.encode(recordsToSend);
								
								var url = Ext.urlEncode({
												nomCont:nomCont, 
												ordCli:Ext.getCmp('re-orden').getValue(), 
												nomCli:Ext.getCmp('re-cliente').getValue(),
												dirCli:Ext.getCmp('re-direc').getValue(),
												matCli:Ext.getCmp('re-material').getValue(),
												subtotal:formatNumber(roundNumber(storeFab.sum('subtotal'),3),' BsF.'),
												serEsp:formatNumber(roundNumber(Ext.getCmp('re-servEsp').getValue(),3),' BsF.'),
												total:formatNumber(roundNumber(storeFab.sum('subtotal')+servEspecial.getValue(),3),' BsF.'),
												records:recordsToSend
								});							
								
								Ext.Ajax.request({
										url : 'php/relaciones/fabricacion/saveRelFab.php' , 
										params : {
											con_id:idCont,
											num_orden:Ext.getCmp('re-orden').getValue(),
											cli_nombre:Ext.getCmp('re-cliente').getValue(),
											cli_dir:Ext.getCmp('re-direc').getValue(),
											cli_mat:Ext.getCmp('re-material').getValue(),
											gastos_esp:Ext.getCmp('re-servEsp').getValue(),
											records: recordsToSend
										},
										method: 'POST',
										success: function ( result, request ) { 
											Ext.MessageBox.alert('', result.responseText); 
											Ext.getCmp('win-relaFab').close();
											openwin('php/relaciones/fabricacion/Relacion_Fab.php?'+url);	
										},
										failure: function ( result, request) { 
											Ext.MessageBox.alert('Failed', result.responseText); 
										} 
									});	
							};
							
							backBtn = new Ext.Button({text: "Atras", handler: back, /*scope : this,*/ hidden:true});
							nextBtn = new Ext.Button({text: "Siguiente", handler: next, disabled: true /*scope : this*/});
							finishBtn = new Ext.Button({text: "Finalizar", handler: finish, /*scope:this,*/ hidden: true});
								
							new Ext.Window({
								id : 'win-relaFab',
								title : 'Relaci&oacute;n de Trabajo de Fabricaci&oacute;n',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width       : 450,
								height      : 550,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[formFab],			
								fbar: [backBtn,nextBtn,finishBtn]
								/*buttons: [{
									text:'Aceptar',
									align:'center',7
									handler: function (){
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-editCont').close();
									}
								}]*/
							}).show();
							
							storeFab.load();
						}
					},'-',{
						text: 'Instalaci&oacute;n', 
						iconCls: 'icon-add-relaciones_ins', 
                		scale: 'medium',
						handler: function(){
							
						/******** variables locales ********/
							var idCont = null;
							var nomCont = null;
							index = new Number();
						/***********************************/
						
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect
								
									idCont = record.data.id;
									nomCont = record.data.name+' '+record.data.apel;
									var maskView = new Ext.LoadMask(Ext.getCmp('getConRel').getEl());	
									
									var storeContra = new Ext.data.JsonStore({
										url : 'php/relaciones/getCont.php'
									});
									
									storeContra.on("load",function(Store,records,options,groups){
										var tplRelCont = new Ext.XTemplate(
											'<div id="reg-detalles">',
												'<p style=" padding:0   5px 0;"><b>Nombre: </b>{nombres}</p>',
												'<p style=" padding:5px 5px 0;"><b>C&eacutedula: </b>{cedula}</p>',
												'<p style=" padding:5px 5px 0;"><b>Telf. m&oacutevil: </b>{tlf_movil}</p>',
												'<p style=" padding:5px 5px 0;"><b>Email: </b>{email}</p>',
												'<p style=" padding:5px 5px 0;"></p>',
											'</div>'
										);			
										tplRelCont.overwrite(Ext.get('cont-datos'), storeContra.data.items[0].data);
									});
									
									maskView.show();		
									storeContra.load({
										params:{id:record.data.id},
										callback: function(){maskView.hide();}
									});
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConRel',
								bodyStyle :'padding: 10px',
								border : false,
							    //region : 'west',
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista. "+
										  "Y haga clic en siguiente.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								},{
									html : "<br><br><br>", border: false
								},{
									xtype: 'fieldset',
									title: 'Datos del Contratista',
									height: 150,
									html: '<div id="cont-datos" style="font-size:14px;"></div>'
								}]
							});
							
							var camposCliente = [
							{
								id:"re-fecha",
								xtype:'datefield',
								fieldLabel:'Fecha',
								name:'dat-fecha',  
								editable:false,  
								emptyText:'Inserte fecha...',
								format:'d/m/Y',
								//allowBlank:true,
								minValue:new Date(),
								value:new Date(),
								maxValue:new Date() // <-- max date,
							},{
								id:"re-orden",
								xtype : 'textfield',
								fieldLabel:'Num. Orden', // creamos un campo
								name:'txt-orden', // a partir de una
								emptyText:'Numero de orden',
								//allowBlank:true,
								vtype: 'numbers'
							},{
								id:'re-cliente',
								xtype : 'textfield',
								fieldLabel:'Cliente',
								name:'txt-cliente',
								emptyText:'Nombre del Cliente...'
							},{
								id:"re-direc",
								xtype:'textarea',
								fieldLabel:'Direcci&oacuten', // creamos un campo
								name:'txt-direc' // a partir de una
								//emptyText:'Direccion',
								//allowBlank:true
							},{
								id:"re-material",
								xtype : 'textfield',
								fieldLabel:'Material', // creamos un campo
								name:'txt-material', // a partir de una
								emptyText:'material...'
							}
							];
							
							
							var getCliente = new Ext.form.FormPanel({
								id: 'formCliete',
								//region: 'east',	
								margins:'35 5 5 5',
								cmargins:'35 5 5 5',
								bodyStyle :'padding: 10px',
								border: false,
								items: [{
									html: "<h1>Datos del Cliente y N&uacutemero de Orden</h1> <br> <p>A continuaci&oacuten por favor coloque el n&uacutemero de orden y los datos del cliente. "+
										  "Y haga clic en siguiente.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%',
										allowBlank: false
									},
									items : [camposCliente]
								}]
							});
							
							
							var storeIns = new Ext.data.JsonStore({
								url: 'php/relaciones/instalacion/getInstalacion.php',								
								root: 'data',
								fields: [{name:'instala'},
										 {name:'cantidad',type:'float'},
										 {name:'costo',type:'float'},
										 {name:'subtotal',type:'float'},
										 {name:'id'}]
							});		
							
							function changeSub(val, x, store){
								store.data.subtotal = roundNumber(val * store.data.costo, 3);	
								tplRelSub.overwrite(Ext.get('sub-total'), { subTotal: formatNumber(roundNumber(storeIns.sum('subtotal'),3),' BsF.') });
								Ext.getCmp('panel-sub').doLayout();
								tplRelTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(storeIns.sum('subtotal')+servEspecial.getValue(),3),' BsF.') });
								Ext.getCmp('panel-total').doLayout();	
							  	return val;
							};
							
							var numberField = new Ext.form.NumberField({
								decimalPrecision: 3,
								selectOnFocus: true,
								minValue: 0,
								allowBlank: false
							});
							
							var gridIns = new Ext.grid.EditorGridPanel({ 
								id: 'gridIns', 
								store: storeIns,
								columns: [
									{header:'Instalaci&oacute;n', dataIndex:'instala',sortable: false, width:150, menuDisabled: true},
									{header:'Cantidad', dataIndex:'cantidad',sortable: false, align: 'right', editor: numberField, menuDisabled: true, renderer: changeSub},
									{header:'Costo BsF.', dataIndex:'costo',sortable: false, align: 'right', menuDisabled: true},
									{header:'Sub-total BsF.', dataIndex:'subtotal',sortable: false, align: 'right', menuDisabled: true/*, editor: numberField*/}
								],   
								viewConfig: {
									forceFit : true//, autoFill : true
								},
								stripeRows: true,
								region: 'center',
								border : false
							});
							
							var tplRelSub = new Ext.XTemplate(
								'<div id="sub-detalles">',/*text-align:right;*/
									'<p style=" padding:0   5px 0; "><b>Sub-Total: </b>{subTotal}</p>',
									'<p style=" padding:5px 5px 0;"></p>',
								'</div>'
							);
							
							var calRela = {
								layout: 'border',
								border: false,
								items: [gridIns,
								{
									id: 'panel-sub',
									height: 50,
									region: 'south',
									border: false,
									html: '<div id="sub-total" style="font-size:14px;"></div>'
								}]
							};
							
							var servEspecial = new Ext.form.NumberField({
								id:"re-servEsp",
								fieldLabel:'Num. Orden', // creamos un campo
								name:'txt-orden', // a partir de una
								emptyText:'Monto',
								fieldLabel:'Otros Servicios',
								decimalPrecision: 3,
								selectOnFocus: true,
								width: 200,
								minValue: 0,
								value: 0,
								enableKeyEvents: true,
								allowBlank: false
							});
							
							servEspecial.on("change",function(/*field, newValue, oldValue*/){
								tplRelTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(storeIns.sum('subtotal')+servEspecial.getValue(),3),' BsF.') });
								Ext.getCmp('panel-total').doLayout();
							});
							
							var tplRelTotal = new Ext.XTemplate(
								'<div id="total-detalles">',/*text-align:right;*/
									'<p style=" padding:5px 5px 0;"></p>',
									'<p style=" padding:0; "><b>Total: </b>{Total}</p>',
								'</div>'
							);
							
							var totalRela = new Ext.Panel({
								id: 'total-panel',
								//region: 'east',	
								margins:'35 5 5 5',
								cmargins:'35 5 5 5',
								bodyStyle :'padding: 10px',
								border: false,
								items: [{
									html: "<h1>Otros Servicios</h1> <br> <p>A continuaci&oacuten por favor coloque el monto de otros servicios. "+
										  "Y haga clic en finalizar.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Total ]',
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [servEspecial,{
										id: 'panel-total',
										height: 50,
										//region: 'south',
										border: false,
										html: '<div id="total" style="font-size:14px;">Prueba</div>'
									}]
								}]
							});
							
							index = 0;
							
							formFab = new Ext.FormPanel({
								layout      : "card",
								border      : false,
								activeItem  : index,
								items       : [busContratista, getCliente, calRela, totalRela]
							});
							
							function next(){
								backBtn.show();
								if(index < formFab.items.length-1){
									index++;
									var cardlayout = formFab.getLayout();
									cardlayout.setActiveItem(index);
									
									if(index == formFab.items.length-1){ //si esta en el ultima carta
										nextBtn.hide();
										finishBtn.show();
									}
								}
							};
						
							function back(){
								if(index>0){
									index--;
									var cardlayout = formFab.getLayout();
									cardlayout.setActiveItem(index);
								}
								
								if(index == 0){    //si esta en la primera carta
									backBtn.hide();    
									finishBtn.hide();
									nextBtn.show();
								}else{
									finishBtn.hide();
									nextBtn.show();
								}
							};
						
							function finish(){
								//save changes in the grid
								if (!Ext.getCmp('getConRel').form.isValid()) {
									Ext.Msg.alert('Instalaci&oacute;n','Debe seleccionar un contratista');
									index = 0+1;
									back();
									return;
								}
								if (!Ext.getCmp('formCliete').form.isValid()) {
									Ext.Msg.alert('Instalaci&oacute;n','Debe especificar los datos del cliente y el n&uacutemero de orden');
									index = 1+1;
									back();
									return;
								}
								var modified = Ext.getCmp('gridIns').getStore().getModifiedRecords();//step 1
								if(Ext.isEmpty(modified)){
									Ext.Msg.alert('Instalaci&oacute;n','Debe especificar por lo menos un item');
									index = 2+1;
									back();
									return;
								}
								
								var recordsToSend = [];								
								Ext.each(modified, function(record) { //step 2
									recordsToSend.push(Ext.apply(record.data));
								});
								
								recordsToSend = Ext.encode(recordsToSend);
								
								var url = Ext.urlEncode({
												nomCont:nomCont, 
												ordCli:Ext.getCmp('re-orden').getValue(), 
												nomCli:Ext.getCmp('re-cliente').getValue(),
												dirCli:Ext.getCmp('re-direc').getValue(),
												matCli:Ext.getCmp('re-material').getValue(),
												subtotal:formatNumber(roundNumber(storeIns.sum('subtotal'),3),' BsF.'),
												serEsp:formatNumber(roundNumber(Ext.getCmp('re-servEsp').getValue(),3),' BsF.'),
												total:formatNumber(roundNumber(storeIns.sum('subtotal')+servEspecial.getValue(),3),' BsF.'),
												records:recordsToSend
								});							
								
								Ext.Ajax.request({
										url : 'php/relaciones/instalacion/saveRelIns.php' , 
										params : {
											con_id:idCont,
											num_orden:Ext.getCmp('re-orden').getValue(),
											cli_nombre:Ext.getCmp('re-cliente').getValue(),
											cli_dir:Ext.getCmp('re-direc').getValue(),
											cli_mat:Ext.getCmp('re-material').getValue(),
											gastos_esp:Ext.getCmp('re-servEsp').getValue(),
											records: recordsToSend
										},
										method: 'POST',
										success: function ( result, request ) { 
											Ext.MessageBox.alert('', result.responseText); 
											Ext.getCmp('win-relaIns').close();
											openwin('php/relaciones/instalacion/Relacion_Ins.php?'+url);	
										},
										failure: function ( result, request) { 
											Ext.MessageBox.alert('Failed', result.responseText); 
										} 
									});	
							};
							
							backBtn = new Ext.Button({text: "Atras", handler: back, /*scope : this,*/ hidden:true});
							nextBtn = new Ext.Button({text: "Siguiente", handler: next /*scope : this*/});
							finishBtn = new Ext.Button({text: "Finalizar", handler: finish, /*scope:this,*/ hidden: true});
								
							new Ext.Window({
								id : 'win-relaIns',
								title : 'Relaci&oacute;n de Trabajo de Instalaci&oacute;n',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width       : 450,
								height      : 550,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[formFab],			
								fbar: [backBtn,nextBtn,finishBtn]
								/*buttons: [{
									text:'Aceptar',
									align:'center',7
									handler: function (){
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-editCont').close();
									}
								}]*/
							}).show();
							
							storeIns.load();
						}
					},'-',{
						text: 'N&uacute;mero de Orden', 
						iconCls: 'icon-add-numOrden', 
                		scale: 'medium',
						handler: function(){
							openwin('php/relaciones/getNumOrden.php');	
						}
					},'->',{
						text: 'Reporte - Relaci&oacute;n', 
						iconCls: 'icon-report',
                		scale: 'medium', 
						handler: function(){
							
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								id:'searchField',
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect	
									var url = Ext.urlEncode({
										idCont:record.data.id,
										nomCont:record.data.name+' '+record.data.apel
									});
									openwin('php/relaciones/reportRelacion.php?'+url);
									Ext.getCmp('searchField').collapse();
									Ext.getCmp('win-reportRela').close();
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConRel',
								bodyStyle :'padding: 10px',
								border : true,
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista.<br><br> ", 
									border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								}]
							});	
							
							new Ext.Window({
								id : 'win-reportRela',
								title : 'Reporte de Relaciones por Contratista',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 350,
								height : 250,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								items:[busContratista]
							}).show();
						}
					}],
					html: '<div id="relacion-div"> <div id="fondoestirado"> <img src="images/background.jpg" alt="" /> </div>  </div> '					
				};
				
	
	function save_cxc(idCont,url){
		if (Ext.getCmp('form-cxc').form.isValid()) {
			//Ext.getCmp('form-cont').setValue();
			Ext.getCmp('form-cxc').form.submit({
				waitTitle : "Validando",			
				url       : 'php/cxc/saveCxc.php',
				params: {idCont:idCont},
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
				},
				success: function(sender,action) {
					Ext.Msg.alert('',action.result.msg.split('-')[0].trim());
					Ext.getCmp('win-cxc').close();	
					/*console.debug('php/cxc/reciboDeCobro.php?'+url+'&idCxc='+action.result.msg.split('-')[1].trim());*/
					openwin('php/cxc/reciboDeCobro.php?'+url+'&idCxc='+action.result.msg.split('-')[1].trim());
				}
			});
		}else{
			/*console.debug('Formulario invalido .!.');*/
		}
	};
				
	var moduleCxC = {
					id:'moduleCxC',
					title:'Cuentas por Cobrar ',					
					cls:'inner-tab-custom', // custom styles in layout-browser.css
					//layout   : 'border',
					hideMode:Ext.isIE ? 'offsets' : 'display',
					tbar: [{
						text: 'Agregar', 
						iconCls: 'icon-menu-cobros',
                		scale: 'medium', 
						handler: function(){
							
						/******** variables locales ********/
							var idCont = null;
							var ciCont = null;
							var nomCont = null;
							index = new Number();
						/***********************************/
							
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								id:'searchField',
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect
								
									idCont = record.data.id;
									ciCont = record.data.cedu;
									nomCont = record.data.name+' '+record.data.apel;
									var maskView = new Ext.LoadMask(Ext.getCmp('getConRel').getEl());	
									
									Ext.getCmp('searchField').collapse();
									
									var storeContra = new Ext.data.JsonStore({
										url : 'php/relaciones/getCont.php'
									});
									
									storeContra.on("load",function(Store,records,options,groups){
										var tplRelCont = new Ext.XTemplate(
											'<div id="reg-detalles">',
												'<p style=" padding:0   5px 0;"><b>Nombre: </b>{nombres}</p>',
												'<p style=" padding:5px 5px 0;"><b>C&eacutedula: </b>{cedula}</p>',
												'<p style=" padding:5px 5px 0;"><b>Telf. m&oacutevil: </b>{tlf_movil}</p>',
												'<p style=" padding:5px 5px 0;"><b>Email: </b>{email}</p>',
												'<p style=" padding:5px 5px 0;"></p>',
											'</div>'
										);			
										tplRelCont.overwrite(Ext.get('cont-datos'), storeContra.data.items[0].data);
										Ext.getCmp('btn-acep').enable();
									});
									
									maskView.show();		
									storeContra.load({
										params:{id:record.data.id},
										callback: function(){
											maskView.hide();
											Ext.getCmp('form-cxc').enable();
										}
									});
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConRel',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'west',
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista. "+
										  "Y haga clic en siguiente.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								},{
									html : "<br><br><br>", border: false
								},{
									xtype: 'fieldset',
									title: 'Datos del Contratista',
									height: 150,
									html: '<div id="cont-datos" style="font-size:14px;"></div>'
								}]
							});		
							
							var camposContratista=[
								{
									id:"co-fecha",
									xtype:'datefield',
									fieldLabel:'Fecha',
									name:'dat-fecha',  
									editable:false,  
									format:'d/m/Y',
									//minValue:new Date(),
									value:new Date(),
									maxValue:new Date() // <-- max date,
								},{
									id:"co-tipoCxC",
									xtype:'combo',
									fieldLabel:'Tipo de CxC',  
									name:'cmb-tipo',  
									forceSelection:true,
									store: ['Vale','Prestamo','Material','Adelanto'],
									emptyText:'Seleccione un Tipo...',  
									triggerAction:'all',   
									editable:false
								},{
									id:"co-monto",
									xtype:'numberfield',
									fieldLabel:'Monto BsF.', // creamos un campo
									name:'num-monto', // a partir de una
									emptyText:'Monto',
									decimalPrecision: 3,
									selectOnFocus: true,
									minValue: 5,
									value: 0,
									enableKeyEvents: true,
									allowBlank: false
								}
							];
							
							var setContratista = new Ext.form.FormPanel({
								id : 'form-cxc',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'center',
								disabled  :true,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Detalles del Cobro ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposContratista]
								}]
							});
								
							new Ext.Window({
								id : 'win-cxc',
								title : 'Agregar Cuenta por Cobrar [CxC]',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 675,
								height : 500,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[{
									layout:'border',
									items:[busContratista,setContratista]
								}],
								buttons: [{
									id:'btn-acep',
									text:'Aceptar',
									align:'center',
									disabled:true,
									handler: function (){
										var url = Ext.urlEncode({
											ciCont:ciCont,
											nomCont:nomCont,
											tipoCxc:Ext.getCmp('co-tipoCxC').getValue(),
											montoCxc:formatNumber(Ext.getCmp('co-monto').getValue(),' BsF.'),
											numLetrasCxc:covertirNumLetras(Ext.getCmp('co-monto').getValue()+'')
										});
										save_cxc(idCont,url);
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-cxc').close();
									}
								}]
							}).show();
							
						}
					},'->',{
						text: 'Reporte - Cuentas por Cobrar', 
						iconCls: 'icon-report',
                		scale: 'medium', 
						handler: function(){
							
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								id:'searchField',
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect	
									var url = Ext.urlEncode({
										idCont:record.data.id,
										nomCont:record.data.name+' '+record.data.apel
									});
									openwin('php/cxc/reportCxc.php?'+url);
									Ext.getCmp('searchField').collapse();
									Ext.getCmp('win-reportCxc').close();
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConRel',
								bodyStyle :'padding: 10px',
								border : true,
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista.<br><br> ", 
									border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								}]
							});	
							
							new Ext.Window({
								id : 'win-reportCxc',
								title : 'Reporte de Cuentas por Cobrar por Contratista',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 350,
								height : 250,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								items:[busContratista]
							}).show();
						}
					}],
					html: '<div id="cxc-div"> <div id="fondoestirado"> <img src="images/background.jpg" alt="" /> </div>  </div> '	
				};
				
	var moduleCxP = {
					title:'Emisi&oacute;n de Pagos',					
					cls:'inner-tab-custom', // custom styles in layout-browser.css
					//layout   : 'border',
					hideMode:Ext.isIE ? 'offsets' : 'display',
					tbar: [{
						text: 'Agregar', 
						iconCls: 'icon-menu-pagos', 
                		scale: 'medium',
						handler: function(){
							
						/******** variables locales ********/
							var idCont = null;
							var ciCont = null;
							var nomCont = null;
							index = new Number();
							totalRel = new Number(0);
							totalCxc = new Number(0);
						/***********************************/
						
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								store : storeContra,
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect
								
									idCont = record.data.id;
									ciCont = record.data.cedu;
									nomCont = record.data.name+' '+record.data.apel;
									
									storeRel.load({
										params:{query:record.data.id},
										callback: function(){}
									});
									
									storeCxc.load({
										params:{query:record.data.id},
										callback: function(){}
									});
									
									nextBtn.enable();
									
									var maskView = new Ext.LoadMask(Ext.getCmp('getConCxP').getEl());	
									
									var storeContra = new Ext.data.JsonStore({
										url : 'php/relaciones/getCont.php'
									});
									
									storeContra.on("load",function(Store,records,options,groups){
										var tplRelCont = new Ext.XTemplate(
											'<div id="reg-detalles">',
												'<p style=" padding:0   5px 0;"><b>Nombre: </b>{nombres}</p>',
												'<p style=" padding:5px 5px 0;"><b>C&eacutedula: </b>{cedula}</p>',
												'<p style=" padding:5px 5px 0;"><b>Telf. m&oacutevil: </b>{tlf_movil}</p>',
												'<p style=" padding:5px 5px 0;"><b>Email: </b>{email}</p>',
												'<p style=" padding:5px 5px 0;"></p>',
											'</div>'
										);			
										tplRelCont.overwrite(Ext.get('cont-datos'), storeContra.data.items[0].data);
									});
									
									maskView.show();		
									storeContra.load({
										params:{id:record.data.id},
										callback: function(){maskView.hide();}
									});
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConCxP',
								bodyStyle :'padding: 10px',
								border : false,
							    //region : 'west',
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista. "+
										  "Y haga clic en siguiente.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								},{
									html : "<br><br><br>", border: false
								},{
									xtype: 'fieldset',
									title: 'Datos del Contratista',
									height: 150,
									html: '<div id="cont-datos" style="font-size:14px;"></div>'
								}]
							});
							
							
							var storeRel = new Ext.data.JsonStore({
								url: 'php/cxp/getRelaciones.php'
							});							
							
							var checkBoxSelMod = new Ext.grid.CheckboxSelectionModel( {
								listeners:{
									rowselect : function( selectionModel, rowIndex, record){
										var selectedRows = selectionModel.getSelections();
										if (selectedRows.length > 0) nextBtn.enable();
										sumMonto = new Number(0);
										Ext.each(selectedRows, function(record) { //step 2
											sumMonto = sumMonto + record.data.monto;
											/*//console.debug(record.data.id);*/
										});
										totalRel = sumMonto;	
										tplRelCont.overwrite(Ext.get('sub-total'), { subTotal: formatNumber(roundNumber(totalRel,3),' BsF.') });
										Ext.getCmp('panel-sub').doLayout();									
										tplCxpTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'), Rela: formatNumber(roundNumber(totalRel,3),' BsF.'), Cxc: formatNumber(roundNumber(totalCxc,3),' BsF.')});
						
										Ext.getCmp('panel-total').doLayout();
									},
									rowdeselect : function( selectionModel, rowIndex, record){
										var selectedRows = selectionModel.getSelections();
										if (selectedRows.length == 0) nextBtn.disable();
										sumMonto = new Number(0);
										Ext.each(selectedRows, function(record) { //step 2
											sumMonto = sumMonto + record.data.monto;
											/*//console.debug(record.data.id);*/
										});
										totalRel = sumMonto;
										tplRelCont.overwrite(Ext.get('sub-total'), { subTotal: formatNumber(roundNumber(totalRel,3),' BsF.') });
										Ext.getCmp('panel-sub').doLayout();									
										tplCxpTotal.overwrite(Ext.get('total'), { Total:formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'), Rela: formatNumber(roundNumber(totalRel,3),' BsF.'), Cxc: formatNumber(roundNumber(totalCxc,3),' BsF.')});
										Ext.getCmp('panel-total').doLayout();
									}
								}
							});
							
							var gridRel = new Ext.grid.EditorGridPanel({ 
								id: 'gridRel', 
								selModel: checkBoxSelMod,
								store: storeRel,    
								bodyStyle:'padding: 10px', 
								columns: [
									checkBoxSelMod,
									{header:'Relaci&oacute;n', dataIndex:'tipo',sortable: false/*, width:150*/, menuDisabled: true},
									{header:'Fecha', dataIndex:'fecha',sortable: false, align: 'right', menuDisabled: true},
									{header:'Monto BsF.', dataIndex:'monto',sortable: false, align: 'right', menuDisabled: true}
								],   
								viewConfig: {
									forceFit : true//, autoFill : true
								},
								stripeRows: true,
								region: 'center',	
								border : false
							});
							
							var tplRelCont = new Ext.XTemplate(
								'<div id="sub-detalles">',/*text-align:right;*/
									'<p style=" padding:0   5px 0; "><b>Sub-Total: </b>{subTotal}</p>',
									'<p style=" padding:5px 5px 0;"></p>',
								'</div>'
							);
							
							checkDesc = new Ext.FormPanel({ 
								bodyStyle:'padding: 10px', 
								region: 'north',
								border: false,
								height: 40,
								items:[{  
										xtype: 'checkbox', //definimos el tipo de componente  
										fieldLabel: 'Deducciones',// le asignamos un label  
										name: 'chk-active', //y un "name" para que lo recojamos en el servidor...  
										id: 'id-active',// ...cuando el formulario sea enviado  
										listeners:{
											check : function( Checkbox , checked){
												if(!checked){
													checkBoxSelModCxc.clearSelections();																
													var selectedRows = checkBoxSelMod.getSelections();
													if (selectedRows.length > 0) nextBtn.enable();
												}
											}
										}
									}  
								]  
							}); 
							
							var getRela = {
								layout: 'border',
								border: false,
								items: [checkDesc,gridRel,
								{
									id: 'panel-sub',
									height: 50,      
									bodyStyle:'padding: 10px', 
									region: 'south',
									border: false,
									html: '<div id="sub-total" style="font-size:14px;"></div>'
								}]
							};
							
							var storeCxc = new Ext.data.JsonStore({
								url: 'php/cxp/getCxc.php'
							});						
							
							var checkBoxSelModCxc = new Ext.grid.CheckboxSelectionModel( {
								listeners:{
									rowselect : function( selectionModel, rowIndex, record){
										var selectedRows = selectionModel.getSelections();
										if (selectedRows.length > 0) nextBtn.enable();
										sumMonto = new Number(0);
										Ext.each(selectedRows, function(record) { //step 2
											sumMonto = sumMonto + record.data.monto;
											/*//console.debug(record.data.id);*/
										});
										totalCxc = sumMonto;
										tplCxcCont.overwrite(Ext.get('sub-totalCxc'), { subTotal: formatNumber(roundNumber(totalCxc,3),' BsF.') });
										Ext.getCmp('panel-subCxc').doLayout();																
										tplCxpTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'), Rela: formatNumber(roundNumber(totalRel,3),' BsF.'), Cxc: formatNumber(roundNumber(totalCxc,3),' BsF.')});
										Ext.getCmp('panel-total').doLayout();	
									},
									rowdeselect : function( selectionModel, rowIndex, record){
										var selectedRows = selectionModel.getSelections();
										if (selectedRows.length == 0) nextBtn.disable();
										sumMonto = new Number(0);
										Ext.each(selectedRows, function(record) { //step 2
											sumMonto = sumMonto + record.data.monto;
											/*//console.debug(record.data.id);*/
										});
										totalCxc = sumMonto;
										tplCxcCont.overwrite(Ext.get('sub-totalCxc'), { subTotal: formatNumber(roundNumber(totalCxc,3),' BsF.') });
										Ext.getCmp('panel-subCxc').doLayout();																	
										tplCxpTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'), Rela: formatNumber(roundNumber(totalRel,3),' BsF.'), Cxc: formatNumber(roundNumber(totalCxc,3),' BsF.')});
										Ext.getCmp('panel-total').doLayout();
									}
								}
							});
							
							var numberField = new Ext.form.NumberField({
								decimalPrecision: 3,
								selectOnFocus: true,
								minValue: 0,
								allowBlank: false
							});
							
							function changeMonto(val, x, store){
								sumMonto = new Number(0);
								var selectedRows = checkBoxSelModCxc.getSelections();
								if (val >= store.data.pendiente){
									store.data.monto = store.data.pendiente;
									Ext.each(selectedRows, function(record) { //step 2
										sumMonto = sumMonto + record.data.monto;
										/*//console.debug(record.data.id);*/
									});
									totalCxc = sumMonto;
									tplCxcCont.overwrite(Ext.get('sub-totalCxc'), { subTotal: formatNumber(roundNumber(totalCxc,3),' BsF.') });
									Ext.getCmp('panel-subCxc').doLayout();																	
									tplCxpTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'), Rela: formatNumber(roundNumber(totalRel,3),' BsF.'), Cxc: formatNumber(roundNumber(totalCxc,3),' BsF.')});
									Ext.getCmp('panel-total').doLayout();
									return store.data.pendiente;	
								}else{
									Ext.each(selectedRows, function(record) { //step 2
										sumMonto = sumMonto + record.data.monto;
										/*//console.debug(record.data.id);*/
									});
									totalCxc = sumMonto;
									tplCxcCont.overwrite(Ext.get('sub-totalCxc'), { subTotal: formatNumber(roundNumber(totalCxc,3),' BsF.') });
									Ext.getCmp('panel-subCxc').doLayout();																	
									tplCxpTotal.overwrite(Ext.get('total'), { Total: formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'), Rela: formatNumber(roundNumber(totalRel,3),' BsF.'), Cxc: formatNumber(roundNumber(totalCxc,3),' BsF.')});
									Ext.getCmp('panel-total').doLayout();
									return val;	
								}
							};
							
							var gridCxc = new Ext.grid.EditorGridPanel({ 
								id: 'gridCxc', 
								selModel: checkBoxSelModCxc,
								store: storeCxc,    
								bodyStyle:'padding: 10px', 
								columns: [
									checkBoxSelModCxc,
									{header:'Tipo', dataIndex:'tipo',sortable: false, menuDisabled: true},
									{header:'Fecha', dataIndex:'fecha',sortable: false, align: 'right', menuDisabled: true},
									{header:'Total BsF.', dataIndex:'total',sortable: false, align: 'right', menuDisabled: true},
									{header:'Pendiente BsF.', dataIndex:'pendiente',sortable: false, align: 'right', menuDisabled: true},
									{header:'Monto BsF.', dataIndex:'monto',sortable: false, align: 'right', menuDisabled: true, editor: numberField, renderer: changeMonto}
								],   
								viewConfig: {
									forceFit : true//, autoFill : true
								},
								stripeRows: true,
								region: 'center',
								border : false
							});
							
							var tplCxcCont = new Ext.XTemplate(
								'<div id="sub-detallesCxc">',
									'<p style=" padding:0   5px 0; "><b>Sub-Total: </b>{subTotal}</p>',
									'<p style=" padding:5px 5px 0;"></p>',
								'</div>'
							);
							
							var getCxc = {
								layout: 'border',
								border: false,
								items: [gridCxc,
								{
									id: 'panel-subCxc',
									height: 50,    
									bodyStyle:'padding: 10px', 
									region: 'south',
									border: false,
									html: '<div id="sub-totalCxc" style="font-size:14px;"></div>'
								}]
							};
							
							var tplCxpTotal = new Ext.XTemplate(
								'<div id="total-detalles">',/*text-align:right;*/
									'<p style=" padding:5px 5px 0;"></p>',
									'<p style=" padding:2; "><b>Total Relaci&oacute;n: </b>{Rela}</p>',
									'<p style=" padding:2; "><b>Total Deducciones: </b>{Cxc}</p>',
									'<p style=" padding:2; "><b>Total General: </b>{Total}</p>',
								'</div>'
							);
							
							var totalRela = new Ext.Panel({
								id: 'total-panel',
								//region: 'east',	
								margins:'35 5 5 5',
								cmargins:'35 5 5 5',
								bodyStyle :'padding: 10px',
								border: false,
								items: [{
									html: "<h1>N&uacutemero de Factura</h1> <br> <p>A continuaci&oacuten por favor coloque el N&uacutemero de factura. "+
										  "Y haga clic en Finalizar.</p><br><br>", border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Resumen ]',
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [{
										id:'ct-numFac',
										xtype : 'textfield',
										fieldLabel:'Num. Factura',
										name:'txt-numFac',
										allowBlank: false
									},{
										id:'ct-formaPago',
										xtype:'combo',
										fieldLabel:'Forma de Pago',  
										name:'cmb-formaPago',  
										forceSelection:true,
										store:['Efectivo','Cheque','Transferencia'],  
										emptyText:'Seleccione...',  
										triggerAction:'all',   
										editable:false,
										allowBlank: false
									},{
										id:'ct-banco',
										xtype:'combo',
										fieldLabel:'Banco',  
										name:'cmb-banco',  
										forceSelection:true,
										store:['Banesco','Bicentenario','Venezuela','Plaza'],  
										emptyText:'Seleccione...',  
										triggerAction:'all',
										disabled: true,										
										editable:false,
										allowBlank: false
									},{
										id:'ct-numeroItem',
										xtype:'textfield',
										fieldLabel:'N&uacutemero', // creamos un campo
										name:'txt-detPago', // a partir de una
										//emptyText:'Direccion',
										disabled: true,	
										allowBlank:true

									},{
										id: 'panel-total',
										height: 75,
										//region: 'south',
										border: false,
										html: '<div id="total" style="font-size:14px;"></div>'
									}]
								}]
							});
							
							Ext.getCmp('ct-numFac').on("invalid",function(){
								finishBtn.disable();
							});
							
							Ext.getCmp('ct-numFac').on("valid",function(){
								finishBtn.enable();
							});
							
							Ext.getCmp('ct-formaPago').on('select',function(cmb,record,index){	
								if(record.get('field1') == 'Efectivo'){
									Ext.getCmp('ct-banco').disable();			
									Ext.getCmp('ct-banco').clearValue();	
									Ext.getCmp('ct-numeroItem').disable();			
									Ext.getCmp('ct-numeroItem').setValue('');	
								}else{
									Ext.getCmp('ct-banco').enable();			
									Ext.getCmp('ct-banco').clearValue();	
									Ext.getCmp('ct-numeroItem').enable();			
									Ext.getCmp('ct-numeroItem').setValue('');	
								}
							});
							
							index = 0;
							
							formFab = new Ext.FormPanel({
								layout      : "card",
								border      : false,
								activeItem  : index,
								items       : [busContratista, getRela, getCxc, totalRela]
							});
							
							function next(){
								nextBtn.disable();
								backBtn.show();
								if(index < formFab.items.length-1){
									index++;
									if(index == 2 && !Ext.getCmp('id-active').getValue()){
										index++;
									}
									var cardlayout = formFab.getLayout();
									cardlayout.setActiveItem(index);
									
									if(index == formFab.items.length-1){ //si esta en el ultima carta
										nextBtn.hide();
										finishBtn.show();
									}
								}
								/*console.debug(index);*/
							};
						
							function back(){
								nextBtn.enable();
								if(index>0){
									index--;
									if(index == 2 && !Ext.getCmp('id-active').getValue()){
										index--;
									}
									var cardlayout = formFab.getLayout();
									cardlayout.setActiveItem(index);
								}
								
								if(index == 0){    //si esta en la primera carta
									backBtn.hide();    
									finishBtn.hide();
									nextBtn.show();
								}else{
									finishBtn.hide();
									nextBtn.show();
								}
							};
						
							function finish(){
								
								var recordsToSendRel = [];
								var selectedRowsRel = checkBoxSelMod.getSelections();
								Ext.each(selectedRowsRel, function(record) { //step 2
									recordsToSendRel.push(Ext.apply(record.data));
								});
								recordsToSendRel = Ext.encode(recordsToSendRel);
								
								var detallesCxc = [0, 0, 0, 0];
								var recordsToSendCxc = [];									
								var selectedRowsCxc = checkBoxSelModCxc.getSelections();
								Ext.each(selectedRowsCxc, function(record) { //step 2
									recordsToSendCxc.push(Ext.apply(record.data));
									switch (record.data['tipo']) { 
										case 'Vale':
											detallesCxc[0] += record.data['monto'];
											break 
										case 'Prestamo':
											detallesCxc[1] += record.data['monto'];
											break 
										case 'Material':
											detallesCxc[2] += record.data['monto'];
											break 
										case 'Adelanto':
											detallesCxc[3] += record.data['monto'];
											break 
									}
								});
								recordsToSendCxc = Ext.encode(recordsToSendCxc);
								
								var url = Ext.urlEncode({
											ciCont:ciCont,
											nomCont:nomCont,
											totalRel:formatNumber(roundNumber(totalRel,3),' BsF.'),
											totalVal:formatNumber(roundNumber(detallesCxc[0],3),' BsF.'),
											totalPre:formatNumber(roundNumber(detallesCxc[1],3),' BsF.'),
											totalMat:formatNumber(roundNumber(detallesCxc[2],3),' BsF.'),
											totalAde:formatNumber(roundNumber(detallesCxc[3],3),' BsF.'),
											totalCxc:formatNumber(roundNumber(totalCxc,3),' BsF.'),
											totalGen:formatNumber(roundNumber(totalRel-totalCxc,3),' BsF.'),
											numFac:Ext.getCmp('ct-numFac').getValue(),
											formaPago:Ext.getCmp('ct-formaPago').getValue(),
											banco:Ext.getCmp('ct-banco').getValue(),
											numeroItem:Ext.getCmp('ct-numeroItem').getValue()
								});					
								
								Ext.Ajax.request({
										url : 'php/cxp/saveCxp.php' , 
										params : {
											idCont:idCont,
											totalRel:totalRel,
											totalCxc:totalCxc,
											numFac:Ext.getCmp('ct-numFac').getValue(),
											formaPago:Ext.getCmp('ct-formaPago').getValue(),
											banco:Ext.getCmp('ct-banco').getValue(),
											numeroItem:Ext.getCmp('ct-numeroItem').getValue(),
											recordsRel: recordsToSendRel,
											recordsCxc: recordsToSendCxc
										},
										method: 'POST',
										success: function ( result, request ) { 
											Ext.MessageBox.alert('', result.responseText.split('-')[0].trim()); 
											Ext.getCmp('win-Cxp').close();
											openwin('php/cxp/reciboDePago.php?'+url+'&idCxp='+result.responseText.split('-')[1].trim());
										},
										failure: function ( result, request) { 
											Ext.MessageBox.alert('Failed', result.responseText); 
										} 
									});	
							};
							
							backBtn = new Ext.Button({text: "Atras", handler: back, /*scope : this,*/ hidden:true});
							nextBtn = new Ext.Button({text: "Siguiente", handler: next, disabled: true});
							finishBtn = new Ext.Button({text: "Finalizar", handler: finish, disabled: true, hidden: true});
								
							new Ext.Window({
								id : 'win-Cxp',
								title : 'Emisi&oacute;n de Pago',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width       : 450,
								height      : 550,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[formFab],			
								fbar: [backBtn,nextBtn,finishBtn]
								/*buttons: [{
									text:'Aceptar',
									align:'center',7
									handler: function (){
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-editCont').close();
									}
								}]*/
							}).show();
							
							
						}
					},'->',{
						text: 'Reporte - Emisi&oacuten de Pagos', 
						iconCls: 'icon-report',
                		scale: 'medium', 
						handler: function(){
							
							var storeContra = new Ext.data.JsonStore({
								url : 'php/contratista/getListCont.php'
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item" style="width:400;">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{name} {apel} - {cedu}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								id:'searchField',
								store : storeContra,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Nombre (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								allowBlank: false,
								tpl : resultTpl,
								itemSelector : 'div.search-item',
								onSelect: function(record){ // override default onSelect to do redirect	
									var url = Ext.urlEncode({
										idCont:record.data.id,
										nomCont:record.data.name+' '+record.data.apel
									});
									openwin('php/cxp/reportCxp.php?'+url);
									Ext.getCmp('searchField').collapse();
									Ext.getCmp('win-reportCxp').close();
								}
							});
							
							var busContratista = new Ext.form.FormPanel({
								id : 'getConRel',
								bodyStyle :'padding: 10px',
								border : true,
								width : 275,
								items : [{
									html: "<h1>Datos del Contratista</h1> <br> <p>A continuaci&oacuten por favor seleccione los datos del contratista.<br><br> ", 
									border: false
								},{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Contratista ]',
									width : 250,
									margins:'25 0 25 0',
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								}]
							});	
							
							new Ext.Window({
								id : 'win-reportCxp',
								title : 'Reporte de Emisi&oacuten de Pagos por Contratista',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 350,
								height : 250,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								items:[busContratista]
							}).show();
						}
					}],
					html: '<div id="cxp-div"> <div id="fondoestirado"> <img src="images/background.jpg" alt="" /> </div>  </div> '						
				};
				
				
	Ext.apply(Ext.form.VTypes,{
		pass: function(value,field){
			return Ext.getCmp('us-pass').getValue() != Ext.getCmp('us-pass2').getValue() ? false : true;
		},
		passText: 'Este campo debe ser igual a Password'
	});
	
	function save_usu(){
		if (Ext.getCmp('form-usu').form.isValid()) {
			//Ext.getCmp('form-cont').setValue(); Ext.util.MD5(Ext.getCmp('field-pass').getValue())
			Ext.getCmp('form-usu').form.submit({
				waitTitle : "Validando",			
				url       : 'php/usuario/saveUsu.php',
				params: {
					password: Ext.util.MD5(Ext.getCmp('us-pass').getValue())
				},
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
				},
				success: function(sender,action) {
					Ext.Msg.alert('',action.result.msg);
					Ext.getCmp('win-addUsu').close();
				}
			});
		}else{
			console.debug('Formulario invalido');
		}
	}
	
	function edit_usu(){
		if (Ext.getCmp('form-usu').form.isValid()) {
			//Ext.getCmp('form-cont').setValue();
			Ext.getCmp('form-usu').form.submit({
				waitTitle : "Validando",			
				url       : 'php/usuario/editUsu.php',
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
				},
				success: function(sender,action) {
					/*if(Ext.getCmp('us-tipo').getValue()=='Usuario'){
						console.debug(tipoUsuario);
						Ext.getCmp('add-usu').disable();
						Ext.getCmp('edit-usu').disable();
					}*/
					Ext.Msg.alert('',action.result.msg);
					Ext.getCmp('win-editUsu').close();
				}
			});
		}else{
			/*console.debug('Formulario invalido');*/
		}
	};
	
	function pass_change(){
		if (Ext.getCmp('form-pass').form.isValid()) {
			//Ext.getCmp('form-cont').setValue();
			Ext.getCmp('form-pass').form.submit({
				waitTitle : "Validando",			
				url       : 'php/usuario/passChange.php',
				params: {
					password: Ext.util.MD5(Ext.getCmp('us-pass').getValue())
				},
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					Ext.Msg.alert('failure',action.result.msg); 
				},
				success: function(sender,action) {
					Ext.Msg.alert('',action.result.msg);
					Ext.getCmp('win-passChange').close();
				}
			});
		}else{
			/*console.debug('Formulario invalido');*/
		}
	};
	
	var moduleUsuario = {
					id:'moduleUsuario',
					title:'Gesti&oacute;n de Usuario',					
					cls:'inner-tab-custom', // custom styles in layout-browser.css
					//layout   : 'border',
					hideMode:Ext.isIE ? 'offsets' : 'display',
					tbar: [{
						id: 'add-usu',   
						text: 'Agregar', 
						iconCls: 'icon-user-add', 
                		scale: 'medium',
						disabled: true,
						handler: function(){	
									
							var camposUsuario=[
								{  
									id:'us-id',
									xtype:'hidden',//<-- campo oculto (hidden)  
									name:'txt-id', //el nombre con que se envia al servidor  
									value:'developer'//el valor que contendrá  
								},{
									id:'us-login',
									xtype : 'textfield',
									fieldLabel:'Login',
									name:'txt-login',
									emptyText:'Login...'
								},{
									id:"us-pass",
									xtype : 'textfield',
									fieldLabel:'Password', // creamos un campo
									name:'txt-pass', // a partir de una
									inputType:'password',
									submitValue:false,
									maxLength:20,
									minLength:5
								},{
									id:"us-pass2",
									xtype : 'textfield',
									fieldLabel:'Confirmar Pass', // creamos un campo
									name:'txt-pass2', // a partir de una
									inputType:'password',
									vtype: 'pass',
									submitValue:false,
									maxLength:20,
									minLength:5
								},{
									id:"us-tipo",
									xtype:'combo',
									fieldLabel:'Tipo',  
									name:'cmb-tipo',  
									forceSelection:true,
									store:['Administrador','Usuario'],  
									//emptyText:'Seleccione edo...',  
									triggerAction:'all',   
									editable:false
								},{
									id:"us-estado",
									xtype:'combo',
									fieldLabel:'Estado',  
									name:'cmb-estado',  
									forceSelection:true,
									store:['Activo','Inactivo'],  
									//emptyText:'Seleccione edo...',  
									triggerAction:'all',   
									editable:false
								}
							];
							
							var setUsuario = new Ext.form.FormPanel({
								id : 'form-usu',
								bodyStyle :'padding: 10px',
								border : false,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Datos del Usuario ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposUsuario]
								}]
							});
							
							new Ext.Window({
								id : 'win-addUsu',
								title : 'Agregar Usuario',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 400,
								height : 300,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[setUsuario],
								buttons: [{
									text:'Aceptar',
									align:'center',
									handler: function (){
										save_usu();
										//Ext.getCmp('add-cvs').enable();
										//Ext.getCmp('add-txt').enable();
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-addUsu').close();
									}
								}]
							}).show();
						}
					},'-',{
						id: 'edit-usu',
						text: 'Editar', 
						iconCls: 'icon-user-edit',
                		scale: 'medium', 
						disabled: true,
						handler: function(){
							
							var camposUsuarioEdit=[
								{  
									id:'us-id',
									xtype:'hidden',//<-- campo oculto (hidden)  
									name:'txt-id', //el nombre con que se envia al servidor  
									value:'developer'//el valor que contendrá  
								},{
									id:'us-login',
									xtype : 'textfield',
									fieldLabel:'Login',
									name:'txt-login',
									emptyText:'Login...'
								},{
									id:"us-tipo",
									xtype:'combo',
									fieldLabel:'Tipo',  
									name:'cmb-tipo',  
									forceSelection:true,
									store:['Administrador','Usuario'],  
									//emptyText:'Seleccione edo...',  
									triggerAction:'all',   
									editable:false
								},{
									id:"us-estado",
									xtype:'combo',
									fieldLabel:'Estado',  
									name:'cmb-estado',  
									forceSelection:true,
									store:['Activo','Inactivo'],  
									//emptyText:'Seleccione edo...',  
									triggerAction:'all',   
									editable:false
								}
							];
							
							var storeUsuario = new Ext.data.JsonStore({
								url : 'php/usuario/getListUsu.php'
							});
							
							storeUsuario.on("load",function(Store,records,options,groups){
								//panelView.doLayout();
								Ext.getCmp('us-id').reset();
								Ext.getCmp('us-login').reset();
								Ext.getCmp('us-tipo').reset();
								Ext.getCmp('us-estado').reset();
							});
							
							var resultTpl = new Ext.XTemplate(
								'<tpl for="."><div class="search-item-usu" style="background-image:url({url});">',
									/*'<h3><span>{placa}<br />by {fecha}</span></h3>',*/
									'<h4 style="padding:5px;">{login} - {tipo}</h4>',
								'</div></tpl>'
							);
						
							var search = new Ext.form.ComboBox({
								store : storeUsuario,
								//displayField : 'title',
								typeAhead : false,
								loadingText : 'Buscando...',
								minChars : 3,
								emptyText : 'Por Login (min 3 caracteres)... ',
								listWidth : 240,
								hideLabel : true,
								pageSize : 10,
								hideTrigger : true,
								tpl : resultTpl,
								itemSelector : 'div.search-item-usu',
								onSelect: function(record){ // override default onSelect to do redirect
									
									var maskView = new Ext.LoadMask(Ext.getCmp('form-usu').getEl());
									maskView.show();	
									
									Ext.Ajax.request({
										url : 'php/usuario/getUsu.php' , 
										params : {id:record.data.id},
										method: 'POST',
										success: function ( result, request ) {
											Ext.getCmp('us-id').setValue(result.responseText.split(';')[0].trim());
											Ext.getCmp('us-login').setValue(result.responseText.split(';')[1].trim());
											Ext.getCmp('us-tipo').setValue(result.responseText.split(';')[2].trim());
											Ext.getCmp('us-estado').setValue(result.responseText.split(';')[3].trim());
											
											maskView.hide();
											Ext.getCmp('form-usu').enable();
										},
										failure: function ( result, request) { 
											Ext.MessageBox.alert('Failed', result.responseText); 
											maskView.hide();
										} 
									});
								}
							});							
							
							var setUsuario = new Ext.form.FormPanel({
								id : 'form-usu',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'center',
								disabled  :true,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Datos del Usuario ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposUsuarioEdit]
								}]
							});
							
							var busUsuario = new Ext.form.FormPanel({
								id : 'form-busca',
								bodyStyle :'padding: 10px',
								border : true,
							    region : 'west',
								width : 275,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Buscar Usuario ]',
									width : 250,
									defaults   : {
										anchor : '100%'
									},
									items : [search]
								}]
							});
								
							new Ext.Window({
								id : 'win-editUsu',
								title : 'Editar Usuario',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 675,
								height : 300,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[{
									layout:'border',
									items:[busUsuario,setUsuario]
								}],
								buttons: [{
									text:'Aceptar',
									align:'center',
									handler: function (){
										edit_usu();
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-editUsu').close();
									}
								}]
							}).show();
							
						}
					},'-',{
						text: 'Cambiar Password', 
						iconCls: 'icon-user-delete',
                		scale: 'medium', 
						handler: function(){
							
							var camposUsuPassChange=[
								{  
									id:'us-id',
									xtype:'hidden',//<-- campo oculto (hidden)  
									name:'txt-id', //el nombre con que se envia al servidor  
									value:idUsuario//el valor que contendrá  
								},{
									id:"us-pass",
									xtype : 'textfield',
									fieldLabel:'Password', // creamos un campo
									name:'txt-pass', // a partir de una
									inputType:'password',
									submitValue:false,
									maxLength:20,
									minLength:5
								},{
									id:"us-pass2",
									xtype : 'textfield',
									fieldLabel:'Confirmar Pass', // creamos un campo
									name:'txt-pass2', // a partir de una
									inputType:'password',
									vtype: 'pass',
									submitValue:false,
									maxLength:20,
									minLength:5
								}
							];
							
							var setContratista = new Ext.form.FormPanel({
								id : 'form-pass',
								bodyStyle :'padding: 10px',
								border : true,
								layout : 'fit',
								disabled: false,
								items : [{
									xtype : 'fieldset',
									collapsible : false,
									title : '[ Datos del Usuario ]',
									width : 350,
									defaults   : {
										anchor : '100%',
										//width : 200,
										allowBlank:false
									},
									items : [camposUsuPassChange]
								}]
							});
								
							new Ext.Window({
								id : 'win-passChange',
								title : 'Cambiar Password',
								layout : 'fit',
								bodyStyle :'padding:10px 5px 5px 5px;',
								width : 375,
								height : 200,
								resizable : false,
								modal : true,
								//autoDestroy : true,
								closable : true,
								closeAction : 'close',
								plain : true,
								buttonAlign :'center',
								items:[setContratista],
								buttons: [{
									text:'Aceptar',
									align:'center',
									handler: function (){
										pass_change();
									}
								},{
									text:'Cerrar',
									align:'center',
									handler: function (){
										Ext.getCmp('win-passChange').close();
									}
								}]
							}).show();
						}
					}],
					html: '<div id="usuario-div"> <div id="fondoestirado"> <img src="images/background.jpg" alt="" /> </div>  </div> '	
				};	
	
	function loadData(modulo){
		
		Ext.getCmp('tab-container').removeAll(true);
		
		switch (modulo) { 
			case 'Contratista':
				Ext.getCmp('tab-container').add(moduleContratista);
				break 
			
			case 'Relaciones':
				Ext.getCmp('tab-container').add(moduleRelaciones);
				break 
				
			case 'Cuentas por Cobrar':
				Ext.getCmp('tab-container').add(moduleCxC);
				break 
				
			case 'Emisión de Pagos':
				Ext.getCmp('tab-container').add(moduleCxP);
				break 
				
			case 'Gestión de Usuario':
				Ext.getCmp('tab-container').add(moduleUsuario);
				if(tipoUsuario=='Administrador'){
					/*console.debug(tipoUsuario);*/
					Ext.getCmp('add-usu').enable();
					Ext.getCmp('edit-usu').enable();
				}
				break 
				
			/*default: 
				colGrid.push({header:item.header,dataIndex:item.name});*/
		}
		
		
		Ext.getCmp('tab-container').setActiveTab(0);
		
		
		
		Ext.getCmp('content-panel').layout.setActiveItem('tab-container');	
	
	};
       	
	var mainViewport = new Ext.Viewport({					 
		id : 'mainViewport',
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [menuPanel,contentPanel],
        renderTo: Ext.getBody()
    });
	
	/***************** Gestion de Usuario **********************/ 
	
	function Validar(){
		if (loginForm.form.isValid()) {
			//Ext.getCmp('field-pass').setValue();
			loginForm.form.submit({
				waitTitle : "Validando",			
				url       : 'php/usuario/getLogin.php',
				params: {
					password: Ext.util.MD5(Ext.getCmp('field-pass').getValue())
				},
				waitMsg   : "Espere un momento por favor......",
				failure   : function(sender,action){
					//Ext.utiles.msg('Error!', action.result.msg);
					Ext.Msg.alert('Error!',action.result.msg);
				},
				success: function(sender,action) {
					//Ext.example.msg('Click','You clicked on "Action 1".');
					//actualizarEmpresaConectada();
					//Ext.utiles.msg('Correcto!', action.result.msg);
					Ext.Msg.alert('Correcto!',action.result.msg.split(';')[0].trim());
					idUsuario = action.result.msg.split(';')[1].trim();
					tipoUsuario = action.result.msg.split(';')[2].trim();
					/*console.debug(tipoUsuario);*/
					/*Ext.getCmp('add-cvs').enable();
					Ext.getCmp('add-txt').enable();*/
					loginForm.getForm().reset();
					Ext.getCmp('win-login').close();
				}
			});
		}
	};
	
	var loginForm = new Ext.form.FormPanel({
		baseCls: 'x-plain',
		labelWidth: 180,
		autoWidth:true,
		autoHeight:true,
		frame:true,
		autoScroll:false,
		bodyStyle:'padding:10px;',
		//url:'localhost',
		items: [{
			xtype:'fieldset',
			title:'Usuario / Password', 
			autoWidth:true, 
			labelWidth: 90, 
			autoHeight:true, 
			defaultType: 'textfield',
			items:[
				{fieldLabel:'Usuario', name: 'login', allowBlank:false, maxLength:250, anchor:'80%'},
				{fieldLabel:'Password', inputType:'password', allowBlank:false, maxLength:20, name: 'password', anchor:'80%', id: 'field-pass', submitValue: false}
			]
		}]
	}); 
	
	var winLogin = new Ext.Window({
		id     : 'win-login',
		title:'Validaci&oacute;n de Usuario',
		layout:'fit',
		bodyStyle:'padding:10px 5px 5px 5px;',
		width:340,
		height:200,
		resizable:false,
		modal:true,
		autoScroll: true,
		maximizable:false,
		closable:false,
		plain: true,
		buttonAlign:'center',
		items:[loginForm],
		buttons: [{
			text:'Aceptar',
			align:'center',
			handler: function (){
				Validar();
				//Ext.getCmp('add-cvs').enable();
				//Ext.getCmp('add-txt').enable();
			}
		},{
			text:'Ayuda',
			align:'center',
			handler: function (){
				Ext.Msg.alert('Administrador','Contacte al administrador del sistema');
			}
		}]
	}).show();
	/***********************************************************/
});



