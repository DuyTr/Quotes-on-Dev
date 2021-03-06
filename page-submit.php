<?php
/**
 * The template for displaying the Submit a Quote page.
 *
 * @package RED_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area" ng-app="quotesondev">
		<main id="main" class="site-main" role="main">

         <section class="quote-submission">
            <header class="entry-header">
         		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
         	</header><!-- .entry-header -->

            <?php if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) : ?>

               <div class="quote-submission-wrapper" ng-controller="quoteFormCtrl">
                  <form id="quote-submission-form" name="quoteForm" novalidate ng-submit="submitQuote(quoteForm)" ng-hide="submitSuccess">
                     <div>
                        <label for="quote-author">Author of Quote</label>
                        <input ng-model="quote.title" type="text" name="quote_author" id="quote-author" required aria-required="true">
                     </div>
                     <div>
                        <label for="quote-content">Quote</label>
                        <textarea ng-model="quote.content" rows="3" cols="20" name="quote_content" id="quote-content" required aria-required="true"></textarea>
                     </div>
                     <div>
                        <label for="quote-source">Where did you find this quote? (e.g. book name)</label>
                        <input ng-model="quote._qod_quote_source" type="text" name="quote_source" id="quote-source">
                     </div>
                     <div>
                        <label for="quote-source-url">Provide the the URL of the quote source, if available.</label>
                        <input ng-model="quote._qod_quote_source_url" type="url" name="quote_source_url" id="quote-source-url">
                     </div>

                     <input type="submit" value="Submit Quote">
                  </form>

                  <p class="submit-success-message" ng-show="submitSuccess"></p>
               </div>

            <?php else : ?>

               <p>Sorry, you must be logged in to submit a quote!</p>

               <p><?php echo sprintf( '<a href="%1s">%2s</a>', esc_url( wp_login_url() ), 'Click here to login.' ); ?></p>

            <?php endif; ?>
         </section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
