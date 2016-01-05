(function () {

    'use strict';
    angular.module('quotesondev', [])

    .config(['$locationProvider', function($locationProvider) {


    }])

    .value('QUOTE_API', {
			GET_URL: api_vars.root_url + 'wp/v2/posts',
			POST_URL: api_vars.root_url + 'wp/v2/posts',
			POST_HEADERS: {
				'X-WP-Nonce': api_vars.nonce
			}
    })

    .factory('templateSrc', function(){
        var template_src_url ='/quotesondev/wp-content/themes/quotesondev/build/js/angular/templates/';
        return function(name){
            return template_src_url + name + '.html'
        }

    })

    .factory('quotes', ['$http', 'QUOTE_API', '$q' ,function($http, QUOTE_API,$q){
        return{
					getRandomQuote: function(){

            var deferred = $q.defer();

						var req = {
							method: 'GET',
							url: QUOTE_API.GET_URL + '?filter[orderby]=rand&filter[posts_per_page]=1'
						}

            function quote(response){
              var quote = response.data[0];
              return {
                title: quote.title.rendered,
                source: quote._qod_quote_source,
                source_url: quote._qod_quote_source_url,
                slug: quote.slug,
                content: angular.element(quote.content.rendered).text()
              }
            }
            function getRandomQuoteSuccess(response){
              deferred.resolve(quote(response));
            }

            function getRandomQuoteFail(error){
              deferred.reject(error);
            }
						$http(req).then(getRandomQuoteSuccess,getRandomQuoteFail);

            return deferred.promise;
					},
					submit: function(data){
            var abc = {
              method: 'POST',
              url: QUOTE_API.POST_URL,
              headers: QUOTE_API.POST_HEADERS,
              data: data
            }
            return $http(abc);
          }
				}
    }])

    .controller('quoteFormCtrl', ['$scope', 'quotes' ,function($scope, quotes){
			$scope.quote = {};
      $scope.submitSuccess = false;
      function quoteSuccess(response){
        $scope.submitSuccess = true;
        angular.element(document.querySelector('.submit-success-message')).html("Submission Succeed");
      }
      function quoteFail(error){

      }
      $scope.quote.post_status  = 'pending';
			$scope.submitQuote =  function(quoteForm){
      if (!quoteForm.$valid){
        alert('Invalid Form');
			} else {
        quotes.submit($scope.quote).then(quoteSuccess, quoteFail);
      }
    }
    }])

    .directive('quoteRotator', ['quotes', 'templateSrc', '$location', function(quotes, templateSrc, $location){
        return{
            restrict: 'E',
            templateUrl: templateSrc('quote-rotator'),
            link: function(scope,element, attrs){

							function renderRandomQuote(quote){
								scope.quote = quote;
							}

              function renderRandomQuoteError(error){

              }

							scope.newRandomQuote = function(){
									quotes.getRandomQuote().then(renderRandomQuote,renderRandomQuoteError)
							}
							scope.newRandomQuote();
            }
        }
    }])

    .directive('source', function(){
        return{
					restrict: 'E',
					scope:{
						'quote':'='
					},
					template:'<span class="source">\
											<span ng-if="quote.source && quote.source_url">, \
													<a href="{{quote.source_url}}">{{quote.source}}</a>\
											</span>\
											<span ng-if="quote.source && !quote.source_url">, \
													{{quote.source}}\
											</span>\
										</span>'
        }
    })


}());
