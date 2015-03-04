/**
Template Controllers

@module Routes
*/

/**
The app routes

@class App routes
@constructor
*/


// Change the URLS to use #! instead of real paths
//Iron.Location.configure({useHashPaths: true});


// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    // notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
    },
    autoRun: false,
    autoRender: false
});


// ROUTES

/**  
The home page of the catalog

@method home
*/
Router.route('/', {
    template: 'views_home',
    name: 'home'
});


// DUMMY ROUTE
Router.route('/profile', {
    template: 'views_home',
    name: 'userProfile'
});



