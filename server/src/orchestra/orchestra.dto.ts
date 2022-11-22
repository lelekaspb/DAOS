import { isEmail, IsNotEmpty, IsString } from "class-validator";


export class OrchestraDto{

    @IsNotEmpty()
    orchestra_name: string;

    @IsNotEmpty()
    creator_id: string;

    // Members: [];
    @IsString()
    description: string;
    
    @IsString()
    website: string;

    @IsString()
    zip_code: string;

    @IsString()
    city: string;

    @IsString()
    musicians_amount: string;

    @IsString()
    practice_frequency: string;
    // genres: [];

    constructor (
        orchestra_name: string, 
        creator_id: string,
        // Members: [],
        description: string,
        website: string,
        zip_code: string,
        city: string,
        musicians_amount: string,
        practice_frequency: string,
        // genres: [],

        ){
        this.orchestra_name = orchestra_name;
        this.creator_id = creator_id;
        this.description = description;
        this.website = website;
        this.zip_code = zip_code;
        this.city = city;
        this.musicians_amount = musicians_amount;
        this.practice_frequency = practice_frequency;
        
    }


        
    


}