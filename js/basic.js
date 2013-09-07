/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/licenseF
 *
 * Desarrollador: Nelson Suarez 
 * nelson.suarezp@gmail.com
 */



/*
 * ================  startPage config  =======================
 */

var start = {
	id        : 'start-panel',
    //title     : 'P&aacute;gina de Inicio',
    //layout    : 'anchor',
    bodyStyle : '',
    items     : [/*{
		//region    : 'center',
		border    : false,
		//anchor:'right -150',
		contentEl : 'start-div'  // pull existing content from the page
	}*//*,{
		region    : 'south',
		border    : false,
		//anchor:'right -200',
		contentEl : 'logo-div'  // pull existing content from the page
	}*/]
};

/*
 * ================  AbsoluteLayout config  =======================
 */

var absolute = {
			id        : 'tab-container',
			xtype     : 'tabpanel',
			plain     : true,
			border    : true,
			region    : 'center',
			margins   : '0 0 0 0',
			padding   : '1 1 1 1',
			activeTab : 0,
			items     : [/*,
				{
					title     : 'Planificacion',
					disabled  :true,
					bodyStyle : 'padding:10px;',
					html      : 'Modulo en Construccion.'
				}*/
			]
};