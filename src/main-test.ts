import { DbIocContainer }from "./index";
import { DependencyType } from "./db-container-cache";


//custom test classes
@DbIocContainer.DependableClass(DependencyType.TRANSIENT)
class TestTypeA  {
    bar: string;

    constructor() {
        this.bar = "Type A: This is my first dependency!";
    }
}

@DbIocContainer.DependableClass(DependencyType.TRANSIENT)
class TestTypeB  {
    foo: any;

    constructor(private depA: TestTypeA) {
    }

    /** Do Sample work */
    work() {
        console.log(this.depA.bar);
        console.log("Type B: Work done!")
    }

}


//register services
console.log("Registration");
DbIocContainer.register("TestTypeA", (resolve) => new TestTypeA());
DbIocContainer.register("TestTypeB", (resolve) => {
    //manually inject constructor dependencies
    let a = resolve<TestTypeA>("TestTypeA"); 
    return new TestTypeB(a);
});


//main functionality
console.log("Do work..");
let typeB = DbIocContainer.resolve<TestTypeB>("TestTypeB");
typeB.work();
