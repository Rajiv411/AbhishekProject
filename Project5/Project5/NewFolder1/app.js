var myapp = angular.module("myApp", ["ngRoute"]);
myapp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", { templateUrl: "views/Home.html", controller: "HomeCtrl", title: "Home" })
                   .when("/Contactus", { templateUrl: "views/Contactus.html", controller: "ContactusCtrl", title: "Contactus" })
                    .when("/States", { templateUrl: "views/Statesinfo.html", controller: "StatesCtrl", title: "StatesInfo" })
                     .when("/detailsinfo/:Statename", { templateUrl: "views/Statesdetail.html", controller: "DetailsInfoCtrl", title: "DetailsInfo" })
                     .when("/Career", { templateUrl: "views/Career.html", controller: "CareerCtrl", title: "Career" })
                   .when("/Aboutme", { templateUrl: "views/Aboutme.html", controller: "AboutmeCtrl", title: "Aboutme" })
                   .when("/Profile", { templateUrl: "views/Profile.html", controller: "ProfileCtrl", title: "Profile" })
                   .otherwise("/");

}]);
//title for the page.
myapp.run(['$rootScope', function ($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.mytitle = current.$$route.title;
    });
}]);
myapp.controller("myCtrl", function ($scope) {

});
//states code

myapp.controller("StatesCtrl", function ($scope, $http) {
    $http.get("http://services.groupkt.com/state/get/IND/all").success(function (response) {
        $scope.Statesinfo = response.RestResponse.result;
    }).error(function () {
        alert("error...");
    })
});
myapp.controller("DetailsInfoCtrl", function ($scope, $http, $routeParams) {
    var selectedstate = $routeParams.Statename;
    $http.get("http://services.groupkt.com/state/search/IND?text=" + selectedstate).success(function (response) {
        $scope.detailsinfo = response.RestResponse.result;
    }).error(function () {
        alert("error...");
    })
});

// myapp.service("CareerCtrl", function ($http, $q) {
//    return {
//        getData: function () {
//            var def = $q.defer();
//            $http.get("http://services.groupkt.com/state/get/IND/all").success(function (data) {
//                def.resolve(data);
//            }).error(function (err) {
//                def.reject("error occured");
//            });
//            return def.promise;
//        }
//   }

//});
