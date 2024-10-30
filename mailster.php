<?php
/*
Plugin Name: Mailster WordPress Newsletter Plugin
Plugin URI: https://mailster.co/?utm_campaign=wporg&utm_source=wordpress.org&utm_medium=plugin&utm_term=Mailster+Compatibility+Tester
Description: This is a compatibility test plugin for the Mailster Newsletter plugin
Version: 2.0.2
Author: EverPress
Author URI: https://mailster.co
License: GPLv2 or later
*/

// only backend (trunk)
if ( ! is_admin() || ! defined( 'ABSPATH' ) ) {
	return;
}

define( 'MAILSTER_TESTER_FILE', __FILE__ );

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/classes/tester.class.php';
require_once __DIR__ . '/classes/activator.class.php';
new MailsterTester();
new MailsterActivator();
