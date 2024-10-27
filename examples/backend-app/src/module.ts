import './user-controller';
import './home-controller';
import { autoBind, ContainerProvider } from '@celljs/core';
import { interfaces } from 'inversify'

export default autoBind();

ContainerProvider.asyncProvide().then(container => {
    // @ts-expect-error
    const dictionary: interfaces.Lookup<interfaces.Binding<any>> = container['_bindingDictionary'];
    // @ts-expect-error
    const map = dictionary['_map'] as Map<any, interfaces.Binding<any>>;
    for (const [key, value] of map) {
        console.log(value)
    }
})
