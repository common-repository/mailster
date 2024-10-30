<?php

class MailsterActivator {


	public function __construct() {

		add_action( 'activated_plugin', array( $this, 'check' ), 10, 2 );
	}


	public function check( $plugin, $network_wide ) {

		if ( ! preg_match( '/^mailster/', $plugin ) ) {
			return;
		}

		// TODO: notify the user that the Mailster plugin is required
	}
}
