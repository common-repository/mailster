<div class="wrap" id="mailster-tester">

	<div class="test-wrap">

		<h1><?php esc_html_e( 'Mailster WordPress Newsletter Plugin Compatibility Tester', 'mailster' ); ?></h1>
		<p><?php esc_html_e( 'Thanks for your interrest in Mailster. This tool tests you current website for compatilbity issues with Mailster.', 'mailster' ); ?></p>

		<div class="alignright" id="status" ></div>
			<p>
				<button class="button button-hero button-primary" id="mailster_start_test"><?php esc_html_e( 'Start Test', 'mailster' ); ?></button>
			</p>        
		<div class="progress">
			<div class="bar"></div>
		</div>
		<div id="output" class="mailster-test-result"></div>
		
		<p class="alignleft actionbuttons"></p>
		<p class="alignright actionbuttons">
			<button class="button button-hero button-primary buy-license"><?php esc_html_e( 'Buy your license 20% off', 'mailster' ); ?></button>	
			<button class="button button-hero start-trial"><?php esc_html_e( 'Start a trial', 'mailster' ); ?></button>
		</p>
		<dialog class="download-modal">
			<div class="download-modal-inner">
				<h1><?php esc_html_e( 'We are preparing your download link.', 'mailster' ); ?></h1>				
				<p><?php printf( esc_html__( 'Please download the plugin and %s.', 'mailster' ), '<a href="' . admin_url( 'plugin-install.php?tab=upload' ) . '">' . esc_html__( 'upload it manually to your site', 'mailster' ) . '</a>' ); ?></p><p><?php printf( esc_html__( 'You can always get the latest version from %s.', 'mailster' ), '<a href="' . esc_url( 'https://mailster.co/account' ) . '" target="_blank">' . esc_html__( 'the account page', 'mailster' ) . '</a>' ); ?></p>
				<p><a class="button button-hero button-primary disabled download"><?php esc_html_e( 'Download Mailster Now', 'mailster' ); ?></a> <?php esc_html_e( 'or', 'mailster' ); ?> <button class="button button-link close"><?php esc_html_e( 'close this modal', 'mailster' ); ?></button></p>				
			</div>
		</dialog>
	</div>

</div>
