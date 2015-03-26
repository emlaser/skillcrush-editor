$(document).ready(function() {

	$('#tutorials-css').remove(); // removed tutorial css, because it's crushed your styles

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
			$('#form-code').find('#html-bucket').val(html);
			if (preview) {
				preview.open();
				preview.write(html);
				preview.close();
			}
		}
		if (css) {
			$('#form-code').find('#css-bucket').val(css);
			$('#project-preview').contents().find('head').append('<style>' + css + '</style>');
		}
		if (js) {
			$('#form-code').find('#js-bucket').val(js);
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
			
			try {

				eval(js);
				
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
				if(window.sandbox) {
					//sandbox.model.sandboxFrame.contentDocument.open();
					//sandbox.model.sandboxFrame.contentDocument.write(html);
					//sandbox.model.sandboxFrame.contentDocument.close();
					//sandbox.model.evaluate(js);
				}
			} catch(e) {
	            window.sandbox.model.displayError(e.description || e.toString());
          }
		}
	}

	$(function(){
		var innerDiv2 = $('.project-editor');
	  	innerDiv2.resizable({
	  		start: function(event, ui) {
           		$("#mask").css("display","block");
	        },
	        stop: function(event, ui) {
	        	$("#mask").css("display","none");
	        },
		    handles: 'e',
		    minWidth : '22%',
		    maxWidth : '78%',
		    resize: function( event, ui ) {
		      var remainingSpace = $(this).parent().width() - $(this).outerWidth(true);
		      var divOne = $(this).next();
		      var divOneWidth = remainingSpace - 1 -( divOne.outerWidth(true) - divOne.width() );
		      divOne.css( 'width', divOneWidth + 'px' );
		    }
	  	});
	});

	// tab up the code areas
	$('.project-editor #tabs').tabs();

	$('.single-sc_projects #hint, .single-user_challenges #hint, .single-user_102_challenges #hint').on('click', function(e) {
		e.preventDefault();
		$('.hint-text').addClass('active');
	});

	// expand / collapse hint section
	$('.button#hint').click(function() {
		$('.alert').slideToggle();
		$(this).toggleClass('active', 400);
	});

	var htmlCodeMirror, cssCodeMirror, jsCodeMirror;

	// HTML tab codemirror
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
			update_preview();
			htmlCodeMirror.on('change', update_preview);
		}
	}

	// CSS tab codemirror
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
			update_preview();
			cssCodeMirror.on('change', update_preview);
		}
	}

	// JS tab codemirror
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
			update_preview();
			jsCodeMirror.on('change', update_preview);
		}

		$('#run-js').click(function(e) {
			e.preventDefault();
			run_js();
		})
	}

	// if instructions panel & steps, make deck of cards with hints!
	if ($('.instructions').length > 0 && $('.step-list li').length > 0) {
		$(function() {
			$('.step-list').each(function() {
				$li = $(this).find('> li');
				var firstStepNum = $li.first().attr('data-id').replace('step-', '');
				if ($('li.code-editor').length > 0) {
					var lastStepNum = $li.last().prev().attr('data-id').replace('step-', '');
				} else {
					var lastStepNum = $li.last().attr('data-id').replace('step-', '');
				}
				var numSteps = $li.length;
				var curStepNum;

				if (window.location.hash) {
					curStepNum = window.location.hash.replace('#step', '');
					$(this).find('> li').removeClass('active');
					if ($('.step-list.right > li[data-id="step-' + curStepNum + '"]').hasClass('editor-with-js') || $('.step-list.right > li[data-id="step-' + curStepNum + '"]').hasClass('editor-no-js')) {
						if ($(this).hasClass('right')) {
							var type = $('.step-list.right > li[data-id="step-' + curStepNum + '"]').data('type');
							var editorLi = $(this).find('.code-editor');
							$(editorLi).addClass('active ' + type);
							if (type == 'editor-with-js') {
								$('#run-js, #tab-js, #tabs .js-tab').show();
							} else {
								$('#run-js, #tab-js, #tabs .js-tab').hide();
							}
						} else {
							$(this).find('li[data-id="step-' + curStepNum + '"]').addClass('active');
						}
					} else {
						$('.step-list.right > li[data-id="step-' + curStepNum + '"]').addClass('active');
						// $(this).find('li[data-id="step-' + curStepNum + '"]').addClass('active');
					}
					// $('.step-list.right > li[data-id="step-' + curStepNum + '"]').addClass('active');
					$('.alert p#hint-' + curStepNum).addClass('active');
					$('#current').text(curStepNum);
				} else {
					$li.first().addClass('active');
					$('.alert p').first().addClass('active');
					curStepNum = $(this).find('li.active').attr('data-id').replace('step-', '');
					if (lastStepNum > 1 && curStepNum < lastStepNum) {
						window.location.hash = '#step' + curStepNum;
					}
				}
				
				// add step numbers to header
				$('#current').text(curStepNum);
				$('#total').text(lastStepNum);

				// if not the first step, show the prev button
				if (curStepNum != firstStepNum) {
					$('.steps-header #prev').show();
				}

				// if not the last step, show the next button
				if (curStepNum != lastStepNum) {
					$('.steps-header #next').show();
				}

				$('.steps-header button').click(function() {
					var direction = $(this).attr('id'); // prev or next
					if (direction.toLowerCase() == 'prev') {
						curStepNum--;
						if (curStepNum == firstStepNum) {
							$(this).hide();
						}
						if (curStepNum < lastStepNum) {
							$('.steps-header #next').show();
						}
					} else if (direction.toLowerCase() == 'next') {
						curStepNum++;
						if (curStepNum == numSteps) {
							$(this).hide();
						}
						if (curStepNum > firstStepNum && curStepNum <= lastStepNum) {
							$('.steps-header #prev').show();
						}
					}
					$('.alert').slideUp('fast');
					$('.button#hint').removeClass('active');

					$('.step-list').each(function() {
						$(this).find('> li').removeClass('active');
						if ($('.step-list.right > li[data-id="step-' + curStepNum + '"]').hasClass('editor-with-js') || $('.step-list.right > li[data-id="step-' + curStepNum + '"]').hasClass('editor-no-js')) {
							if ($(this).hasClass('right')) {
								var type = $('.step-list.right > li[data-id="step-' + curStepNum + '"]').data('type');
								var editorLi = $(this).find('.code-editor');
								$(editorLi).addClass('active ' + type);
								if (type == 'editor-with-js') {
									$('#run-js, #tab-js, #tabs .js-tab').show();
								} else {
									$('#run-js, #tab-js, #tabs .js-tab').hide();
								}
							} else {
								$(this).find('li[data-id="step-' + curStepNum + '"]').addClass('active');
							}
						} else {
							$(this).find('li[data-id="step-' + curStepNum + '"]').addClass('active');
						}
					});
					//$('.step-list > li').removeClass('active'); // hide all step list
					//$('.step-list > li[data-id="' + curStepNum + '"]').addClass('active');// show next step li
					$('.alert p').removeClass('active'); // hide all hints
					$('.alert p#hint-' + curStepNum).addClass('active'); // show next hint
					$('#current').text(curStepNum); // update current step number in header
					window.location.hash = 'step' + curStepNum; // update url hash
				});
			});
			
		});
	}

	// Hide js console
	$('.console-log .alert-close').click(function() {
		$('.console-log').slideUp();
	});

	// project view toggle
	$('#edit-project-toggle, #back-to-project-toggle').click(function(e) {
		e.preventDefault();
		$('#share-view, #edit-view').toggle();
	});

	// i'm pretty sure we don't need this
	// $('input[type="file"]').wrap('<div class="file_upload button"></div>');
});
