import { ReactComponent } from '@malagu/react';
import { LEFT_AREA } from '../area/area-protocol';

export const LeftArea =
    function (component?: any, rebind: boolean = true): (target: any) => any {
        return (t: any) => {
            ReactComponent(LEFT_AREA, component || t, rebind)(t);
        };
    };
