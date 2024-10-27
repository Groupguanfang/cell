import { Controller, Get, Text } from '@celljs/mvc/lib/node';
import { ApiTags } from '@celljs/swagger/lib/node'

@ApiTags('home')
@Controller()
export class HomeController {
    
    @Get()
    @Text()
    home(): string {
        console.log(Reflect.getMetadata('cell:controller', HomeController))
        return 'Welcome to Cell';
    }
}
