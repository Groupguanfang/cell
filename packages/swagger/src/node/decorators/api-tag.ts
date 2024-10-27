import { Type } from '@celljs/core';

export function ApiTags(...tags: string[]): ClassDecorator & MethodDecorator {
    return ((target: Type<any>) => {
    }) as ClassDecorator & MethodDecorator;
}

