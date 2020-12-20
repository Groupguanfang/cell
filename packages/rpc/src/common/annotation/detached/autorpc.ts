import { applyAutowiredDecorator, ContainerUtil, DoGetValue, IdOrAutowiredOption, parseAutowiredOption } from '@malagu/core';
import { RPC, ID_KEY, doInjectForAutorpc } from '../autorpc';

export const Autorpc = function (idOrOption?: IdOrAutowiredOption): PropertyDecorator & ParameterDecorator {
    return (target: any, targetKey: string, index?: number) => {
        const option = parseAutowiredOption(target, targetKey, index, idOrOption);
        option.detached = true;
        applyAutowiredDecorator(option, target, targetKey, index, doInjectForAutorpc, doGetValueForAutorpc);
    };
};

const doGetValueForAutorpc: DoGetValue = (option, t, property) => ContainerUtil.getTagged(RPC, ID_KEY, option.id!);
