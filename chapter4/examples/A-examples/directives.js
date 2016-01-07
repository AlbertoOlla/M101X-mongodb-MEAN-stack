exports.categoryProducts = function() {
  return {
    controller: 'CategoryProductsController',
    templateUrl: '/A-examples/templates/category_products.html'
  }
};

exports.categoryTree = function() {
  return {
    controller: 'CategoryTreeController',
    templateUrl: '/A-examples/templates/category_tree.html'
  }
};

exports.navBar = function() {
  return {
    controller: 'NavBarController',
    templateUrl: '/A-examples/templates/nav_bar.html'
  };
};

exports.productDetails = function() {
  return {
    controller: 'ProductDetailsController',
    templateUrl: '/A-examples/templates/product_details.html'
  };
};
