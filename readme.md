# DB Ioc Container
A container library for resolving dependencies. Library uses decorators to mark classes and dependencies.

## Pre-requisites
1. Node JS
1. NPM
1. Typescript

## Setup
Install node modules
`npm install`

## Compile
Execute `npm run compile` or `tsc --sourceMap`. Npm compile command executes TST under the hood.

## Run
Run the main-test.ts file. This will automatically compile before running.
`npm run run`

## Usage
```
import {DbIocContainer} from "./index.ts"; //Not an NPM package atm

//Registering dependencies
@DecoratorClass(DependencyType.TRANSIENT)
export class MyDependency  {...}

//Registering Factory function
 DbIocContainer.resolve<MyDependency>((services) => {
    let dep1 = services.resolve<MyDependency2>();
    let dep2 = services.resolve<MyDependency3>();

    return new MyDependency(dep1, dep2);
 });

//Resolving dependencies
let obj = DbIocContainer.resolve(<name of class as string>);
```

## Considerations
At the moment the library is unable to resolve dependencies from the class constructor itself, planned for the future but incomplete due to time contraints. For the time being you must register a factory function used to build your dependencies which will be called at the time of resolving dependencies. Most functions require passing a string key as a parameter, there must be a better solution that exists to do this automatically based on the generic type T. Angular does it, why can't we?

Only transient dependencies are implemented. Future task to add singleton support.

