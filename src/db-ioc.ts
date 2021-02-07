/**
 * A global dependency container to store and resolve dependencies
 * 
 * Considerations:
 * Dependencies must have a @DependableClass decorator in order to
 * be registered.
 * 
 * //TODO: Ability to resolve dependencies using the constructor without a factory fn automatically
 * 
 */
import { DbContainerCache, DependencyType, Dependency } from "./db-container-cache";


export namespace DbIocContainer {
    /** store for dependencies */
    const cache = new DbContainerCache();


    /** 
     * Dependable
    *  Decorate classes in order to be injected
     */
    export const DependableClass = (type: DependencyType) =>
        function decorator<T>(constructor) {

            console.log(`DEBUG - Registered class:  ${constructor.name} with type ${type}`);
            cache.registerKey(constructor.name, type);

            return class extends constructor {
                $dName = constructor.name;
                $dType = type;
            } as any;
        };



    /** Register a new dependency with factory*/
    export function register<T>(key: string, factory: (resolve: <B>(key: string) => B) => T) {
        let dep = cache.get(key);
        dep.factory = factory;
    }

    /** Resolve a dependency */
    export function resolve<T>(key: string): T{
        let dep = cache.get(key);
        let result: T = null;

        if(dep.type == DependencyType.TRANSIENT) {
            //recursive
            result = dep.factory(resolve);
        } else if (dep.type == DependencyType.SINGLETON) {
            throw new Error("Singleton dependency not implemented");
        }

        return result;
    }

}






