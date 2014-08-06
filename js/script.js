$(document).ready(function() {

	// jeffy poo's code
	// try { throw new Error('yo!') } catch (e) { window.wtf = e.toString(); alert(window.wtf); }

	// updates preview area with code
	// updates hidden form field bucket values for saving code
	function update_preview() {
		var html,
			css,
			js,
			previewFrame = document.getElementById('project-preview'),
			preview;

		if (previewFrame) {
			preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
		}

		if (htmlCodeMirror) {
			html = htmlCodeMirror.getValue();
		}

		if (cssCodeMirror) {
			css = cssCodeMirror.getValue();
		}

		if (jsCodeMirror) {
			js = jsCodeMirror.getValue();
		}

		if (html) {
			$('#project-code').find('#html-bucket').val(html);
			if (preview) {
				preview.open();
				preview.write(html);
				preview.close();
			}
		}
		if (css) {
			$('#project-code').find('#css-bucket').val(css);
			$('#project-preview').contents().find('head').append('<style>' + css + '</style>');
		}
		if (js) {
			$('#project-code').find('#js-bucket').val(js);
		}

		if ($('#tab-js').length > 0) {
			$('#js-bucket').val(js);
		}
	}

	function run_js() {
		var html,
			css,
			js,
			previewFrame = document.getElementById('project-preview'),
			preview;

		if (previewFrame) {
			preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
		}

		if (htmlCodeMirror) {
			html = htmlCodeMirror.getValue();
		}

		if (cssCodeMirror) {
			css = cssCodeMirror.getValue();
		}

		if (jsCodeMirror) {
			js = jsCodeMirror.getValue();
		}

		if (js) {
			// try {
				// eval(js); // no. bad. just an experiment.

				// prepare html
				if (html.length > 0) {
					html = '<body>' + html + '<script type="text/javascript">' + js + '</script></body>';
				} else {
					html = '<html><head></head><body><script type="text/javascript">' + js + '</script></body></html>';
				}

				// write html / js
				preview.open();
				preview.write(html);
				preview.close();

				// write css
				if (css.length > 0) {
					$(previewFrame).contents().find('head').append('<style>' + css + '</style>');
				}
			// } catch(e) {
			// 	console.log('you haz errors: ' + e);
			// }
		}
	}

	// add resizable handle to editor panel
	$('.editor').resizable({
		handles: 'e'
	});

	// tab up the code areas
	$('.editor #tabs').tabs();

	// expand / collapse hint section
	$('#hint').click(function() {
		if ($('.alert').is(':visible')) {
			$('.alert').slideUp();
		} else {
			$('.alert').slideDown();
		}
		$(this).toggleClass('active', 400);
	});

	var htmlCodeMirror, cssCodeMirror, jsCodeMirror;

	// HTML tab codemirrorified
	if ($('#html').length > 0) {
		var htmlBox = document.getElementById('html');
		htmlCodeMirror = CodeMirror.fromTextArea(htmlBox, {
			mode: 'text/html',
			tabMode: 'indent',
			indentUnit: 4,
			lineNumbers: true,
			lineWrapping: true,
			readOnly: false,
			// foldGutter: true,
			// gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
		});

		// focus on HTML code on page load
		if (htmlCodeMirror) {
			htmlCodeMirror.focus();
		}

		// focus on HTML code on tab click
		$('a[href="#tab-html"]').click(function() {
			if (htmlCodeMirror) {
				htmlCodeMirror.focus();
			}
		});

		if (htmlCodeMirror) {
			htmlCodeMirror.on('change', update_preview);
		}
	}

	// CSS tab codemirrorified
	if ($('#css').length > 0) {
		var cssBox = document.getElementById('css');
		cssCodeMirror = CodeMirror.fromTextArea(cssBox, {
			mode: 'css',
			tabMode: 'indent',
			indentUnit: 4,
			lineNumbers: true,
			lineWrapping: true,
			readOnly: false,
			// foldGutter: true,
			// gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
		});

		// refresh CSS code & focus on tab click
		$('a[href="#tab-css"]').click(function() {
			if (cssCodeMirror) {
				cssCodeMirror.refresh();
				cssCodeMirror.focus();
			}
		});

		if (cssCodeMirror) {
			cssCodeMirror.on('change', update_preview);
		}
	}

	// JS tab codemirrorified
	if ($('#js').length > 0) {
		var jsBox = document.getElementById('js');
		jsCodeMirror = CodeMirror.fromTextArea(jsBox, {
			mode: 'text/javascript',
			tabMode: 'indent',
			indentUnit: 4,
			lineNumbers: true,
			lineWrapping: true,
			readOnly: false,
			// foldGutter: true,
			// gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
		});

		// refresh JS code & focus on tab click
		$('a[href="#tab-js"]').click(function() {
			if (jsCodeMirror) {
				jsCodeMirror.refresh();
				jsCodeMirror.focus();
			}
		});

		if (jsCodeMirror) {
			jsCodeMirror.on('change', update_preview);
		}

		$('#run-js').click(function() {
			run_js();
		})
	}
});
