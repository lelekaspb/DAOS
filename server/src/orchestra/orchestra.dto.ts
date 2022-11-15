import { isEmail, IsNotEmpty } from "class-validator";


export class OrchestraDto{

    @IsNotEmpty()
    orchestra_name: string;

    @IsNotEmpty()
    creator_id: string;

    email: string;

    // Members: [];
    // description: string;
    // website: string;
    // zip_code: number;
    // city: string;
    // musicians_amount: string;
    // practice_frequency: number;
    // genres: [];

    constructor (orchestra_name: string, creator_id: string){
        this.orchestra_name = orchestra_name;
        this.creator_id = creator_id;
    }


        
    


}