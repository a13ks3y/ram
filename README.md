# Ram
Inspired by "Rick and Morty" show.
## Rick And Multiverse Platform Game

The game is a multiverse, where each universe created 'on demand'
(lazy initialization). The number of universes is infinite.
Each universe is a set of states, each state representing
all sub-states of all universe objects, including Rick.

Rick has a Portal Gun, which can make classic "Portal2-like" portals,
to travel in x or y directions, and also can make multiverse portals
to travel between universes (z axis). Multiverse travels could be time-shifted,
so your current Rick is able to interact with the old one Rick,
who was in this part of this universe before (could be same Rick).

Time in universes is relative, determinative, stored in "diff"'s,
so when nothing changing, it will be just one record:
"N ticks passed".
Min value is "Tick" (or "step") - one loop (requestAnimationFrame) iteration
If any object changed position during last tick, this event logging, so each universe is goring.
To prevent performance issues, events in far universes (that was visited long time ago) can fade out or something like that.

The plot is, look, you konw, it's it's it's, listen, Rick is making portal gun Ok? And, and, and, HE is testing it, and
he he he is go to other universe and it's creted on demand, it's just like the sme universe, but differrent, somethgin
like you know, rock on the left, or sky is purple, doesn't metter. So... He DIDN'T knew that portal gun not only
create\open diferrent universe to travle, it also creates an OPOSITE universe, with oposite Rick, it's not evil, or
good, it's opposite, so he is also can invent a portal gun, or not, but anyway, each usage of the portal gun make
another "hidden" universe, they can be easely found by the way latter in adventures, thaat I need to wrote a script for
it, so I go.

## Usage tbd

## Road Map

# Angular-Generated 💩

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag
for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
