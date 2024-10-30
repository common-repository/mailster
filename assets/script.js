jQuery(document).ready(function ($) {
	'use strict';

	var errors = {},
		tests_run = 1,
		output = $('#output'),
		testinfo = $('#status'),
		progressbar = $('.bar'),
		checkoutLoaded = false,
		dialog = document.querySelector('dialog'),
		closeButton = document.querySelector('dialog button.close'),
		config = {
			id: 'wptester',
			plugin_id: mailster_tester.fs.plugin_id,
			plan_id: mailster_tester.fs.plan_id || null,
			public_key: mailster_tester.fs.public_key,
			title: 'Get 20% off the first year!',
			user_email: mailster_tester.fs.user.email,
			user_firstname: mailster_tester.fs.user.first,
			user_lastname: mailster_tester.fs.user.last,
			disable_licenses_selector: true,
			hide_licenses: true,
			coupon: mailster_tester.fs.coupon,
			hide_license_key: true,
			hide_billing_cycles: true,
			subtitle: 'Start your email marketing journey today!',
			checkout_style: 'phase2',
			purchaseCompleted: function (response) {},
			track: function (response) {},
			success: function (response) {
				console.log(response.purchase.license_key);
				dialog.showModal();
				$.getJSON(
					mailster_tester.fs.dl_endpoint +
						'/wp-json/freemius/v1/api/download?user_id=' +
						encodeURIComponent(response.user.id) +
						'&license_id=' +
						encodeURIComponent(response.purchase.license_id) +
						'&created=' +
						encodeURIComponent(response.purchase.created) +
						'&c=' +
						+new Date(),
					function (response) {
						if (response.success) {
							// just for the correct folder name
							var url = response.url.replace(
								'is_premium=true&',
								'is_premium=false&'
							);
							$('.download').attr('href', url).removeClass('disabled');
							dialog.showModal();
						} else {
							alert(response.message);
						}
					}
				);
			},
		};

	if (undefined !== window.fs_mailster_credentials) {
		config.timestamp = fs_mailster_credentials.timestamp;
		config.sandbox_token = fs_mailster_credentials.sandbox_token;
	}

	$('#mailster_start_test').on('click', function (e) {
		e.preventDefault();
		output.empty();
		errors = {
			error: 0,
			warning: 0,
			notice: 0,
			success: 0,
		};
		tests_run = 1;
		progressbar.width(0);
		$('#mailster_start_test');
		$('#mailster-tester').removeClass('mailster-tester--finished');
		$('#mailster_start_test').prop('disabled', true);
		setTimeout(function () {
			progressbar.width('2%');
			test();
		}, 300);
	});

	//call action method
	function test(test_id) {
		$('#mailster_start_test').prop('disabled', true);

		var data = {
			_nonce: mailster_tester.nonce,
			action: 'mailster_test',
			test_id: test_id,
		};
		$.post(mailster_tester.ajaxurl, data, function (response) {
			errors['error'] += response.data.errors.error;
			errors['warning'] += response.data.errors.warning;
			errors['notice'] += response.data.errors.notice;
			errors['success'] += response.data.errors.success;

			$(response.data.message.html).prependTo(output);

			if (response.data.nexttest) {
				progressbar.width((++tests_run / response.data.total) * 100 + '%');
				setTimeout(function () {
					test(response.data.nexttest);
				}, 1000);
				testinfo.html(
					sprintf(
						'Running Test %s of %s [%s]',
						tests_run,
						response.data.total,
						response.data.next
					)
				);
			} else {
				progressbar.width('100%');
				setTimeout(function () {
					$('#mailster_start_test').prop('disabled', false);
					progressbar.width(0);
					$('#mailster-tester').addClass('mailster-tester--finished');
					testinfo.html(
						sprintf(
							'Tests finished with %s errors, %s warnings and %s notices.',
							errors.error,
							errors.warning,
							errors.notice
						)
					);
				}, 500);
			}
		});
	}

	$('.buy-license').on('click', function (e) {
		e.preventDefault();
		$('.actionbuttons button').prop('disabled', true);
		requiredCheckout(function () {
			var handler = FS.Checkout.configure(config);
			$('.actionbuttons button').prop('disabled', false);

			handler.open({});
		});
	});
	$('.start-trial').on('click', function (e) {
		e.preventDefault();
		$('.actionbuttons button').prop('disabled', true);
		requiredCheckout(function () {
			var handler = FS.Checkout.configure(config);
			$('.actionbuttons button').prop('disabled', false);

			handler.open({
				trial: 'paid',
				coupon: null,
				title: 'Start your free trial',
			});
		});
	});

	// "Close" button closes the dialog
	closeButton.addEventListener('click', () => {
		dialog.close();
	});

	function requiredCheckout(cb) {
		if (checkoutLoaded) {
			cb && cb();
			return;
		}
		$.getScript(
			'https://checkout.freemius.com/checkout.min.js',
			function (data, textStatus, jqxhr) {
				checkoutLoaded = true;
				cb && cb();
			}
		);
	}

	function sprintf() {
		var a = Array.prototype.slice.call(arguments),
			str = a.shift(),
			total = a.length,
			reg;
		for (var i = 0; i < total; i++) {
			reg = new RegExp('%(' + (i + 1) + '\\$)?(s|d|f)');
			str = str.replace(reg, a[i]);
		}
		return str;
	}
});
