
export enum DependencyType {
    SINGLETON,
    TRANSIENT
}


/**
 *  Dependency Object to contain metadata for each dependency
 */
export class Dependency {
    /** Dependency ID\Key */
    key: string;

    /** Type of Dependency */
    type: DependencyType;

    /** Factory function to create dependency */
    factory: any;
}

/**
 * Container class to to get and set dependencies.
 */
export class DbContainerCache {
    list: Dependency[] = [];

    /** Return type by Key name */
    get(key: string) : Dependency {
        let dep = this.list.find(m => m.key == key);

        if(dep == null) {
            throw new Error("Dependency has not been registered");
        }

        return dep;
    }

    /** Creates generic Dependency with it's key */
    registerKey(key: string, type: DependencyType) {
        var dep = new Dependency();
        dep.key = key;
        dep.type = type;

        this.list.push(dep);
    }

}