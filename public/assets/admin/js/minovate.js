var MINOVATE = MINOVATE || {};
$(function() {
	MINOVATE.global = {
	init: function() {
		MINOVATE.global.deviceSize();
		MINOVATE.global.layout();
		MINOVATE.global.animsition();
	},
	deviceSize: function(){
			var jRes = jRespond([
				{
					label: 'smallest',
					enter: 0,
					exit: 479
				},{
					label: 'handheld',
					enter: 480,
					exit: 767
				},{
					label: 'tablet',
					enter: 768,
					exit: 991
				},{
					label: 'laptop',
					enter: 992,
					exit: 1199
				},{
					label: 'desktop',
					enter: 1200,
					exit: 10000
				}
			]);
			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() { $body.addClass('device-lg'); },
					exit: function() { $body.removeClass('device-lg'); }
				},{
					breakpoint: 'laptop',
					enter: function() { $body.addClass('device-md'); },
					exit: function() { $body.removeClass('device-md'); }
				},{
					breakpoint: 'tablet',
					enter: function() { $body.addClass('device-sm'); },
					exit: function() { $body.removeClass('device-sm'); }
				},{
					breakpoint: 'handheld',
					enter: function() { $body.addClass('device-xs'); },
					exit: function() { $body.removeClass('device-xs'); }
				},{
					breakpoint: 'smallest',
					enter: function() { $body.addClass('device-xxs'); },
					exit: function() { $body.removeClass('device-xxs'); }
				}
			]);
		},
	layout: function() {
		var defaultHeaderScheme = 'scheme-default',
			defaultNavbarScheme = 'scheme-default',
			defaultBrandingScheme = 'scheme-default',
			defaultColorScheme = 'default-scheme-color',
			defaultHeaderPosition = 'header-fixed',
			defaultNavbarPosition = 'aside-fixed',
			defaultRightbarVisibility = 'rightbar-hidden',
			defaultAppClasses = 'scheme-default default-scheme-color header-fixed aside-fixed rightbar-hidden';
		$body.addClass(defaultAppClasses);
		$header.addClass(defaultHeaderScheme);
		$branding.addClass(defaultBrandingScheme);
		$sidebar.addClass(defaultNavbarScheme).addClass(defaultNavbarPosition);
		$headerSchemeEl.on('click', function($event) {
		var scheme = $(this).data('scheme');
		$body.removeClass(defaultHeaderScheme).addClass(scheme);
		$header.removeClass(defaultHeaderScheme).addClass(scheme);
		defaultHeaderScheme = scheme;
		$event.stopPropagation();
		});
		$brandingSchemeEl.on('click', function($event) {
		var scheme = $(this).data('scheme');
		$branding.removeClass(defaultBrandingScheme).addClass(scheme);
		defaultBrandingScheme = scheme;
		$event.stopPropagation();
		});
		$sidebarSchemeEl.on('click', function($event) {
		var scheme = $(this).data('scheme');
		$body.removeClass(defaultNavbarScheme).addClass(scheme);
		$sidebar.removeClass(defaultNavbarScheme).addClass(scheme);
		defaultNavbarScheme = scheme;
		$event.stopPropagation();
		});
		$colorSchemeEl.on('click', function($event) {
		var scheme = $(this).data('scheme');
		$body.removeClass(defaultColorScheme).addClass(scheme);
		defaultColorScheme = scheme;
		$event.stopPropagation();
		});
		$fixedHeaderEl.change(function() {
		if ($body.hasClass('header-fixed')) {
			$body.removeClass('header-fixed').addClass('header-static');
		} else {
			$body.removeClass('header-static').addClass('header-fixed');
		}
		});
		$fixedHeaderEl.parent().on('click', function($event) {
		$event.stopPropagation();
		});
		$fixedAsideEl.change(function() {
		if ($body.hasClass('aside-fixed')) {
			$body.removeClass('aside-fixed').addClass('aside-static');
			$sidebar.removeClass('aside-fixed').addClass('aside-static');
		} else {
			$body.removeClass('aside-static').addClass('aside-fixed');
			$sidebar.removeClass('aside-static').addClass('aside-fixed');
		}
		});
		$fixedAsideEl.parent().on('click', function($event) {
		$event.stopPropagation();
		});
		$toggleRightbarEl.on('click', function() {
		if ($body.hasClass('rightbar-hidden')) {
			$body.removeClass('rightbar-hidden').addClass('rightbar-show');
		} else {
			$body.removeClass('rightbar-show').addClass('rightbar-hidden');
		}
		});
		if ($app.hasClass('boxed-layout')){
		$app.parent().addClass('boxed-layout');
		}
		if ($app.hasClass('sidebar-offcanvas')){
		$app.parent().addClass('sidebar-offcanvas');
		}
		if ($app.hasClass('hz-menu')){
		$app.parent().addClass('hz-menu');
		}
		if ($app.hasClass('rtl')){
		$app.parent().addClass('rtl');
		}
	},
	animsition: function() {
		$wrap.animsition({
		inClass							 :	 'fade-in',
		outClass							:	 'fade-out',
		inDuration						:		1500,
		outDuration					 :		800,
		linkElement					 :	 '.animsition-link',
		loading							 :		true,
		loadingParentElement	:	 'body',
		loadingClass					:	 'animsition-loading',
		unSupportCss					: [ 'animation-duration',
			'-webkit-animation-duration',
			'-o-animation-duration'
		],
		overlay							 :	 false,
		overlayClass					:	 'animsition-overlay-slide',
		overlayParentElement	:	 'body'
		});
	}
	};
	MINOVATE.header = {
	init: function() {
	}
	};
	MINOVATE.navbar = {
	init: function() {
		MINOVATE.navbar.menu();
		MINOVATE.navbar.ripple();
		MINOVATE.navbar.removeRipple();
		MINOVATE.navbar.collapse();
		MINOVATE.navbar.offcanvas();
	},
	menu: function(){
		if( $dropdowns.length > 0 ) {
		$dropdowns.addClass('dropdown');
		var $submenus = $dropdowns.find('ul >.dropdown');
		$submenus.addClass('submenu');
		$a.append('<i class="fa fa-plus"></i>');
		$a.on('click', function(event) {
			if ($app.hasClass('sidebar-sm') || $app.hasClass('sidebar-xs') || $app.hasClass('hz-menu')) {
			return false;
			}
			var $this = $(this),
				$parent = $this.parent('li'),
				$openSubmenu = $('.submenu.open');
			if (!$parent.hasClass('submenu')) {
			$dropdowns.not($parent).removeClass('open').find('ul').slideUp();
			}
			$openSubmenu.not($this.parents('.submenu')).removeClass('open').find('ul').slideUp();
			$parent.toggleClass('open').find('>ul').stop().slideToggle();
			event.preventDefault();
		});
		$dropdowns.on('mouseenter', function() {
			$sidebar.addClass('dropdown-open');
			$controls.addClass('dropdown-open');
		});
		$dropdowns.on('mouseleave', function() {
			$sidebar.removeClass('dropdown-open');
			$controls.removeClass('dropdown-open');
		});
		$notDropdownsLinks.on('click', function() {
			$dropdowns.removeClass('open').find('ul').slideUp();
		});
		var $activeDropdown = $('.dropdown>ul>.active').parent();
		$activeDropdown.css('display', 'block');
		}
	},
	ripple: function() {
		var parent, ink, d, x, y;
		$navigation.find('>li>a').click(function(e){
		parent = $(this).parent();
		if(parent.find('.ink').length === 0) {
			parent.prepend('<span class="ink"></span>');
		}
		ink = parent.find('.ink');
		ink.removeClass('animate');
		if(!ink.height() && !ink.width()){
			d = Math.max(parent.outerWidth(), parent.outerHeight());
			ink.css({height: d, width: d});
		}
		x = e.pageX - parent.offset().left - ink.width()/2;
		y = e.pageY - parent.offset().top - ink.height()/2;
		ink.css({top: y+'px', left: x+'px'}).addClass('animate');
		setTimeout(function(){
			$('.ink').remove();
		}, 600);
		});
	},
	removeRipple: function(){
		$sidebar.find('.ink').remove();
	},
	collapse: function(){
		$collapseSidebarEl.on('click', function(e) {
		if ($app.hasClass('sidebar-sm')) {
			$app.removeClass('sidebar-sm').addClass('sidebar-xs');
		}
		else if ($app.hasClass('sidebar-xs')) {
			$app.removeClass('sidebar-xs');
		}
		else {
			$app.addClass('sidebar-sm');
		}
		$app.removeClass('sidebar-sm-forced sidebar-xs-forced');
		$app.parent().removeClass('sidebar-sm sidebar-xs');
		MINOVATE.navbar.removeRipple;
		$window.trigger('resize');
		e.preventDefault();
		});
	},
	offcanvas: function() {
		$offcanvasToggleEl.on('click', function(e) {
		if ($app.hasClass('offcanvas-opened')) {
			$app.removeClass('offcanvas-opened');
		} else {
			$app.addClass('offcanvas-opened');
		}
		e.preventDefault();
		});
	}
	};
	MINOVATE.tiles = {
	init: function() {
		MINOVATE.tiles.toggle();
		MINOVATE.tiles.refresh();
		MINOVATE.tiles.fullscreen();
		MINOVATE.tiles.close();
	},
	toggle: function() {
		$tileToggleEl.on('click', function(){
		var element = $(this);
		var tile = element.parents('.tile');
		tile.toggleClass('collapsed');
		tile.children().not('.tile-header').slideToggle(150);
		});
	},
	refresh: function() {
		$tileRefreshEl.on('click', function(){
		var element = $(this);
		var tile = element.parents('.tile');
		var dropdown = element.parents('.dropdown');
		tile.addClass('refreshing');
		dropdown.trigger('click');
		var t = setTimeout( function(){
			tile.removeClass('refreshing');
		}, 3000 );
		});
	},
	fullscreen: function() {
		$tileFullscreenEl.on('click', function(){
		var element = $(this);
		var tile = element.parents('.tile');
		var dropdown = element.parents('.dropdown');
		screenfull.toggle(tile[0]);
		dropdown.trigger('click');
		});
		if ($tileFullscreenEl.length > 0) {
		$(document).on(screenfull.raw.fullscreenchange, function () {
			var element = $(screenfull.element);
			if (screenfull.isFullscreen) {
			element.addClass('isInFullScreen');
			} else {
			$('.tile.isInFullScreen').removeClass('isInFullScreen');
			}
		});
		}
	},
	close: function() {
		$tileCloseEl.on('click', function(){
		var element = $(this);
		var tile = element.parents('.tile');
		tile.addClass('closed').fadeOut();
		});
	}
	};
	MINOVATE.isMobile = {
	Android: function() {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function() {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function() {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function() {
		return (MINOVATE.isMobile.Android() || MINOVATE.isMobile.BlackBerry() || MINOVATE.isMobile.iOS() || MINOVATE.isMobile.Opera() || MINOVATE.isMobile.Windows());
	}
	};
	MINOVATE.documentOnResize = {
		init: function(){
		var t = setTimeout( function(){
		MINOVATE.documentOnReady.setSidebar();
		MINOVATE.navbar.removeRipple();
			}, 500 );
		}
	};
	MINOVATE.documentOnReady = {
		init: function(){
		MINOVATE.global.init();
			MINOVATE.header.init();
		MINOVATE.navbar.init();
		MINOVATE.documentOnReady.windowscroll();
		MINOVATE.tiles.init();
		MINOVATE.documentOnReady.setSidebar();
		},
	windowscroll: function(){
			$window.on( 'scroll', function(){
			});
		},
	setSidebar: function() {
		width = $window.width();
		if (width < 992) {
		$app.addClass('sidebar-sm');
		} else {
		$app.removeClass('sidebar-sm sidebar-xs');
		}
		if (width < 768) {
		$app.removeClass('sidebar-sm').addClass('sidebar-xs');
		} else if (width > 992){
		$app.removeClass('sidebar-sm sidebar-xs');
		} else {
		$app.removeClass('sidebar-xs').addClass('sidebar-sm');
		}
		if ($app.hasClass('sidebar-sm-forced')) {
		$app.addClass('sidebar-sm');
		}
		if ($app.hasClass('sidebar-xs-forced')) {
		$app.addClass('sidebar-xs');
		}
	}
	};
	MINOVATE.documentOnLoad = {
		init: function(){
		}
	};
	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$branding = $('#header .branding'),
		$sidebar = $('#sidebar'),
		$controls = $('#controls'),
		$app = $('.appWrapper'),
		$navigation = $('#navigation'),
		$sparklineEl = $('.sparklineChart'),
		$slimScrollEl = $('.slim-scroll'),
		$collapseSidebarEl = $('.collapse-sidebar'),
		$wrap = $('#wrap'),
		$offcanvasToggleEl = $('.offcanvas-toggle'),
		$dropdowns = $navigation.find('ul').parent('li'),
		$a = $dropdowns.children('a'),
		$notDropdowns = $navigation.children('li').not($dropdowns),
		$notDropdownsLinks = $notDropdowns.children('a'),
		$headerSchemeEl = $('.color-schemes .header-scheme'),
		$brandingSchemeEl = $('.color-schemes .branding-scheme'),
		$sidebarSchemeEl = $('.color-schemes .sidebar-scheme'),
		$colorSchemeEl = $('.color-schemes .color-scheme'),
		$fixedHeaderEl = $('#fixed-header'),
		$fixedAsideEl = $('#fixed-aside'),
		$toggleRightbarEl = $('.toggle-right-sidebar'),
		$pickDateEl = $('.pickDate'),
		$tileEl = $('.tile'),
		$tileToggleEl = $('.tile .tile-toggle'),
		$tileRefreshEl = $('.tile .tile-refresh'),
		$tileFullscreenEl = $('.tile .tile-fullscreen'),
		$tileCloseEl = $('.tile .tile-close'),
		$easypiechartEl = $('.easypiechart'),
		$chosenEl = $('.chosen-select'),
		$toggleClassEl = $('.toggle-class'),
		$colorPickerEl = $('.colorpicker'),
		$touchspinEl = $('.touchspin'),
		$datepickerEl = $('.datepicker'),
		$animateProgressEl = $('.animate-progress-bar'),
		$counterEl = $('.counter'),
		$splashEl = $('.splash');
	$(document).ready( MINOVATE.documentOnReady.init );
	$window.load( MINOVATE.documentOnLoad.init );
	$window.on( 'resize', MINOVATE.documentOnResize.init );
});