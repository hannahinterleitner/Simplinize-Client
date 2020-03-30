import {Enums} from '../enums';

export class LoginDTO {
    constructor(
        public credentials: string,
        public password: string,
        public type: Enums
    ) {}
}
