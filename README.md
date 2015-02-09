# AngularJS Utilities Module

Written by Jeff Rose and James Zinger of Axon Interactive

## Description

This AngularJS module contains a collection of directives, filters, services and views/controllers that are generically helpful to Axon Interactive's AngularJS web projects. We keep all of our common behaviour in here so that we can port it between projects easily and depend on it in more specific modules.

Contains helpful stuff including:

### Directives

#### compile 

Compile dynamically inserted HTML containing AngularJS directives.

#### errorMessage 

A common error message format to make error handling uniform.

### Filters

#### TrunateText 

Limit text to a specific number of characters for space-limited display.

### Services

#### $errorMessage 

Set up generic error phrasing for all errorMessage directives in your app.

#### $navigationListener 

Detect and wanr the user before navigation events that could result in them losing data or losing their work.
   
### Modals

#### GenericModal 

A generic Okay or Okay/Cancel modal suitable for most notifications.

## Dependencies

### UI Bootstrap (ui.bootstrap) 

Provides directives and services that are used to integrate Bootstrap components more directly with AngularJS applications. See http://angular-ui.github.io/bootstrap/
   
### UI Router (ui.router)

Replaces the standard AngularJS router with one that uses a state machine system supporting nested routing and more complex routing situations. See http://angular-ui.github.io/ui-router/